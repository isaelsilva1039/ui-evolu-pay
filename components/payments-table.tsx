"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Eye, MoreHorizontal, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"

type Payment = {
  id: string
  invoiceId: string
  customer: string
  email: string
  status: "confirmed" | "pending" | "refunded" | "failed"
  amount: number
  date: string
  paymentMethod: string
}

const data: Payment[] = [
  {
    id: "PAY-001",
    invoiceId: "INV-001",
    customer: "João Silva",
    email: "joao@email.com",
    status: "confirmed",
    amount: 1250.0,
    date: "20/04/2023",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: "PAY-002",
    invoiceId: "INV-002",
    customer: "Maria Oliveira",
    email: "maria@email.com",
    status: "confirmed",
    amount: 850.0,
    date: "22/04/2023",
    paymentMethod: "PIX",
  },
  {
    id: "PAY-003",
    invoiceId: "INV-003",
    customer: "Carlos Santos",
    email: "carlos@email.com",
    status: "confirmed",
    amount: 2100.0,
    date: "25/04/2023",
    paymentMethod: "Boleto",
  },
  {
    id: "PAY-004",
    invoiceId: "INV-004",
    customer: "Ana Pereira",
    email: "ana@email.com",
    status: "confirmed",
    amount: 750.0,
    date: "28/04/2023",
    paymentMethod: "PIX",
  },
  {
    id: "PAY-005",
    invoiceId: "INV-005",
    customer: "Roberto Almeida",
    email: "roberto@email.com",
    status: "confirmed",
    amount: 1500.0,
    date: "30/04/2023",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: "PAY-006",
    invoiceId: "INV-011",
    customer: "Fernanda Lima",
    email: "fernanda@email.com",
    status: "pending",
    amount: 1100.0,
    date: "15/05/2023",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: "PAY-007",
    invoiceId: "INV-012",
    customer: "Ricardo Souza",
    email: "ricardo@email.com",
    status: "failed",
    amount: 750.0,
    date: "18/05/2023",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: "PAY-008",
    invoiceId: "INV-008",
    customer: "Distribuidora 123",
    email: "financeiro@123.com",
    status: "refunded",
    amount: 2750.0,
    date: "08/05/2023",
    paymentMethod: "Boleto",
  },
]

export function PaymentsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const viewPaymentDetails = (paymentId: string) => {
    toast({
      title: "Visualizando pagamento",
      description: `Detalhes do pagamento ${paymentId}.`,
    })
  }

  const viewInvoice = (invoiceId: string) => {
    toast({
      title: "Visualizando cobrança",
      description: `Detalhes da cobrança ${invoiceId}.`,
    })
  }

  const columns: ColumnDef<Payment>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "customer",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Cliente
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const name = row.getValue("customer") as string
        const email = row.original.email

        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${name.charAt(0)}`} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{name}</div>
              <div className="text-sm text-muted-foreground">{email}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string

        const statusMap: Record<string, { label: string; variant: "outline" | "default"; className: string }> = {
          confirmed: {
            label: "Confirmado",
            variant: "outline",
            className: "bg-green-50 text-green-700 border-green-200",
          },
          pending: {
            label: "Pendente",
            variant: "outline",
            className: "bg-yellow-50 text-yellow-700 border-yellow-200",
          },
          refunded: {
            label: "Estornado",
            variant: "outline",
            className: "bg-blue-50 text-blue-700 border-blue-200",
          },
          failed: {
            label: "Falhou",
            variant: "outline",
            className: "bg-red-50 text-red-700 border-red-200",
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
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-right"
          >
            Valor
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("amount"))
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(amount)

        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Data
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
    },
    {
      accessorKey: "paymentMethod",
      header: "Método",
      cell: ({ row }) => <div>{row.getValue("paymentMethod")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Copiar ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => viewPaymentDetails(payment.id)} className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Ver detalhes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => viewInvoice(payment.invoiceId)} className="flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                Ver cobrança
              </DropdownMenuItem>
              {payment.status === "confirmed" && (
                <DropdownMenuItem className="text-red-600">Solicitar estorno</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Filtrar pagamentos..."
            value={(table.getColumn("customer")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("customer")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Filtros <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrar por status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("confirmed")}>
                Confirmado
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("pending")}>
                Pendente
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("refunded")}>
                Estornado
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("failed")}>
                Falhou
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("")}>
                Limpar filtro
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id === "id"
                      ? "ID"
                      : column.id === "customer"
                        ? "Cliente"
                        : column.id === "status"
                          ? "Status"
                          : column.id === "amount"
                            ? "Valor"
                            : column.id === "date"
                              ? "Data"
                              : column.id === "paymentMethod"
                                ? "Método"
                                : column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} linha(s)
          selecionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
