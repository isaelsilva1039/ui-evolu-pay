"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ReportsFilters } from "@/components/reports-filters"
import { RevenueChart } from "@/components/revenue-chart"
import { Button } from "@/components/ui/button"
import { Download, Filter, BarChart2, PieChart, LineChart, TableIcon } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { PieChartComponent } from "@/components/pie-chart"
import { BarChartComponent } from "@/components/bar-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function ReportsPage() {
  const [viewType, setViewType] = useState<"chart" | "table">("chart")
  const [chartType, setChartType] = useState<"line" | "bar" | "pie">("line")
  const [groupBy, setGroupBy] = useState<"month" | "category" | "paymentMethod">("month")
  const [aggregation, setAggregation] = useState<"sum" | "count" | "average">("sum")

  return (
    <DashboardShell>
      <DashboardHeader heading="Relatórios" description="Visualize e exporte relatórios detalhados.">
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </DashboardHeader>

      <ReportsFilters />

      <div className="mt-4 space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Análise Financeira</CardTitle>
                <CardDescription>Visualize seus dados financeiros de diferentes formas</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <Button
                    variant={viewType === "chart" ? "secondary" : "ghost"}
                    className="rounded-none h-8 px-3"
                    onClick={() => setViewType("chart")}
                  >
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Gráfico
                  </Button>
                  <Button
                    variant={viewType === "table" ? "secondary" : "ghost"}
                    className="rounded-none h-8 px-3"
                    onClick={() => setViewType("table")}
                  >
                    <TableIcon className="h-4 w-4 mr-2" />
                    Tabela
                  </Button>
                </div>

                {viewType === "chart" && (
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <Button
                      variant={chartType === "line" ? "secondary" : "ghost"}
                      className="rounded-none h-8 px-3"
                      onClick={() => setChartType("line")}
                    >
                      <LineChart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={chartType === "bar" ? "secondary" : "ghost"}
                      className="rounded-none h-8 px-3"
                      onClick={() => setChartType("bar")}
                    >
                      <BarChart2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={chartType === "pie" ? "secondary" : "ghost"}
                      className="rounded-none h-8 px-3"
                      onClick={() => setChartType("pie")}
                    >
                      <PieChart className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Agrupar por</label>
                <Select
                  value={groupBy}
                  onValueChange={(value: "month" | "category" | "paymentMethod") => setGroupBy(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Mês</SelectItem>
                    <SelectItem value="category">Categoria</SelectItem>
                    <SelectItem value="paymentMethod">Método de Pagamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Agregação</label>
                <Select
                  value={aggregation}
                  onValueChange={(value: "sum" | "count" | "average") => setAggregation(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sum">Soma</SelectItem>
                    <SelectItem value="count">Contagem</SelectItem>
                    <SelectItem value="average">Média</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Valor Mínimo</label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Limite de Resultados</label>
                <Input type="number" placeholder="10" defaultValue="10" />
              </div>
            </div>

            <div className="h-[400px] w-full">
              {viewType === "chart" ? (
                <>
                  {chartType === "line" && <RevenueChart />}
                  {chartType === "bar" && <BarChartComponent />}
                  {chartType === "pie" && <PieChartComponent />}
                </>
              ) : (
                <DataTable />
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Análise de Tendências</CardTitle>
              <CardDescription>Comparação de receitas e despesas ao longo do tempo.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <RevenueChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
              <CardDescription>Resumo do período selecionado.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Recebido</span>
                  <span className="font-bold text-green-600">R$ 87.432,56</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total a Receber</span>
                  <span className="font-bold text-blue-600">R$ 23.145,00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Inadimplência</span>
                  <span className="font-bold text-red-600">R$ 5.432,10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Taxa de Conversão</span>
                  <span className="font-bold">87.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Ticket Médio</span>
                  <span className="font-bold">R$ 432,50</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Assinaturas Ativas</span>
                  <span className="font-bold">127</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Receita Recorrente</span>
                  <span className="font-bold text-green-600">R$ 8.350,00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
