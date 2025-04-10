import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { TransfersTable } from "@/components/transfers-table"
import { TransferBalance } from "@/components/transfer-balance"
import { CreateTransferButton } from "@/components/create-transfer-button"

export default function TransfersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Transferências" description="Transfira seu saldo para sua conta bancária.">
        <CreateTransferButton />
      </DashboardHeader>
      <div className="mb-8">
        <TransferBalance />
      </div>
      <TransfersTable />
    </DashboardShell>
  )
}
