import { NextResponse } from "next/server"

// Mock admin users
const adminUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", // In a real app, this would be hashed
    role: "admin",
  },
  {
    id: 2,
    name: "Test User",
    email: "test@example.com",
    password: "test123", // In a real app, this would be hashed
    role: "manager",
  },
]

export async function POST(request: Request) {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const body = await request.json()
    const { email, password } = body

    // Find user by email
    const user = adminUsers.find((u) => u.email === email)

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        {
          status: 401,
        },
      )
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { message: "An error occurred during login" },
      {
        status: 500,
      },
    )
  }
}
