"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BankAccountsModal } from "@/components/bank-accounts-modal"
import { Edit2, MoreHorizontal, Plus, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function BankAccountsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editAccount, setEditAccount] = useState<any>(null)

  // Simulação de contas bancárias
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: "1",
      bankName: "Nubank",
      bankIcon: "/placeholder.svg?height=40&width=40&text=NU",
      accountType: "Conta Corrente",
      accountNumber: "12345-6",
      agency: "0001",
      holderName: "João Silva",
      documentType: "cpf",
      documentNumber: "123.456.789-00",
      pixKey: "joao@email.com",
      isDefault: true,
    },
    {
      id: "2",
      bankName: "Itaú",
      bankIcon: "/placeholder.svg?height=40&width=40&text=IT",
      accountType: "Conta Corrente",
      accountNumber: "56789-0",
      agency: "1234",
      holderName: "João Silva",
      documentType: "cpf",
      documentNumber: "123.456.789-00",
      pixKey: "",
      isDefault: false,
    },
    {
      id: "3",
      bankName: "Bradesco",
      bankIcon: "/placeholder.svg?height=40&width=40&text=BR",
      accountType: "Conta Corrente",
      accountNumber: "45678-9",
      agency: "0123",
      holderName: "Empresa ABC",
      documentType: "cnpj",
      documentNumber: "12.345.678/0001-90",
      pixKey: "financeiro@abc.com",
      isDefault: false,
    },
  ])

  const handleEdit = (account: any) => {
    setEditAccount(account)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setBankAccounts(bankAccounts.filter((account) => account.id !== id))
    toast({
      title: "Conta bancária removida",
      description: "A conta bancária foi removida com sucesso.",
      variant: "destructive",
    })
  }

  const handleSetDefault = (id: string) => {
    setBankAccounts(
      bankAccounts.map((account) => ({
        ...account,
        isDefault: account.id === id,
      })),
    )
    toast({
      title: "Conta padrão definida",
      description: "A conta bancária foi definida como padrão para transferências.",
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Contas Bancárias" description="Gerencie suas contas bancárias para transferências.">
        <Button
          onClick={() => {
            setEditAccount(null)
            setIsModalOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Conta Bancária
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bankAccounts.map((account) => (
          <Card key={account.id} className={account.isDefault ? "border-primary" : ""}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={account.bankIcon || "/placeholder.svg"}
                    alt={account.bankName}
                    className="w-10 h-10 rounded"
                  />
                  <div>
                    <CardTitle className="text-lg">{account.bankName}</CardTitle>
                    <CardDescription>{account.accountType}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEdit(account)}>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    {!account.isDefault && (
                      <DropdownMenuItem onClick={() => handleSetDefault(account.id)}>
                        Definir como padrão
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta bancária.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(account.id)}>Confirmar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {account.isDefault && (
                <div className="mt-1">
                  <span className="text-xs text-primary font-medium">Conta padrão</span>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Agência</span>
                  <span className="font-medium">{account.agency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Conta</span>
                  <span className="font-medium">{account.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Titular</span>
                  <span className="font-medium">{account.holderName}</span>
                </div>
                {account.pixKey && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Chave PIX</span>
                    <span className="font-medium truncate max-w-[150px]">{account.pixKey}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => handleEdit(account)}>
                Editar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <BankAccountsModal open={isModalOpen} onOpenChange={setIsModalOpen} editAccount={editAccount} />
    </DashboardShell>
  )
}
