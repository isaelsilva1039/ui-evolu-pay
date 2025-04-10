"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Copy, Download, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface InvoiceDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  invoiceId: string
}

export function InvoiceDetailsModal({ open, onOpenChange, invoiceId }: InvoiceDetailsModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  // Simulação de dados da cobrança
  const invoice = {
    id: invoiceId,
    customer: "João Silva",
    customerEmail: "joao@email.com",
    customerPhone: "(11) 98765-4321",
    status: "pending",
    statusLabel: "Pendente",
    value: 1250.0,
    netValue: 1237.5,
    fee: 12.5,
    dueDate: new Date(2023, 4, 20),
    paymentDate: null,
    description: "Serviços de consultoria - Abril/2023",
    externalReference: "REF-2023-042",
    paymentMethod: "BOLETO",
    paymentMethodLabel: "Boleto Bancário",
    paymentLink: "https://www.asaas.com/c/123456789",
    barCode: "34191.79001 01043.510047 91020.150008 9 87650000012500",
    fine: {
      value: 2,
      type: "PERCENTAGE",
    },
    interest: {
      value: 1,
      type: "PERCENTAGE",
    },
    discount: {
      value: 5,
      type: "PERCENTAGE",
      dueDateLimitDays: 5,
    },
    installment: {
      number: 1,
      total: 1,
    },
    history: [
      {
        date: new Date(2023, 3, 15, 10, 30),
        description: "Cobrança criada",
        user: "Sistema",
      },
      {
        date: new Date(2023, 3, 15, 10, 31),
        description: "E-mail de cobrança enviado",
        user: "Sistema",
      },
      {
        date: new Date(2023, 3, 18, 14, 22),
        description: "Lembrete de cobrança enviado",
        user: "Admin",
      },
    ],
  }

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado!",
      description: message,
    })
  }

  const sendReminder = () => {
    setIsLoading(true)
    // Simulação de envio de lembrete
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Lembrete enviado",
        description: "O cliente foi notificado sobre esta cobrança.",
      })
    }, 1500)
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "outline" | "default"; className: string }> = {
      pending: {
        label: "Pendente",
        variant: "outline",
        className: "bg-yellow-50 text-yellow-700 border-yellow-200",
      },
      processing: {
        label: "Processando",
        variant: "outline",
        className: "bg-blue-50 text-blue-700 border-blue-200",
      },
      success: {
        label: "Pago",
        variant: "outline",
        className: "bg-green-50 text-green-700 border-green-200",
      },
      failed: {
        label: "Falhou",
        variant: "outline",
        className: "bg-red-50 text-red-700 border-red-200",
      },
      canceled: {
        label: "Cancelado",
        variant: "outline",
        className: "bg-gray-50 text-gray-700 border-gray-200",
      },
    }

    const { label, variant, className } = statusMap[status] || {
      label: status,
      variant: "outline",
      className: "",
    }

    return (
      <Badge variant={variant} className={className}>
        {label}
      </Badge>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Detalhes da Cobrança</DialogTitle>
            {getStatusBadge(invoice.status)}
          </div>
          <DialogDescription>
            {invoice.id} • Criada em {format(invoice.history[0].date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="payment">Pagamento</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Cliente</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <p className="font-medium">{invoice.customer}</p>
                      <p className="text-sm text-muted-foreground">{invoice.customerEmail}</p>
                      <p className="text-sm text-muted-foreground">{invoice.customerPhone}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Valores</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Valor:</span>
                        <span className="font-medium">
                          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(invoice.value)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Taxa:</span>
                        <span>
                          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(invoice.fee)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Valor líquido:</span>
                        <span className="font-medium">
                          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                            invoice.netValue,
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-sm font-medium mb-2">Informações da Cobrança</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <Label className="text-muted-foreground">Vencimento</Label>
                          <p>{format(invoice.dueDate, "dd/MM/yyyy", { locale: ptBR })}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Forma de Pagamento</Label>
                          <p>{invoice.paymentMethodLabel}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Parcela</Label>
                          <p>
                            {invoice.installment.number}/{invoice.installment.total}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <Label className="text-muted-foreground">Referência Externa</Label>
                          <p>{invoice.externalReference || "-"}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Descrição</Label>
                          <p>{invoice.description || "-"}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-sm font-medium mb-2">Configurações Adicionais</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Multa por Atraso</Label>
                        <p>{invoice.fine.value}%</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Juros por Atraso (ao mês)</Label>
                        <p>{invoice.interest.value}%</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Desconto</Label>
                        <p>
                          {invoice.discount.value}% até {invoice.discount.dueDateLimitDays} dias antes do vencimento
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4 pt-4">
            {invoice.status === "pending" && (
              <Card>
                <CardHeader>
                  <CardTitle>Link de Pagamento</CardTitle>
                  <CardDescription>Compartilhe este link com o cliente para pagamento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="border rounded-md p-2 flex-1 bg-muted text-sm overflow-hidden">
                      {invoice.paymentLink}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(invoice.paymentLink, "Link de pagamento copiado!")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {invoice.paymentMethod === "BOLETO" && invoice.status === "pending" && (
              <Card>
                <CardHeader>
                  <CardTitle>Código de Barras</CardTitle>
                  <CardDescription>Código de barras para pagamento do boleto</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="border rounded-md p-2 flex-1 bg-muted text-sm overflow-hidden font-mono">
                      {invoice.barCode}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(invoice.barCode, "Código de barras copiado!")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Baixar Boleto
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {invoice.paymentMethod === "PIX" && invoice.status === "pending" && (
              <Card>
                <CardHeader>
                  <CardTitle>PIX</CardTitle>
                  <CardDescription>QR Code e código PIX para pagamento</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="border p-4 rounded-md bg-white mb-4">
                    <img
                      src="/placeholder.svg?height=200&width=200&text=QR+Code+PIX"
                      alt="QR Code PIX"
                      className="h-48 w-48"
                    />
                  </div>
                  <div className="flex items-center space-x-2 w-full">
                    <div className="border rounded-md p-2 flex-1 bg-muted text-sm overflow-hidden font-mono">
                      00020126580014br.gov.bcb.pix0136a629534e-7693-4846-b028-f142082d7b0752040000530398654041.005802BR5925ASAAS
                      PAGAMENTOS LTDA6009SAO PAULO62070503***6304E2CA
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        copyToClipboard(
                          "00020126580014br.gov.bcb.pix0136a629534e-7693-4846-b028-f142082d7b0752040000530398654041.005802BR5925ASAAS PAGAMENTOS LTDA6009SAO PAULO62070503***6304E2CA",
                          "Código PIX copiado!",
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {invoice.status === "success" && (
              <Card>
                <CardHeader>
                  <CardTitle>Pagamento Confirmado</CardTitle>
                  <CardDescription>Esta cobrança já foi paga</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Data do pagamento:</span>
                      <span className="font-medium">
                        {invoice.paymentDate
                          ? format(invoice.paymentDate, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
                          : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Valor pago:</span>
                      <span className="font-medium">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(invoice.value)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Forma de pagamento:</span>
                      <span className="font-medium">{invoice.paymentMethodLabel}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico da Cobrança</CardTitle>
                <CardDescription>Registro de eventos relacionados a esta cobrança</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoice.history.map((event, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{event.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(event.date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })} • {event.user}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator className="my-4" />

        <DialogFooter className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
          </div>
          <div className="flex gap-2">
            {invoice.status === "pending" && (
              <>
                <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={sendReminder}>
                  <Send className="h-4 w-4" />
                  {isLoading ? "Enviando..." : "Enviar Lembrete"}
                </Button>
                <Button variant="destructive" size="sm">
                  Cancelar Cobrança
                </Button>
              </>
            )}
            <Button variant="outline" size="sm">
              Editar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
