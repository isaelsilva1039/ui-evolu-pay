import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export function UpcomingInvoices() {
  const invoices = [
    {
      id: "INV-006",
      customer: "Empresa ABC Ltda.",
      amount: "R$ 3.500,00",
      dueDate: "Amanhã",
      status: "Pendente",
    },
    {
      id: "INV-007",
      customer: "Consultoria XYZ",
      amount: "R$ 1.800,00",
      dueDate: "Em 2 dias",
      status: "Pendente",
    },
    {
      id: "INV-008",
      customer: "Distribuidora 123",
      amount: "R$ 2.750,00",
      dueDate: "Em 3 dias",
      status: "Pendente",
    },
    {
      id: "INV-009",
      customer: "Comércio Rápido",
      amount: "R$ 950,00",
      dueDate: "Em 5 dias",
      status: "Pendente",
    },
    {
      id: "INV-010",
      customer: "Indústria Nacional",
      amount: "R$ 4.200,00",
      dueDate: "Em 7 dias",
      status: "Pendente",
    },
  ]

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div key={invoice.id} className="flex flex-col p-3 border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">{invoice.customer}</p>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              {invoice.status}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">{invoice.amount}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{invoice.dueDate}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-muted-foreground">{invoice.id}</p>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              Enviar Lembrete
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
