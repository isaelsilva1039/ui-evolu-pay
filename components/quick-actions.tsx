import { Button } from "@/components/ui/button"
import { Repeat, User, CreditCard, Download, Send } from "lucide-react"
import { CreateInvoiceButton } from "@/components/create-invoice-button"

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="h-24">
        <CreateInvoiceButton />
      </div>
      <Button variant="outline" className="h-24 flex flex-col gap-2 justify-center">
        <User className="h-6 w-6" />
        <span>Novo Cliente</span>
      </Button>
      <Button variant="outline" className="h-24 flex flex-col gap-2 justify-center">
        <Repeat className="h-6 w-6" />
        <span>Nova Assinatura</span>
      </Button>
      <Button variant="outline" className="h-24 flex flex-col gap-2 justify-center">
        <CreditCard className="h-6 w-6" />
        <span>Link de Pagamento</span>
      </Button>
      <Button variant="outline" className="h-24 flex flex-col gap-2 justify-center">
        <Download className="h-6 w-6" />
        <span>Exportar Dados</span>
      </Button>
      <Button variant="outline" className="h-24 flex flex-col gap-2 justify-center">
        <Send className="h-6 w-6" />
        <span>Enviar Lembretes</span>
      </Button>
    </div>
  )
}
