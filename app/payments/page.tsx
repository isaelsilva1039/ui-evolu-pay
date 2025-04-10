import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PaymentsTable } from "@/components/payments-table"
import { Download, Filter } from "lucide-react"

export default function PaymentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Pagamentos" description="Visualize todos os pagamentos recebidos.">
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
      <PaymentsTable />
    </DashboardShell>
  )
}
