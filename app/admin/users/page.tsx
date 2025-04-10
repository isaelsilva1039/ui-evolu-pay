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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search, UserPlus } from "lucide-react"
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
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { useToast } from "@/components/ui/use-toast"
import { getRoleById } from "@/lib/permissions"
import { UserFormModal } from "@/components/user-form-modal"

type User = {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  createdAt: string
  lastLogin: string | null
}

const data: User[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    role: "admin",
    status: "active",
    createdAt: "2023-01-15",
    lastLogin: "2023-04-10",
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria@email.com",
    role: "manager",
    status: "active",
    createdAt: "2023-01-22",
    lastLogin: "2023-04-09",
  },
  {
    id: 3,
    name: "Carlos Santos",
    email: "carlos@email.com",
    role: "accountant",
    status: "active",
    createdAt: "2023-02-05",
    lastLogin: "2023-04-08",
  },
  {
    id: 4,
    name: "Ana Pereira",
    email: "ana@email.com",
    role: "operator",
    status: "inactive",
    createdAt: "2023-02-18",
    lastLogin: "2023-03-25",
  },
  {
    id: 5,
    name: "Roberto Almeida",
    email: "roberto@email.com",
    role: "viewer",
    status: "active",
    createdAt: "2023-03-10",
    lastLogin: "2023-04-07",
  },
  {
    id: 6,
    name: "Fernanda Lima",
    email: "fernanda@email.com",
    role: "financial",
    status: "active",
    createdAt: "2023-03-15",
    lastLogin: "2023-04-06",
  },
  {
    id: 7,
    name: "Ricardo Souza",
    email: "ricardo@email.com",
    role: "operator",
    status: "pending",
    createdAt: "2023-03-20",
    lastLogin: null,
  },
]

export default function UsersPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const { toast } = useToast()

  const columns: ColumnDef<User>[] = [
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
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const name = row.getValue("name") as string
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
      accessorKey: "role",
      header: "Função",
      cell: ({ row }) => {
        const roleId = row.getValue("role") as string
        const role = getRoleById(roleId)

        return <div>{role?.name || roleId}</div>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string

        const statusMap: Record<string, { label: string; variant: "outline" | "default"; className: string }> = {
          active: {
            label: "Ativo",
            variant: "outline",
            className: "bg-green-50 text-green-700 border-green-200",
          },
          inactive: {
            label: "Inativo",
            variant: "outline",
            className: "bg-gray-50 text-gray-700 border-gray-200",
          },
          pending: {
            label: "Pendente",
            variant: "outline",
            className: "bg-yellow-50 text-yellow-700 border-yellow-200",
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
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Data de Criação
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
    },
    {
      accessorKey: "lastLogin",
      header: "Último Login",
      cell: ({ row }) => <div>{row.getValue("lastLogin") || "Nunca"}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.email)}>
                Copiar email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setEditingUser(user)
                  setIsModalOpen(true)
                }}
              >
                Editar usuário
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: "Redefinição de senha enviada",
                    description: `Um email de redefinição de senha foi enviado para ${user.email}.`,
                  })
                }}
              >
                Redefinir senha
              </DropdownMenuItem>
              {user.status === "active" ? (
                <DropdownMenuItem
                  onClick={() => {
                    toast({
                      title: "Usuário desativado",
                      description: `O usuário ${user.name} foi desativado.`,
                    })
                  }}
                  className="text-red-600"
                >
                  Desativar usuário
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => {
                    toast({
                      title: "Usuário ativado",
                      description: `O usuário ${user.name} foi ativado.`,
                    })
                  }}
                  className="text-green-600"
                >
                  Ativar usuário
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
    <DashboardShell>
      <DashboardHeader heading="Usuários" description="Gerencie os usuários do sistema e suas permissões.">
        <Button
          onClick={() => {
            setEditingUser(null)
            setIsModalOpen(true)
          }}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </DashboardHeader>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuários..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                className="pl-8 max-w-sm"
              />
            </div>
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
                  Ativo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("inactive")}>
                  Inativo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("pending")}>
                  Pendente
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
                      {column.id === "name"
                        ? "Nome"
                        : column.id === "role"
                          ? "Função"
                          : column.id === "status"
                            ? "Status"
                            : column.id === "createdAt"
                              ? "Data de Criação"
                              : column.id === "lastLogin"
                                ? "Último Login"
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

      <UserFormModal open={isModalOpen} onOpenChange={setIsModalOpen} user={editingUser} />
    </DashboardShell>
  )
}
