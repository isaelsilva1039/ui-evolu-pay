"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, ChevronDown, ChevronUp, Info, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  customer: z.string({
    required_error: "Selecione um cliente",
  }),
  value: z.string().min(1, "Informe o valor da cobrança"),
  dueDate: z.date({
    required_error: "Selecione a data de vencimento",
  }),
  description: z.string().optional(),
  externalReference: z.string().optional(),
  paymentMethod: z.enum(["BOLETO", "CREDIT_CARD", "PIX", "UNDEFINED"], {
    required_error: "Selecione um método de pagamento",
  }),
  installments: z.number().min(1).max(12).optional(),
  installmentValue: z.string().optional(),
  discount: z
    .object({
      value: z.string().optional(),
      dueDateLimitDays: z.number().optional(),
      type: z.enum(["FIXED", "PERCENTAGE"]).optional(),
    })
    .optional(),
  interest: z
    .object({
      value: z.string().optional(),
    })
    .optional(),
  fine: z
    .object({
      value: z.string().optional(),
    })
    .optional(),
  postalService: z.boolean().optional(),
  sendEmailNotification: z.boolean().optional(),
  split: z
    .array(
      z.object({
        walletId: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
})

type FormValues = z.infer<typeof formSchema>

interface CreateInvoiceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateInvoiceModal({ open, onOpenChange }: CreateInvoiceModalProps) {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [activeTab, setActiveTab] = useState("single")
  const [showSplitOptions, setShowSplitOptions] = useState(false)
  const [splitRecipients, setSplitRecipients] = useState<{ id: string; walletId: string; value: string }[]>([
    { id: "1", walletId: "", value: "" },
  ])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      dueDate: new Date(),
      description: "",
      externalReference: "",
      paymentMethod: "UNDEFINED",
      installments: 1,
      installmentValue: "",
      discount: {
        value: "",
        dueDateLimitDays: 0,
        type: "FIXED",
      },
      interest: {
        value: "0",
      },
      fine: {
        value: "0",
      },
      postalService: false,
      sendEmailNotification: true,
    },
  })

  const customers = [
    { id: "cus_000001", name: "João Silva" },
    { id: "cus_000002", name: "Maria Oliveira" },
    { id: "cus_000003", name: "Carlos Santos" },
    { id: "cus_000004", name: "Ana Pereira" },
    { id: "cus_000005", name: "Roberto Almeida" },
    { id: "cus_000006", name: "Empresa ABC Ltda." },
    { id: "cus_000007", name: "Consultoria XYZ" },
    { id: "cus_000008", name: "Distribuidora 123" },
    { id: "cus_000009", name: "Comércio Rápido" },
    { id: "cus_000010", name: "Indústria Nacional" },
  ]

  const wallets = [
    { id: "wallet_000001", name: "Carteira Principal" },
    { id: "wallet_000002", name: "Carteira Secundária" },
    { id: "wallet_000003", name: "Carteira de Parceiros" },
  ]

  function onSubmit(data: FormValues) {
    console.log(data)
    if (showSplitOptions) {
      data.split = splitRecipients.map((recipient) => ({
        walletId: recipient.walletId,
        value: recipient.value,
      }))
    }

    // Aqui você enviaria os dados para a API
    alert("Cobrança criada com sucesso!")
    onOpenChange(false)
  }

  function calculateInstallmentValue() {
    const totalValue = Number.parseFloat(form.getValues("value").replace(",", ".")) || 0
    const installments = form.getValues("installments") || 1
    if (totalValue && installments > 0) {
      const installmentValue = (totalValue / installments).toFixed(2).replace(".", ",")
      form.setValue("installmentValue", installmentValue)
      return installmentValue
    }
    return "0,00"
  }

  function addSplitRecipient() {
    setSplitRecipients([...splitRecipients, { id: Date.now().toString(), walletId: "", value: "" }])
  }

  function removeSplitRecipient(id: string) {
    setSplitRecipients(splitRecipients.filter((recipient) => recipient.id !== id))
  }

  function updateSplitRecipient(id: string, field: "walletId" | "value", value: string) {
    setSplitRecipients(
      splitRecipients.map((recipient) => (recipient.id === id ? { ...recipient, [field]: value } : recipient)),
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Cobrança</DialogTitle>
          <DialogDescription>Crie uma nova cobrança para seus clientes.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="single" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="single">Cobrança Única</TabsTrigger>
                <TabsTrigger value="installments">Parcelamento</TabsTrigger>
              </TabsList>
              <TabsContent value="single" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="customer"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Cliente</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um cliente" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {customers.map((customer) => (
                              <SelectItem key={customer.id} value={customer.id}>
                                {customer.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor (R$)</FormLabel>
                        <FormControl>
                          <Input placeholder="0,00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data de Vencimento</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy", { locale: ptBR })
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              locale={ptBR}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Descreva o motivo da cobrança" className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Forma de Pagamento</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                          >
                            <FormItem className="flex flex-col items-center space-y-2 rounded-md border p-4">
                              <FormControl>
                                <RadioGroupItem value="BOLETO" className="sr-only" />
                              </FormControl>
                              <div
                                className={cn(
                                  "flex h-10 w-10 items-center justify-center rounded-full",
                                  field.value === "BOLETO" ? "bg-primary text-primary-foreground" : "bg-muted",
                                )}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-receipt"
                                >
                                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                                  <path d="M12 17.5v-11" />
                                </svg>
                              </div>
                              <FormLabel className="font-normal text-center">Boleto Bancário</FormLabel>
                            </FormItem>

                            <FormItem className="flex flex-col items-center space-y-2 rounded-md border p-4">
                              <FormControl>
                                <RadioGroupItem value="CREDIT_CARD" className="sr-only" />
                              </FormControl>
                              <div
                                className={cn(
                                  "flex h-10 w-10 items-center justify-center rounded-full",
                                  field.value === "CREDIT_CARD" ? "bg-primary text-primary-foreground" : "bg-muted",
                                )}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-credit-card"
                                >
                                  <rect width="20" height="14" x="2" y="5" rx="2" />
                                  <line x1="2" x2="22" y1="10" y2="10" />
                                </svg>
                              </div>
                              <FormLabel className="font-normal text-center">Cartão de Crédito</FormLabel>
                            </FormItem>

                            <FormItem className="flex flex-col items-center space-y-2 rounded-md border p-4">
                              <FormControl>
                                <RadioGroupItem value="PIX" className="sr-only" />
                              </FormControl>
                              <div
                                className={cn(
                                  "flex h-10 w-10 items-center justify-center rounded-full",
                                  field.value === "PIX" ? "bg-primary text-primary-foreground" : "bg-muted",
                                )}
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M16.2426 7.75736L7.75736 16.2426M16.2426 7.75736L11.6569 7.75736M16.2426 7.75736L16.2426 12.3431"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M7.75732 16.2426L12.343 16.2426M7.75732 16.2426L7.75732 11.6569"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <FormLabel className="font-normal text-center">PIX</FormLabel>
                            </FormItem>

                            <FormItem className="flex flex-col items-center space-y-2 rounded-md border p-4">
                              <FormControl>
                                <RadioGroupItem value="UNDEFINED" className="sr-only" />
                              </FormControl>
                              <div
                                className={cn(
                                  "flex h-10 w-10 items-center justify-center rounded-full",
                                  field.value === "UNDEFINED" ? "bg-primary text-primary-foreground" : "bg-muted",
                                )}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-wallet"
                                >
                                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                                </svg>
                              </div>
                              <FormLabel className="font-normal text-center">Cliente Escolhe</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="installments" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="customer"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Cliente</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um cliente" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {customers.map((customer) => (
                              <SelectItem key={customer.id} value={customer.id}>
                                {customer.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Total (R$)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0,00"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              if (activeTab === "installments") {
                                setTimeout(calculateInstallmentValue, 100)
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="installments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Parcelas</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(Number.parseInt(value))
                            setTimeout(calculateInstallmentValue, 100)
                          }}
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}x
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="installmentValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor da Parcela (R$)</FormLabel>
                        <FormControl>
                          <Input readOnly {...field} />
                        </FormControl>
                        <FormDescription>Valor calculado automaticamente</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Primeira Parcela</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy", { locale: ptBR })
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              locale={ptBR}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Descreva o motivo da cobrança" className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Forma de Pagamento</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                          >
                            <FormItem className="flex flex-col items-center space-y-2 rounded-md border p-4">
                              <FormControl>
                                <RadioGroupItem value="BOLETO" className="sr-only" />
                              </FormControl>
                              <div
                                className={cn(
                                  "flex h-10 w-10 items-center justify-center rounded-full",
                                  field.value === "BOLETO" ? "bg-primary text-primary-foreground" : "bg-muted",
                                )}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-receipt"
                                >
                                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                                  <path d="M12 17.5v-11" />
                                </svg>
                              </div>
                              <FormLabel className="font-normal text-center">Boleto Bancário</FormLabel>
                            </FormItem>

                            <FormItem className="flex flex-col items-center space-y-2 rounded-md border p-4">
                              <FormControl>
                                <RadioGroupItem value="CREDIT_CARD" className="sr-only" />
                              </FormControl>
                              <div
                                className={cn(
                                  "flex h-10 w-10 items-center justify-center rounded-full",
                                  field.value === "CREDIT_CARD" ? "bg-primary text-primary-foreground" : "bg-muted",
                                )}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-credit-card"
                                >
                                  <rect width="20" height="14" x="2" y="5" rx="2" />
                                  <line x1="2" x2="22" y1="10" y2="10" />
                                </svg>
                              </div>
                              <FormLabel className="font-normal text-center">Cartão de Crédito</FormLabel>
                            </FormItem>

                            <FormItem className="flex flex-col items-center space-y-2 rounded-md border p-4">
                              <FormControl>
                                <RadioGroupItem value="PIX" className="sr-only" />
                              </FormControl>
                              <div
                                className={cn(
                                  "flex h-10 w-10 items-center justify-center rounded-full",
                                  field.value === "PIX" ? "bg-primary text-primary-foreground" : "bg-muted",
                                )}
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M16.2426 7.75736L7.75736 16.2426M16.2426 7.75736L11.6569 7.75736M16.2426 7.75736L16.2426 12.3431"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M7.75732 16.2426L12.343 16.2426M7.75732 16.2426L7.75732 11.6569"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <FormLabel className="font-normal text-center">PIX</FormLabel>
                            </FormItem>

                            <FormItem className="flex flex-col items-center space-y-2 rounded-md border p-4">
                              <FormControl>
                                <RadioGroupItem value="UNDEFINED" className="sr-only" />
                              </FormControl>
                              <div
                                className={cn(
                                  "flex h-10 w-10 items-center justify-center rounded-full",
                                  field.value === "UNDEFINED" ? "bg-primary text-primary-foreground" : "bg-muted",
                                )}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-wallet"
                                >
                                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                                </svg>
                              </div>
                              <FormLabel className="font-normal text-center">Cliente Escolhe</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div>
              <Button
                type="button"
                variant="ghost"
                className="flex items-center gap-2 px-0"
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              >
                {showAdvancedOptions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                Opções avançadas
              </Button>

              {showAdvancedOptions && (
                <div className="space-y-4 mt-4 border rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="externalReference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Referência Externa</FormLabel>
                          <FormControl>
                            <Input placeholder="Código ou referência do seu sistema" {...field} />
                          </FormControl>
                          <FormDescription>Identificador no seu sistema para referência</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Multa e Juros por Atraso</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fine.value"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Multa (%)</FormLabel>
                              <FormControl>
                                <Input placeholder="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="interest.value"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Juros ao mês (%)</FormLabel>
                              <FormControl>
                                <Input placeholder="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">Desconto</h4>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Desconto aplicado se o pagamento for realizado até a data limite</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="discount.value"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Valor</FormLabel>
                              <FormControl>
                                <Input placeholder="0,00" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="discount.type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="FIXED">Valor Fixo (R$)</SelectItem>
                                  <SelectItem value="PERCENTAGE">Percentual (%)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="discount.dueDateLimitDays"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dias antes do vencimento</FormLabel>
                              <Select
                                onValueChange={(value) => field.onChange(Number.parseInt(value))}
                                defaultValue={field.value?.toString()}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[0, 1, 2, 3, 5, 7, 10, 15, 20, 30].map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                      {num === 0 ? "Até o vencimento" : `${num} dias`}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Opções de Notificação</h4>
                      <FormField
                        control={form.control}
                        name="sendEmailNotification"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Enviar por e-mail</FormLabel>
                              <FormDescription>Notificar o cliente por e-mail</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="postalService"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Carta de Cobrança</FormLabel>
                              <FormDescription>Enviar carta de cobrança pelos Correios</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">Divisão de Pagamento (Split)</h4>
                        <Badge variant="outline" className="text-xs">
                          Opcional
                        </Badge>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSplitOptions(!showSplitOptions)}
                      >
                        {showSplitOptions ? "Ocultar" : "Configurar"}
                      </Button>
                    </div>

                    {showSplitOptions && (
                      <div className="space-y-4 border rounded-md p-4">
                        <p className="text-sm text-muted-foreground">
                          Configure como o valor desta cobrança será dividido entre carteiras.
                        </p>

                        {splitRecipients.map((recipient, index) => (
                          <div key={recipient.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                            <div className="md:col-span-7">
                              <Label>Carteira</Label>
                              <Select
                                value={recipient.walletId}
                                onValueChange={(value) => updateSplitRecipient(recipient.id, "walletId", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione uma carteira" />
                                </SelectTrigger>
                                <SelectContent>
                                  {wallets.map((wallet) => (
                                    <SelectItem key={wallet.id} value={wallet.id}>
                                      {wallet.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="md:col-span-4">
                              <Label>Valor (R$)</Label>
                              <Input
                                placeholder="0,00"
                                value={recipient.value}
                                onChange={(e) => updateSplitRecipient(recipient.id, "value", e.target.value)}
                              />
                            </div>

                            <div className="md:col-span-1 flex justify-end">
                              {index > 0 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeSplitRecipient(recipient.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}

                        <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addSplitRecipient}>
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Carteira
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Criar Cobrança</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
