"use client"

import { useState } from "react"
import type { Project } from "@/lib/api-client"
import {
  AlertCircle,
  Save,
  Plus,
  Trash2,
  Link,
  Server,
  FileCode,
  GitBranch,
  Terminal,
  FolderOutput,
  Key,
} from "lucide-react"

interface ProjectSettingsProps {
  project: Project
}

export function ProjectSettings({ project }: ProjectSettingsProps) {
  const [domain, setDomain] = useState(project.link.replace("https://", ""))
  const [projectType, setProjectType] = useState<"static" | "dynamic">(
    project.staticDynamic.toLowerCase() as "static" | "dynamic",
  )
  const [branch, setBranch] = useState("main")
  const [rootDirectory, setRootDirectory] = useState("")
  const [buildCommand, setBuildCommand] = useState("npm run build")
  const [outputDirectory, setOutputDirectory] = useState("dist")
  const [startCommand, setStartCommand] = useState("npm start")
  const [language, setLanguage] = useState("Node")
  const [version, setVersion] = useState("18.x")
  const [secretFiles, setSecretFiles] = useState<string[]>([])
  const [healthCheckPath, setHealthCheckPath] = useState("/health")
  const [environmentVariables, setEnvironmentVariables] = useState<{ key: string; value: string; isSecret: boolean }[]>(
    [
      { key: "NODE_ENV", value: "production", isSecret: false },
      { key: "API_URL", value: "https://api.example.com", isSecret: false },
      { key: "DATABASE_URL", value: "postgresql://user:password@localhost:5432/db", isSecret: true },
    ],
  )
  const [isSaving, setIsSaving] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleAddEnvironmentVariable = () => {
    setEnvironmentVariables([...environmentVariables, { key: "", value: "", isSecret: false }])
  }

  const handleEnvironmentVariableChange = (
    index: number,
    field: "key" | "value" | "isSecret",
    value: string | boolean,
  ) => {
    const newVariables = [...environmentVariables]
    newVariables[index][field] = value
    setEnvironmentVariables(newVariables)
  }

  const handleRemoveEnvironmentVariable = (index: number) => {
    setEnvironmentVariables(environmentVariables.filter((_, i) => i !== index))
  }

  const handleSaveSettings = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <div className="bg-[#0a2a3f] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-medium text-white flex items-center gap-2">
            <Server className="h-5 w-5" />
            General Settings
          </h2>
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 disabled:opacity-70"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <div className="p-4 text-white">
          <div className="space-y-4">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium mb-1 text-gray-300">
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                value={project.projectName}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="domain" className="block text-sm font-medium mb-1 text-gray-300 flex items-center gap-2">
                <Link className="h-4 w-4" />
                Domain
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-700 bg-gray-800 text-gray-400">
                  https://
                </span>
                <input
                  type="text"
                  id="domain"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-md text-white"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">How the desired URL for your website</p>
            </div>
          </div>
        </div>
      </div>

      {/* Deployment Configuration */}
      <div className="bg-[#0a2a3f] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-medium text-white">Launch Configuration</h2>
          <p className="text-sm text-gray-400">Configure AstroCloud builds and deploys for: username/repo-name</p>
        </div>
        <div className="p-4 text-white">
          <div className="space-y-6">
            {/* Project Type Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Project Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="projectType"
                    checked={projectType === "static"}
                    onChange={() => setProjectType("static")}
                    className="mr-2 h-4 w-4 text-blue-600"
                  />
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full ${projectType === "static" ? "bg-green-500" : "bg-gray-600"} mr-2`}
                  >
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                  <span>Static</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="projectType"
                    checked={projectType === "dynamic"}
                    onChange={() => setProjectType("dynamic")}
                    className="mr-2 h-4 w-4 text-blue-600"
                  />
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full ${projectType === "dynamic" ? "bg-green-500" : "bg-gray-600"} mr-2`}
                  >
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                  <span>Dynamic</span>
                </label>
              </div>
            </div>

            {/* Branch */}
            <div>
              <label htmlFor="branch" className="block text-sm font-medium mb-1 text-gray-300 flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                Branch to Release
              </label>
              <input
                type="text"
                id="branch"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </div>

            {/* Dynamic-specific fields */}
            {projectType === "dynamic" && (
              <>
                <div>
                  <label htmlFor="language" className="block text-sm font-medium mb-1 text-gray-300">
                    Language
                  </label>
                  <select
                    id="language"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="Node">Node</option>
                    <option value="Python">Python</option>
                    <option value="Ruby">Ruby</option>
                    <option value="PHP">PHP</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="version" className="block text-sm font-medium mb-1 text-gray-300">
                    Version
                  </label>
                  <select
                    id="version"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                  >
                    <option value="18.x">18.x</option>
                    <option value="16.x">16.x</option>
                    <option value="14.x">14.x</option>
                    <option value="12.x">12.x</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="startCommand"
                    className="block text-sm font-medium mb-1 text-gray-300 flex items-center gap-2"
                  >
                    <Terminal className="h-4 w-4" />
                    Start Command
                  </label>
                  <input
                    type="text"
                    id="startCommand"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    value={startCommand}
                    onChange={(e) => setStartCommand(e.target.value)}
                  />
                  <p className="text-xs text-gray-400 mt-1">Example: npm start</p>
                </div>
              </>
            )}

            {/* Common fields for both static and dynamic */}
            <div>
              <label
                htmlFor="rootDirectory"
                className="block text-sm font-medium mb-1 text-gray-300 flex items-center gap-2"
              >
                <FileCode className="h-4 w-4" />
                Root Directory
              </label>
              <input
                type="text"
                id="rootDirectory"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                value={rootDirectory}
                onChange={(e) => setRootDirectory(e.target.value)}
                placeholder="/"
              />
              <p className="text-xs text-gray-400 mt-1">The directory where your build command will be run</p>
            </div>

            <div>
              <label
                htmlFor="buildCommand"
                className="block text-sm font-medium mb-1 text-gray-300 flex items-center gap-2"
              >
                <Terminal className="h-4 w-4" />
                Build Command
              </label>
              <input
                type="text"
                id="buildCommand"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                value={buildCommand}
                onChange={(e) => setBuildCommand(e.target.value)}
              />
              <p className="text-xs text-gray-400 mt-1">Example: yarn build, gulp build, make all</p>
            </div>

            <div>
              <label
                htmlFor="outputDirectory"
                className="block text-sm font-medium mb-1 text-gray-300 flex items-center gap-2"
              >
                <FolderOutput className="h-4 w-4" />
                Output Directory
              </label>
              <input
                type="text"
                id="outputDirectory"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                value={outputDirectory}
                onChange={(e) => setOutputDirectory(e.target.value)}
              />
              <p className="text-xs text-gray-400 mt-1">Example: dist</p>
            </div>
          </div>
        </div>
      </div>

      {/* Environment Variables */}
      <div className="bg-[#0a2a3f] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-medium text-white flex items-center gap-2">
            <Key className="h-5 w-5" />
            Environment Variables
          </h2>
          <p className="text-sm text-gray-400">
            Set environment variables to customize and optimize your build process
          </p>
        </div>
        <div className="p-4 text-white">
          <div className="mb-4 p-3 bg-blue-900/30 border border-blue-800 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
            <div className="text-sm text-blue-200">
              Environment variables are encrypted and only exposed to your project during build and runtime.
            </div>
          </div>

          <div className="space-y-3">
            {environmentVariables.map((variable, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="KEY"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  value={variable.key}
                  onChange={(e) => handleEnvironmentVariableChange(index, "key", e.target.value)}
                />
                <input
                  type={variable.isSecret ? "password" : "text"}
                  placeholder="VALUE"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  value={variable.value}
                  onChange={(e) => handleEnvironmentVariableChange(index, "value", e.target.value)}
                />
                <div className="flex items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={variable.isSecret}
                      onChange={(e) => handleEnvironmentVariableChange(index, "isSecret", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-300">Secret</span>
                  </label>
                </div>
                <button
                  onClick={() => handleRemoveEnvironmentVariable(index)}
                  className="p-2 bg-red-900 hover:bg-red-800 text-white rounded-md"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddEnvironmentVariable}
            className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Variable
          </button>
        </div>
      </div>

      {/* Advanced Settings (only for dynamic projects) */}
      {projectType === "dynamic" && (
        <div className="bg-[#0a2a3f] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <button
              className="text-lg font-medium text-white w-full text-left flex items-center justify-between"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <span>Advanced</span>
              <span className={`transform transition-transform ${showAdvanced ? "rotate-180" : ""}`}>▼</span>
            </button>
          </div>

          {showAdvanced && (
            <div className="p-4 text-white">
              <div className="space-y-6">
                {/* Secret Files */}
                <div>
                  <h3 className="text-md font-medium flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-700 text-xs">
                      1
                    </span>
                    Secret files
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    Files containing secret data (such as a .env file or a private key).
                    <br />
                    Access during builds and at runtime from your app's root, or from /etc/secrets/filename
                  </p>

                  <div className="flex gap-2 mb-2">
                    <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm">
                      No names added
                    </button>
                    <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm">
                      Test check from file
                    </button>
                  </div>

                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Enter secret file name"
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    />
                    <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
                      Add file
                    </button>
                  </div>
                </div>

                {/* Health Check Path */}
                <div>
                  <h3 className="text-md font-medium flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-700 text-xs">
                      2
                    </span>
                    Health check path
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    Files containing secret data (such as a .env file or a private key).
                    <br />
                    Access during builds and at runtime from your app's root, or from /etc/secrets/filename
                  </p>

                  <input
                    type="text"
                    value={healthCheckPath}
                    onChange={(e) => setHealthCheckPath(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    placeholder="/health"
                  />
                  <p className="text-xs text-gray-400 mt-1">Example: /health</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Danger Zone */}
      <div className="bg-[#0a2a3f] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700 bg-red-900/20">
          <h2 className="text-lg font-medium text-white">Danger Zone</h2>
        </div>
        <div className="p-4 text-white">
          <div className="space-y-4">
            <div>
              <h3 className="text-md font-medium">Delete Project</h3>
              <p className="text-sm text-gray-400 mt-1 mb-3">
                Once you delete a project, there is no going back. Please be certain.
              </p>
              <button className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-md flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deploy Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-md text-lg font-medium">
          Deploy
        </button>
      </div>
    </div>
  )
}
