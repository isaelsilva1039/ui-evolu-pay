"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    receitas: 12500,
    despesas: 8400,
  },
  {
    name: "Fev",
    receitas: 14250,
    despesas: 9100,
  },
  {
    name: "Mar",
    receitas: 15800,
    despesas: 9800,
  },
  {
    name: "Abr",
    receitas: 16200,
    despesas: 10200,
  },
  {
    name: "Mai",
    receitas: 18100,
    despesas: 11000,
  },
  {
    name: "Jun",
    receitas: 17300,
    despesas: 10500,
  },
]

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$${value}`}
        />
        <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, undefined]} />
        <Legend />
        <Bar dataKey="receitas" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        <Bar dataKey="despesas" fill="#f43f5e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
