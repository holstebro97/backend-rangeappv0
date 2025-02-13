"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn, user } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log("Form submitted - Attempting sign in")
      await signIn(email, password)
      console.log("Sign in completed, redirecting...")
      // Use a hard redirect after successful sign in
      window.location.href = "/shoulder-balance"
    } catch (error) {
      console.error("Sign in error in component:", error)
    }
  }

  // If already logged in, redirect immediately
  if (user) {
    window.location.href = "/shoulder-balance"
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-6">
        <h2 className="text-center text-3xl font-bold">Sign in to your account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md border p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md border p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:text-blue-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
} 