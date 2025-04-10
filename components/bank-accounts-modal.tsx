"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  bankName: z.string().min(1, "Nome do banco é obrigatório"),
  accountType: z.string().min(1, "Tipo de conta é obrigatório"),
  accountNumber: z.string().min(1, "Número da conta é obrigatório"),
  agency: z.string().min(1, "Agência é obrigatória"),
  holderName: z.string().min(1, "Nome do titular é obrigatório"),
  documentType: z.string().min(1, "Tipo de documento é obrigatório"),
  documentNumber: z.string().min(1, "Número do documento é obrigatório"),
  pixKey: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface BankAccountsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editAccount?: any
}

export function BankAccountsModal({ open, onOpenChange, editAccount }: BankAccountsModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  // Preenchendo o formulário com os dados do editAccount, se existirem
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: editAccount
      ? {
          bankName: editAccount.bankName,
          accountType: editAccount.accountType,
          accountNumber: editAccount.accountNumber,
          agency: editAccount.agency,
          holderName: editAccount.holderName,
          documentType: editAccount.documentType,
          documentNumber: editAccount.documentNumber,
          pixKey: editAccount.pixKey,
        }
      : {
          bankName: "",
          accountType: "",
          accountNumber: "",
          agency: "",
          holderName: "",
          documentType: "cpf",
          documentNumber: "",
          pixKey: "",
        },
  })

  function onSubmit(data: FormValues) {
    setIsLoading(true)

    // Simulação de envio para API
    setTimeout(() => {
      console.log(data)
      setIsLoading(false)
      toast({
        title: editAccount ? "Conta bancária atualizada" : "Conta bancária adicionada",
        description: `Conta do ${data.bankName} foi ${editAccount ? "atualizada" : "adicionada"} com sucesso.`,
      })
      onOpenChange(false)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{editAccount ? "Editar Conta Bancária" : "Adicionar Conta Bancária"}</DialogTitle>
          <DialogDescription>
            {editAccount
              ? "Atualize os dados da sua conta bancária."
              : "Adicione uma nova conta bancária para receber suas transferências."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banco</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o banco" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="nubank">Nubank</SelectItem>
                        <SelectItem value="itau">Itaú</SelectItem>
                        <SelectItem value="bradesco">Bradesco</SelectItem>
                        <SelectItem value="santander">Santander</SelectItem>
                        <SelectItem value="caixa">Caixa Econômica</SelectItem>
                        <SelectItem value="bb">Banco do Brasil</SelectItem>
                        <SelectItem value="inter">Banco Inter</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Conta</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="checking">Conta Corrente</SelectItem>
                        <SelectItem value="savings">Conta Poupança</SelectItem>
                        <SelectItem value="payment">Conta de Pagamento</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agência</FormLabel>
                    <FormControl>
                      <Input placeholder="0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número da Conta</FormLabel>
                    <FormControl>
                      <Input placeholder="00000-0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="holderName"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Nome do Titular</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo do titular" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="documentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Documento</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cpf">CPF</SelectItem>
                        <SelectItem value="cnpj">CNPJ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="documentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número do Documento</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={form.watch("documentType") === "cpf" ? "000.000.000-00" : "00.000.000/0000-00"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pixKey"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Chave PIX (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Email, telefone, CPF/CNPJ ou chave aleatória" {...field} />
                    </FormControl>
                    <FormDescription>Informar uma chave PIX facilita futuras transferências</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : editAccount ? "Atualizar Conta" : "Adicionar Conta"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
