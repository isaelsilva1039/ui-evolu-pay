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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
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
import { InvoiceDetailsModal } from "@/components/invoice-details-modal"
import { toast } from "@/components/ui/use-toast"

type Invoice = {
  id: string
  customer: string
  status: "pending" | "processing" | "success" | "failed"
  email: string
  amount: number
  dueDate: string
  paymentMethod: string
}

const data: Invoice[] = [
  {
    id: "INV-001",
    customer: "João Silva",
    status: "success",
    email: "joao@email.com",
    amount: 1250.0,
    dueDate: "20/04/2023",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: "INV-002",
    customer: "Maria Oliveira",
    status: "success",
    email: "maria@email.com",
    amount: 850.0,
    dueDate: "22/04/2023",
    paymentMethod: "PIX",
  },
  {
    id: "INV-003",
    customer: "Carlos Santos",
    status: "success",
    email: "carlos@email.com",
    amount: 2100.0,
    dueDate: "25/04/2023",
    paymentMethod: "Boleto",
  },
  {
    id: "INV-004",
    customer: "Ana Pereira",
    status: "success",
    email: "ana@email.com",
    amount: 750.0,
    dueDate: "28/04/2023",
    paymentMethod: "PIX",
  },
  {
    id: "INV-005",
    customer: "Roberto Almeida",
    status: "success",
    email: "roberto@email.com",
    amount: 1500.0,
    dueDate: "30/04/2023",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: "INV-006",
    customer: "Empresa ABC Ltda.",
    status: "pending",
    email: "financeiro@abc.com",
    amount: 3500.0,
    dueDate: "02/05/2023",
    paymentMethod: "Boleto",
  },
  {
    id: "INV-007",
    customer: "Consultoria XYZ",
    status: "pending",
    email: "pagamentos@xyz.com",
    amount: 1800.0,
    dueDate: "05/05/2023",
    paymentMethod: "Boleto",
  },
  {
    id: "INV-008",
    customer: "Distribuidora 123",
    status: "pending",
    email: "financeiro@123.com",
    amount: 2750.0,
    dueDate: "08/05/2023",
    paymentMethod: "Boleto",
  },
  {
    id: "INV-009",
    customer: "Comércio Rápido",
    status: "pending",
    email: "contato@rapido.com",
    amount: 950.0,
    dueDate: "10/05/2023",
    paymentMethod: "PIX",
  },
  {
    id: "INV-010",
    customer: "Indústria Nacional",
    status: "pending",
    email: "financeiro@nacional.com",
    amount: 4200.0,
    dueDate: "12/05/2023",
    paymentMethod: "Boleto",
  },
  {
    id: "INV-011",
    customer: "Fernanda Lima",
    status: "processing",
    email: "fernanda@email.com",
    amount: 1100.0,
    dueDate: "15/05/2023",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: "INV-012",
    customer: "Ricardo Souza",
    status: "failed",
    email: "ricardo@email.com",
    amount: 750.0,
    dueDate: "18/05/2023",
    paymentMethod: "Cartão de Crédito",
  },
]

export function InvoicesTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("")

  const openDetailsModal = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId)
    setDetailsModalOpen(true)
  }

  const sendReminder = (invoiceId: string) => {
    toast({
      title: "Lembrete enviado",
      description: `Um lembrete foi enviado para a cobrança ${invoiceId}.`,
    })
  }

  const cancelInvoice = (invoiceId: string) => {
    toast({
      title: "Cobrança cancelada",
      description: `A cobrança ${invoiceId} foi cancelada com sucesso.`,
      variant: "destructive",
    })
  }

  const columns: ColumnDef<Invoice>[] = [
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
      header: "Cobrança",
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
      cell: ({ row }) => <div>{row.getValue("customer")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string

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
      accessorKey: "dueDate",
      header: "Vencimento",
      cell: ({ row }) => <div>{row.getValue("dueDate")}</div>,
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
        const invoice = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(invoice.id)}>Copiar ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => openDetailsModal(invoice.id)}>Ver detalhes</DropdownMenuItem>
              <DropdownMenuItem>Editar cobrança</DropdownMenuItem>
              {invoice.status === "pending" && (
                <DropdownMenuItem onClick={() => sendReminder(invoice.id)}>Enviar lembrete</DropdownMenuItem>
              )}
              {invoice.status === "pending" && (
                <DropdownMenuItem onClick={() => cancelInvoice(invoice.id)} className="text-red-600">
                  Cancelar cobrança
                </DropdownMenuItem>
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
            placeholder="Filtrar cobranças..."
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
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("pending")}>
                Pendente
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("processing")}>
                Processando
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("success")}>
                Pago
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
                      ? "Cobrança"
                      : column.id === "customer"
                        ? "Cliente"
                        : column.id === "status"
                          ? "Status"
                          : column.id === "amount"
                            ? "Valor"
                            : column.id === "dueDate"
                              ? "Vencimento"
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

      {/* Modal de detalhes da cobrança */}
      <InvoiceDetailsModal open={detailsModalOpen} onOpenChange={setDetailsModalOpen} invoiceId={selectedInvoiceId} />
    </div>
  )
}
