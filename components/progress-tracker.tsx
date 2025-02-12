"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Exercise } from "@/types"

type ProgressTrackerProps = {
  exercises: Exercise[]
}

type ChartData = {
  name: string;
  completed: number;
}

export function ProgressTracker({ exercises }: ProgressTrackerProps) {
  const [completionData, setCompletionData] = useState<ChartData[]>([])

  useEffect(() => {
    const data = exercises.map(exercise => ({
      name: new Date(exercise.completionTime || 0).toLocaleDateString(),
      completed: exercise.completed ? 1 : 0
    }))

    setCompletionData(data)
  }, [exercises])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={completionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }
            />
            <Bar dataKey="completed" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

