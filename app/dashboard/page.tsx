import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { RecentPayments } from "@/components/recent-payments"
import { OverviewChart } from "@/components/overview-chart"
import { QuickActions } from "@/components/quick-actions"
import { UpcomingInvoices } from "@/components/upcoming-invoices"
import { DashboardBalance } from "@/components/dashboard-balance"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" description="Visão geral das suas finanças e atividades recentes." />

      {/* Adicionando o componente de saldo */}
      <DashboardBalance />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análise</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Visão Geral</CardTitle>
                <CardDescription>Receitas e despesas dos últimos 6 meses.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>Acesse rapidamente as principais funcionalidades.</CardDescription>
              </CardHeader>
              <CardContent>
                <QuickActions />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Pagamentos Recentes</CardTitle>
                <CardDescription>Últimos pagamentos recebidos.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentPayments />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Cobranças a Vencer</CardTitle>
                <CardDescription>Próximas cobranças nos próximos 7 dias.</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingInvoices />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise Financeira</CardTitle>
              <CardDescription>Análise detalhada das suas finanças.</CardDescription>
            </CardHeader>
            <CardContent className="h-[450px] flex items-center justify-center">
              <p className="text-muted-foreground">Conteúdo de análise detalhada será exibido aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>Gere relatórios personalizados.</CardDescription>
            </CardHeader>
            <CardContent className="h-[450px] flex items-center justify-center">
              <p className="text-muted-foreground">Conteúdo de relatórios será exibido aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
