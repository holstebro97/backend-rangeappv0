"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export function Nav() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 justify-between">
          <div className="flex space-x-4 items-center">
            <Link href="/" className="text-gray-800 hover:text-gray-600">
              Home
            </Link>
            {user ? (
              <>
                <Link href="/shoulder-balance" className="text-gray-800 hover:text-gray-600">
                  Shoulder Balance
                </Link>
                <button
                  onClick={() => logout()}
                  className="text-gray-800 hover:text-gray-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-800 hover:text-gray-600">
                  Login
                </Link>
                <Link href="/signup" className="text-gray-800 hover:text-gray-600">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 