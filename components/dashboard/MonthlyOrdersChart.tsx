"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface MonthlyOrdersChartProps {
  data: {
    name: string
    orders: number
  }[]
}


export default function MonthlyOrdersChart({ data }: MonthlyOrdersChartProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Last Four Monthly Order Stats</CardTitle>
      </CardHeader>
      <CardContent className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg p-6">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#94a3b8" // Slate-400
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8" // Slate-400
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{ color: "#0ea5e9" }} // Sky-500
            />
           <defs>
  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} /> {/* Sky-500 */}
    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} /> {/* Sky-400 */}
  </linearGradient>
</defs>

            <Line
              type="monotone"
              dataKey="orders"
              stroke="#0ea5e9" // Sky-500
              strokeWidth={3}
              dot={{
                fill: "#0ea5e9",
                stroke: "#0ea5e9",
                strokeWidth: 2,
                r: 6,
              }}
              activeDot={{
                fill: "#0ea5e9",
                stroke: "#white",
                strokeWidth: 3,
                r: 8,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

