import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SubscriptionsTable } from "@/components/subscriptions-table"
import { Plus } from "lucide-react"

export default function SubscriptionsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Assinaturas" description="Gerencie assinaturas recorrentes dos seus clientes.">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Assinatura
        </Button>
      </DashboardHeader>
      <SubscriptionsTable />
    </DashboardShell>
  )
}
