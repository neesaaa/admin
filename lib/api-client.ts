// API client functions for fetching data from the backend

// Base API URL - replace with your actual API URL
const API_BASE_URL = "/api"

// Generic fetch function with error handling
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API error (${response.status}): ${errorText}`)
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

// User types
export interface User {
  id: number
  name: string
  email: string
  status: string
  joinDate: string
  lastActive: string
  projectCount: number
}

export interface UserDetails extends User {
  projects: Project[]
}

// Project types
export interface Project {
  id: number
  userName: string
  projectName: string
  datetime: string
  status: string
  staticDynamic: string
  link: string
}

export interface ProjectDetails extends Project {
  description?: string
  framework?: string
  nodeVersion?: string
  environmentVariables?: { key: string; value: string }[]
}

export interface Deployment {
  id: string
  title: string
  status: "success" | "failed" | "in_progress" | "pending"
  timestamp: string
  details?: string
  hasLogs: boolean
  actions?: string[]
}

export interface Log {
  timestamp: string
  level: "info" | "warning" | "error"
  message: string
}

// User API functions
export async function getUsers(): Promise<User[]> {
  return fetchApi<User[]>("/users")
}

export async function getUserById(id: string): Promise<UserDetails> {
  return fetchApi<UserDetails>(`/users/${id}`)
}

// Project API functions
export async function getProjects(): Promise<Project[]> {
  return fetchApi<Project[]>("/projects")
}

export async function getProjectsByUserId(userId: string): Promise<Project[]> {
  return fetchApi<Project[]>(`/users/${userId}/projects`)
}

export async function getProjectById(id: string): Promise<ProjectDetails> {
  return fetchApi<ProjectDetails>(`/projects/${id}`)
}

export async function getProjectDeployments(projectId: string): Promise<Deployment[]> {
  return fetchApi<Deployment[]>(`/projects/${projectId}/deployments`)
}

export async function getProjectLogs(projectId: string, timeFilter: string): Promise<Log[]> {
  return fetchApi<Log[]>(`/projects/${projectId}/logs?timeFilter=${encodeURIComponent(timeFilter)}`)
}
