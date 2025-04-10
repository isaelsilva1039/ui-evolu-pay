"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Cartão de Crédito", value: 45000 },
  { name: "Boleto", value: 32000 },
  { name: "PIX", value: 18000 },
  { name: "Transferência", value: 5000 },
]

const COLORS = ["#4f46e5", "#f43f5e", "#10b981", "#f59e0b"]

export function PieChartComponent() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Valor"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
