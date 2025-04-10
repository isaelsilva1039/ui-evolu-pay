"use client"

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", receita: 12500 },
  { name: "Fev", receita: 14250 },
  { name: "Mar", receita: 15800 },
  { name: "Abr", receita: 16200 },
  { name: "Mai", receita: 18100 },
  { name: "Jun", receita: 17300 },
  { name: "Jul", receita: 19200 },
  { name: "Ago", receita: 20100 },
  { name: "Set", receita: 21500 },
  { name: "Out", receita: 22800 },
  { name: "Nov", receita: 24100 },
  { name: "Dez", receita: 25500 },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$${value}`}
        />
        <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Receita"]} />
        <Legend />
        <Area type="monotone" dataKey="receita" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
