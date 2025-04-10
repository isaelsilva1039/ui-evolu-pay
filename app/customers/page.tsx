import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CustomersTable } from "@/components/customers-table"
import { Plus } from "lucide-react"

export default function CustomersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Clientes" description="Gerencie seus clientes e suas informações.">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </DashboardHeader>
      <CustomersTable />
    </DashboardShell>
  )
}
