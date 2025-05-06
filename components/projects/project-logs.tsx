"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getProjectLogs } from "@/lib/api-client"
import { Search, ChevronDown, X, AlertTriangle, AlertCircle, CheckCircle, Clock } from "lucide-react"

interface ProjectLogsProps {
  projectId: string
}

export function ProjectLogs({ projectId }: ProjectLogsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [timeFilter, setTimeFilter] = useState("Last day")
  const [showTimeFilterDropdown, setShowTimeFilterDropdown] = useState(false)
  const [logLevelFilter, setLogLevelFilter] = useState<string[]>(["info", "warning", "error"])

  const timeFilterOptions = [
    "Last hour",
    "Last 6 hours",
    "Last 12 hours",
    "Last day",
    "Last 3 days",
    "Last 7 days",
    "Last 14 days",
    "Last 30 days",
    "Custom",
  ]

  const {
    data: logs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projectLogs", projectId, timeFilter],
    queryFn: () => getProjectLogs(projectId, timeFilter),
  })

  // Filter logs based on search query and log level - computed directly instead of using state
  const filteredLogs = logs.filter(
    (log) => log.message.toLowerCase().includes(searchQuery.toLowerCase()) && logLevelFilter.includes(log.level),
  )

  const getLogIcon = (level: string) => {
    switch (level) {
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "info":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const toggleLogLevel = (level: string) => {
    if (logLevelFilter.includes(level)) {
      // Only remove if there will still be at least one filter active
      if (logLevelFilter.length > 1) {
        setLogLevelFilter(logLevelFilter.filter((l) => l !== level))
      }
    } else {
      setLogLevelFilter([...logLevelFilter, level])
    }
  }

  if (isLoading) {
    return <div className="bg-[#0a2a3f] rounded-lg p-6 text-white text-center">Loading logs...</div>
  }

  if (error) {
    return (
      <div className="bg-[#0a2a3f] rounded-lg p-6 text-white text-center">
        <p className="text-red-400 mb-2">Error loading logs</p>
        <p className="text-sm">{error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    )
  }

  return (
    <div className="bg-[#0a2a3f] rounded-lg overflow-hidden">
      {/* Search and filter bar */}
      <div className="p-4 border-b border-gray-700 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="search word"
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setSearchQuery("")}>
              <X className="h-4 w-4 text-gray-400 hover:text-white" />
            </button>
          )}
        </div>

        <div className="relative">
          <button
            className="flex items-center justify-between w-full sm:w-40 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm"
            onClick={() => setShowTimeFilterDropdown(!showTimeFilterDropdown)}
          >
            <span>{timeFilter}</span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </button>

          {showTimeFilterDropdown && (
            <div className="absolute right-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
              <div className="py-1 max-h-64 overflow-y-auto">
                {timeFilterOptions.map((option) => (
                  <button
                    key={option}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                    onClick={() => {
                      setTimeFilter(option)
                      setShowTimeFilterDropdown(false)
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Log level filters */}
      <div className="px-4 py-2 border-b border-gray-700 flex flex-wrap gap-2">
        <span className="text-sm text-gray-400">Filter by level:</span>
        <div className="flex gap-2">
          <button
            className={`px-2 py-1 text-xs rounded-md flex items-center gap-1 ${
              logLevelFilter.includes("info") ? "bg-green-900 text-green-200" : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => toggleLogLevel("info")}
          >
            <CheckCircle className="h-3 w-3" />
            Info
          </button>
          <button
            className={`px-2 py-1 text-xs rounded-md flex items-center gap-1 ${
              logLevelFilter.includes("warning") ? "bg-yellow-900 text-yellow-200" : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => toggleLogLevel("warning")}
          >
            <AlertTriangle className="h-3 w-3" />
            Warning
          </button>
          <button
            className={`px-2 py-1 text-xs rounded-md flex items-center gap-1 ${
              logLevelFilter.includes("error") ? "bg-red-900 text-red-200" : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => toggleLogLevel("error")}
          >
            <AlertCircle className="h-3 w-3" />
            Error
          </button>
        </div>
      </div>

      {/* Logs list */}
      <div className="divide-y divide-gray-700 max-h-[500px] overflow-y-auto">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log, index) => (
            <div
              key={index}
              className={`p-3 text-white flex items-start gap-3 ${
                log.level === "error"
                  ? "bg-red-900/20"
                  : log.level === "warning"
                    ? "bg-yellow-900/20"
                    : "hover:bg-gray-800/50"
              }`}
            >
              <div className="text-xs text-gray-400 whitespace-nowrap pt-0.5 min-w-[120px]">{log.timestamp}</div>
              <div className="pt-0.5">{getLogIcon(log.level)}</div>
              <div className="flex-1 text-sm font-mono break-all">{log.message}</div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-400">No logs found matching your criteria</div>
        )}
      </div>

      {/* Log stats */}
      <div className="p-3 border-t border-gray-700 bg-gray-800/50 text-xs text-gray-400 flex justify-between">
        <div>
          Showing {filteredLogs.length} of {logs.length} logs
        </div>
        <div className="flex gap-4">
          <span>Info: {logs.filter((log) => log.level === "info").length}</span>
          <span>Warning: {logs.filter((log) => log.level === "warning").length}</span>
          <span>Error: {logs.filter((log) => log.level === "error").length}</span>
        </div>
      </div>
    </div>
  )
}
