import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { InvoicesTable } from "@/components/invoices-table"
import { CreateInvoiceButton } from "@/components/create-invoice-button"

export default function InvoicesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Cobranças" description="Gerencie todas as suas cobranças em um só lugar.">
        <CreateInvoiceButton />
      </DashboardHeader>
      <InvoicesTable />
    </DashboardShell>
  )
}
