"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Redirect to shoulder-balance when logged in
        router.push("/shoulder-balance")
      } else {
        // If user is not logged in, redirect to login
        router.push("/login")
      }
    }
  }, [user, loading, router])

  // Show loading state while checking auth
  if (loading) {
    return <div>Loading...</div>
  }

  // This won't be shown as useEffect will redirect
  return null
}

