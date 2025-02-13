"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase"

type User = {
  email: string | null
  uid: string
} | null

type AuthContextType = {
  user: User
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set up the auth state listener only once
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user?.email)
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        })
      } else {
        setUser(null)
      }
      setLoading(false)  // Always set loading to false after auth state is determined
    })

    // Cleanup subscription
    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)  // Set loading true before sign in
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      console.log("Sign in successful:", result.user.email)
      // Don't set user here - let the auth state listener handle it
      return result
    } catch (error) {
      console.error("Sign in error:", error)
      setLoading(false)  // Set loading false if there's an error
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await signOut(auth)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext) 