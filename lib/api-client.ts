// API client functions for fetching data from the backend

// Base API URL - replace with your actual API URL
const API_BASE_URL = "/api"

// Generic fetch function with error handling
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
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
