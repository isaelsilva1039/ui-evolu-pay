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

type Subscription = {
  id: string
  customer: string
  status: "active" | "inactive" | "canceled" | "trial"
  plan: string
  value: number
  nextBilling: string
  frequency: string
  startDate: string
}

const data: Subscription[] = [
  {
    id: "SUB-001",
    customer: "João Silva",
    status: "active",
    plan: "Plano Básico",
    value: 99.9,
    nextBilling: "15/05/2023",
    frequency: "Mensal",
    startDate: "15/01/2023",
  },
  {
    id: "SUB-002",
    customer: "Maria Oliveira",
    status: "active",
    plan: "Plano Premium",
    value: 199.9,
    nextBilling: "22/05/2023",
    frequency: "Mensal",
    startDate: "22/01/2023",
  },
  {
    id: "SUB-003",
    customer: "Carlos Santos",
    status: "active",
    plan: "Plano Empresarial",
    value: 499.9,
    nextBilling: "05/05/2023",
    frequency: "Mensal",
    startDate: "05/02/2023",
  },
  {
    id: "SUB-004",
    customer: "Ana Pereira",
    status: "inactive",
    plan: "Plano Básico",
    value: 99.9,
    nextBilling: "18/05/2023",
    frequency: "Mensal",
    startDate: "18/02/2023",
  },
  {
    id: "SUB-005",
    customer: "Roberto Almeida",
    status: "active",
    plan: "Plano Premium",
    value: 199.9,
    nextBilling: "10/05/2023",
    frequency: "Mensal",
    startDate: "10/03/2023",
  },
  {
    id: "SUB-006",
    customer: "Empresa ABC Ltda.",
    status: "active",
    plan: "Plano Empresarial",
    value: 499.9,
    nextBilling: "22/05/2023",
    frequency: "Mensal",
    startDate: "22/03/2023",
  },
  {
    id: "SUB-007",
    customer: "Consultoria XYZ",
    status: "trial",
    plan: "Plano Empresarial",
    value: 499.9,
    nextBilling: "05/05/2023",
    frequency: "Mensal",
    startDate: "05/04/2023",
  },
  {
    id: "SUB-008",
    customer: "Distribuidora 123",
    status: "canceled",
    plan: "Plano Premium",
    value: 199.9,
    nextBilling: "-",
    frequency: "Mensal",
    startDate: "18/04/2023",
  },
  {
    id: "SUB-009",
    customer: "Comércio Rápido",
    status: "active",
    plan: "Plano Básico",
    value: 99.9,
    nextBilling: "02/05/2023",
    frequency: "Mensal",
    startDate: "02/04/2023",
  },
  {
    id: "SUB-010",
    customer: "Indústria Nacional",
    status: "active",
    plan: "Plano Empresarial",
    value: 4999.9,
    nextBilling: "15/05/2023",
    frequency: "Anual",
    startDate: "15/04/2023",
  },
]

export function SubscriptionsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<Subscription>[] = [
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
      header: "Assinatura",
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
          active: {
            label: "Ativa",
            variant: "outline",
            className: "bg-green-50 text-green-700 border-green-200",
          },
          inactive: {
            label: "Inativa",
            variant: "outline",
            className: "bg-yellow-50 text-yellow-700 border-yellow-200",
          },
          canceled: {
            label: "Cancelada",
            variant: "outline",
            className: "bg-red-50 text-red-700 border-red-200",
          },
          trial: {
            label: "Período de Teste",
            variant: "outline",
            className: "bg-blue-50 text-blue-700 border-blue-200",
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
      accessorKey: "plan",
      header: "Plano",
      cell: ({ row }) => <div>{row.getValue("plan")}</div>,
    },
    {
      accessorKey: "value",
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
        const amount = Number.parseFloat(row.getValue("value"))
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(amount)

        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "frequency",
      header: "Frequência",
      cell: ({ row }) => <div>{row.getValue("frequency")}</div>,
    },
    {
      accessorKey: "nextBilling",
      header: "Próxima Cobrança",
      cell: ({ row }) => <div>{row.getValue("nextBilling")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const subscription = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(subscription.id)}>
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
              <DropdownMenuItem>Editar assinatura</DropdownMenuItem>
              <DropdownMenuItem>Alterar plano</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Cancelar assinatura</DropdownMenuItem>
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
            placeholder="Filtrar assinaturas..."
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
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("active")}>
                Ativa
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("inactive")}>
                Inativa
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("canceled")}>
                Cancelada
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("trial")}>
                Período de Teste
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
                      ? "Assinatura"
                      : column.id === "customer"
                        ? "Cliente"
                        : column.id === "status"
                          ? "Status"
                          : column.id === "plan"
                            ? "Plano"
                            : column.id === "value"
                              ? "Valor"
                              : column.id === "frequency"
                                ? "Frequência"
                                : column.id === "nextBilling"
                                  ? "Próxima Cobrança"
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
