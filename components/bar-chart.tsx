"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", valor: 12500 },
  { name: "Fev", valor: 14250 },
  { name: "Mar", valor: 15800 },
  { name: "Abr", valor: 16200 },
  { name: "Mai", valor: 18100 },
  { name: "Jun", valor: 17300 },
  { name: "Jul", valor: 19200 },
  { name: "Ago", valor: 20100 },
  { name: "Set", valor: 21500 },
  { name: "Out", valor: 22800 },
  { name: "Nov", valor: 24100 },
  { name: "Dez", valor: 25500 },
]

export function BarChartComponent() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$${value / 1000}k`}
        />
        <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Valor"]} />
        <Legend />
        <Bar dataKey="valor" fill="#4f46e5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
