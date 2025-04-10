import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

export function RecentPayments() {
  const payments = [
    {
      id: "INV-001",
      customer: {
        name: "João Silva",
        email: "joao@email.com",
        avatar: "/placeholder.svg?height=32&width=32&text=JS",
      },
      amount: "R$ 1.250,00",
      status: "Pago",
      date: "Hoje, 14:30",
      method: "Cartão de Crédito",
    },
    {
      id: "INV-002",
      customer: {
        name: "Maria Oliveira",
        email: "maria@email.com",
        avatar: "/placeholder.svg?height=32&width=32&text=MO",
      },
      amount: "R$ 850,00",
      status: "Pago",
      date: "Hoje, 11:15",
      method: "PIX",
    },
    {
      id: "INV-003",
      customer: {
        name: "Carlos Santos",
        email: "carlos@email.com",
        avatar: "/placeholder.svg?height=32&width=32&text=CS",
      },
      amount: "R$ 2.100,00",
      status: "Pago",
      date: "Ontem, 16:45",
      method: "Boleto",
    },
    {
      id: "INV-004",
      customer: {
        name: "Ana Pereira",
        email: "ana@email.com",
        avatar: "/placeholder.svg?height=32&width=32&text=AP",
      },
      amount: "R$ 750,00",
      status: "Pago",
      date: "Ontem, 09:20",
      method: "PIX",
    },
    {
      id: "INV-005",
      customer: {
        name: "Roberto Almeida",
        email: "roberto@email.com",
        avatar: "/placeholder.svg?height=32&width=32&text=RA",
      },
      amount: "R$ 1.500,00",
      status: "Pago",
      date: "22/04/2023",
      method: "Cartão de Crédito",
    },
  ]

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <div key={payment.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={payment.customer.avatar} alt={payment.customer.name} />
              <AvatarFallback>{payment.customer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{payment.customer.name}</p>
              <p className="text-xs text-muted-foreground">{payment.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{payment.amount}</p>
              <p className="text-xs text-muted-foreground">{payment.method}</p>
            </div>
            <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
              <CheckCircle2 className="h-3 w-3" />
              {payment.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
