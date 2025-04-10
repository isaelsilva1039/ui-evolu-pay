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
import { toast } from "@/components/ui/use-toast"

type Transfer = {
  id: string
  value: number
  date: string
  scheduledDate: string
  status: "pending" | "processing" | "completed" | "failed" | "canceled"
  bankAccount: string
  description?: string
}

const data: Transfer[] = [
  {
    id: "TRF-001",
    value: 1500.0,
    date: "15/04/2023",
    scheduledDate: "15/04/2023",
    status: "completed",
    bankAccount: "Nubank - João Silva - 0001 / 12345-6",
    description: "Transferência mensal",
  },
  {
    id: "TRF-002",
    value: 2500.0,
    date: "30/04/2023",
    scheduledDate: "30/04/2023",
    status: "completed",
    bankAccount: "Itaú - João Silva - 1234 / 56789-0",
  },
  {
    id: "TRF-003",
    value: 3000.0,
    date: "15/05/2023",
    scheduledDate: "15/05/2023",
    status: "pending",
    bankAccount: "Nubank - João Silva - 0001 / 12345-6",
    description: "Transferência mensal",
  },
  {
    id: "TRF-004",
    value: 1200.0,
    date: "10/05/2023",
    scheduledDate: "10/05/2023",
    status: "processing",
    bankAccount: "Bradesco - Empresa ABC - 0123 / 45678-9",
  },
  {
    id: "TRF-005",
    value: 800.0,
    date: "05/05/2023",
    scheduledDate: "05/05/2023",
    status: "failed",
    bankAccount: "Itaú - João Silva - 1234 / 56789-0",
    description: "Falha na transferência - saldo insuficiente",
  },
  {
    id: "TRF-006",
    value: 1800.0,
    date: "01/05/2023",
    scheduledDate: "02/05/2023",
    status: "canceled",
    bankAccount: "Nubank - João Silva - 0001 / 12345-6",
    description: "Cancelado pelo usuário",
  },
]

export function TransfersTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const cancelTransfer = (transferId: string) => {
    toast({
      title: "Transferência cancelada",
      description: `A transferência ${transferId} foi cancelada com sucesso.`,
      variant: "destructive",
    })
  }

  const columns: ColumnDef<Transfer>[] = [
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
      accessorKey: "scheduledDate",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Data Agendada
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("scheduledDate")}</div>,
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
          completed: {
            label: "Concluída",
            variant: "outline",
            className: "bg-green-50 text-green-700 border-green-200",
          },
          failed: {
            label: "Falhou",
            variant: "outline",
            className: "bg-red-50 text-red-700 border-red-200",
          },
          canceled: {
            label: "Cancelada",
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
      },
    },
    {
      accessorKey: "bankAccount",
      header: "Conta Bancária",
      cell: ({ row }) => <div className="truncate max-w-[200px]">{row.getValue("bankAccount")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const transfer = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(transfer.id)}>Copiar ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
              {(transfer.status === "pending" || transfer.status === "processing") && (
                <DropdownMenuItem onClick={() => cancelTransfer(transfer.id)} className="text-red-600">
                  Cancelar transferência
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
            placeholder="Filtrar transferências..."
            value={(table.getColumn("bankAccount")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("bankAccount")?.setFilterValue(event.target.value)}
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
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("completed")}>
                Concluída
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("failed")}>
                Falhou
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("canceled")}>
                Cancelada
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
                      : column.id === "value"
                        ? "Valor"
                        : column.id === "scheduledDate"
                          ? "Data Agendada"
                          : column.id === "status"
                            ? "Status"
                            : column.id === "bankAccount"
                              ? "Conta Bancária"
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
