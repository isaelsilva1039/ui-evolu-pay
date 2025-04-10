"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, CalendarCheck, Info } from "lucide-react"

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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  value: z.string().min(1, "Informe o valor da antecipação"),
  anticipationType: z.enum(["all", "selected", "date"], {
    required_error: "Selecione um tipo de antecipação",
  }),
  date: z.date().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface AnticipationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AnticipationModal({ open, onOpenChange }: AnticipationModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [anticipationFee, setAnticipationFee] = useState(0)
  const [receiveValue, setReceiveValue] = useState(0)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      anticipationType: "all",
    },
  })

  // Simulação de cálculo de antecipação
  const calculateFee = (value: string, daysToAnticipate = 30) => {
    const amount = Number.parseFloat(value.replace(/\./g, "").replace(",", ".")) || 0
    const feeRate = 0.025 + daysToAnticipate / 1000
    const fee = amount * feeRate
    const receive = amount - fee

    setAnticipationFee(fee)
    setReceiveValue(receive)

    return { fee, receive }
  }

  // Observa mudanças no valor e tipo de antecipação
  const watchValue = form.watch("value")
  const watchType = form.watch("anticipationType")
  const watchDate = form.watch("date")

  // Recalcula a taxa quando o valor ou o tipo mudam
  useState(() => {
    let daysToAnticipate = 30

    if (watchType === "date" && watchDate) {
      const today = new Date()
      const diff = Math.ceil((watchDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      daysToAnticipate = diff > 0 ? diff : 0
    }

    if (watchValue) {
      calculateFee(watchValue, daysToAnticipate)
    }
  })

  function onSubmit(data: FormValues) {
    setIsLoading(true)

    // Simulação de envio para API
    setTimeout(() => {
      console.log(data)
      setIsLoading(false)
      toast({
        title: "Antecipação solicitada",
        description: `Sua solicitação de antecipação de R$ ${data.value} foi recebida com sucesso.`,
      })
      onOpenChange(false)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Antecipar Recebíveis</DialogTitle>
          <DialogDescription>
            Solicite a antecipação dos seus recebíveis e receba o dinheiro em sua conta mais rapidamente.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center justify-between rounded-md border p-3 bg-muted/50">
              <span className="text-sm">Valor disponível para antecipação:</span>
              <span className="font-medium text-green-600">R$ 23.145,00</span>
            </div>

            <FormField
              control={form.control}
              name="anticipationType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de Antecipação</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2">
                          <CalendarCheck className="h-4 w-4" />
                          Antecipar todos os recebíveis
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="selected" />
                        </FormControl>
                        <FormLabel className="font-normal">Valor específico</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="date" />
                        </FormControl>
                        <FormLabel className="font-normal">Recebíveis até uma data</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchType === "selected" && (
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor (R$)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0,00"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          calculateFee(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watchType === "date" && (
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Antecipar recebíveis até</FormLabel>
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
            )}

            {(watchValue || watchType === "all") && (
              <div className="rounded-md border p-4 space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  Simulação da antecipação
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Valores aproximados. A taxa final pode variar.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Valor bruto:</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                        Number.parseFloat(watchValue?.replace(/\./g, "").replace(",", ".") || "0") || 23145.0,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Taxa de antecipação:</span>
                    <span className="font-medium text-red-500">
                      -{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(anticipationFee)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Valor a receber:</span>
                    <span className="font-medium text-green-600">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(receiveValue)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processando..." : "Solicitar Antecipação"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
