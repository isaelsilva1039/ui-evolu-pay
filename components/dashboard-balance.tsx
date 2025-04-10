import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpFromLine, Clock, CreditCard, DollarSign, Wallet } from "lucide-react"
import { AnticipationButton } from "@/components/anticipation-button"

export function DashboardBalance() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Disponível</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 12.543,78</div>
          <p className="text-xs text-muted-foreground">Atualizado em 10/04/2025</p>
          <div className="mt-3 flex gap-2">
            <Button variant="outline" size="sm" className="w-full flex items-center gap-1">
              <ArrowUpFromLine className="h-3 w-3" />
              <span>Transferir</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo a Receber</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 23.145,00</div>
          <p className="text-xs text-muted-foreground">Próximos 30 dias</p>
          <div className="mt-3">
            <AnticipationButton />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fluxo de Caixa (Mês)</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">R$ 42.368,89</div>
          <p className="text-xs text-muted-foreground">+8.2% em relação ao mês anterior</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">94.3%</div>
          <p className="text-xs text-muted-foreground">+2.1% em relação ao mês anterior</p>
        </CardContent>
      </Card>
    </div>
  )
}
