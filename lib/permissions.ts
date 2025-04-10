// Definição dos tipos de permissões disponíveis no sistema
export type Permission =
  | "dashboard:view"
  | "invoices:view"
  | "invoices:create"
  | "invoices:edit"
  | "invoices:delete"
  | "payments:view"
  | "transfers:view"
  | "transfers:create"
  | "transfers:edit"
  | "transfers:delete"
  | "balance:view"
  | "anticipation:request"
  | "customers:view"
  | "customers:create"
  | "customers:edit"
  | "customers:delete"
  | "subscriptions:view"
  | "subscriptions:create"
  | "subscriptions:edit"
  | "subscriptions:delete"
  | "reports:view"
  | "reports:export"
  | "settings:view"
  | "settings:edit"
  | "users:view"
  | "users:create"
  | "users:edit"
  | "users:delete"
  | "roles:view"
  | "roles:create"
  | "roles:edit"
  | "roles:delete"
  | "integrations:view"
  | "integrations:configure"

// Definição dos grupos de permissões (roles)
export type Role = {
  id: string
  name: string
  description: string
  permissions: Permission[]
}

// Roles pré-definidas
export const roles: Role[] = [
  {
    id: "admin",
    name: "Administrador",
    description: "Acesso completo ao sistema",
    permissions: [
      "dashboard:view",
      "invoices:view",
      "invoices:create",
      "invoices:edit",
      "invoices:delete",
      "payments:view",
      "transfers:view",
      "transfers:create",
      "transfers:edit",
      "transfers:delete",
      "balance:view",
      "anticipation:request",
      "customers:view",
      "customers:create",
      "customers:edit",
      "customers:delete",
      "subscriptions:view",
      "subscriptions:create",
      "subscriptions:edit",
      "subscriptions:delete",
      "reports:view",
      "reports:export",
      "settings:view",
      "settings:edit",
      "users:view",
      "users:create",
      "users:edit",
      "users:delete",
      "roles:view",
      "roles:create",
      "roles:edit",
      "roles:delete",
      "integrations:view",
      "integrations:configure",
    ],
  },
  {
    id: "manager",
    name: "Gerente",
    description: "Acesso à maioria das funcionalidades, exceto configurações avançadas",
    permissions: [
      "dashboard:view",
      "invoices:view",
      "invoices:create",
      "invoices:edit",
      "payments:view",
      "transfers:view",
      "transfers:create",
      "balance:view",
      "anticipation:request",
      "customers:view",
      "customers:create",
      "customers:edit",
      "subscriptions:view",
      "subscriptions:create",
      "subscriptions:edit",
      "reports:view",
      "reports:export",
      "settings:view",
      "users:view",
      "integrations:view",
    ],
  },
  {
    id: "accountant",
    name: "Contador",
    description: "Acesso a relatórios financeiros e visualização de transações",
    permissions: [
      "dashboard:view",
      "invoices:view",
      "payments:view",
      "transfers:view",
      "balance:view",
      "customers:view",
      "subscriptions:view",
      "reports:view",
      "reports:export",
    ],
  },
  {
    id: "operator",
    name: "Operador",
    description: "Acesso básico para operações do dia a dia",
    permissions: [
      "dashboard:view",
      "invoices:view",
      "invoices:create",
      "payments:view",
      "transfers:view",
      "customers:view",
      "subscriptions:view",
    ],
  },
  {
    id: "viewer",
    name: "Visualizador",
    description: "Acesso somente para visualização",
    permissions: ["dashboard:view", "invoices:view", "payments:view", "customers:view", "subscriptions:view"],
  },
  {
    id: "financial",
    name: "Financeiro",
    description: "Acesso a funcionalidades financeiras",
    permissions: [
      "dashboard:view",
      "invoices:view",
      "invoices:create",
      "invoices:edit",
      "payments:view",
      "transfers:view",
      "transfers:create",
      "balance:view",
      "anticipation:request",
      "reports:view",
      "reports:export",
    ],
  },
]

// Função para verificar se um usuário tem uma determinada permissão
export function hasPermission(userPermissions: Permission[], permission: Permission): boolean {
  return userPermissions.includes(permission)
}

// Função para obter todas as permissões de uma role
export function getRolePermissions(roleId: string): Permission[] {
  const role = roles.find((r) => r.id === roleId)
  return role ? role.permissions : []
}

// Função para obter uma role pelo ID
export function getRoleById(roleId: string): Role | undefined {
  return roles.find((r) => r.id === roleId)
}

// Função para obter todas as roles disponíveis
export function getAllRoles(): Role[] {
  return roles
}

// Função para obter todas as permissões disponíveis agrupadas por categoria
export function getAllPermissionsGrouped(): Record<string, Permission[]> {
  return {
    Dashboard: ["dashboard:view"],
    Cobranças: ["invoices:view", "invoices:create", "invoices:edit", "invoices:delete"],
    Pagamentos: ["payments:view"],
    Transferências: ["transfers:view", "transfers:create", "transfers:edit", "transfers:delete"],
    Saldo: ["balance:view", "anticipation:request"],
    Clientes: ["customers:view", "customers:create", "customers:edit", "customers:delete"],
    Assinaturas: ["subscriptions:view", "subscriptions:create", "subscriptions:edit", "subscriptions:delete"],
    Relatórios: ["reports:view", "reports:export"],
    Configurações: ["settings:view", "settings:edit"],
    Usuários: ["users:view", "users:create", "users:edit", "users:delete"],
    Permissões: ["roles:view", "roles:create", "roles:edit", "roles:delete"],
    Integrações: ["integrations:view", "integrations:configure"],
  }
}
