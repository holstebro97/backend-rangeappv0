import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import type React from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { Nav } from "@/components/nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Range Balance App",
  description: "Range Balance Application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} nordic-bg min-h-screen`}>
        <AuthProvider>
          <Nav />
          <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

import './globals.css'