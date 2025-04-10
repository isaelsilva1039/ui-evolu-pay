"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash, Check, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { getAllRoles, getAllPermissionsGrouped, type Role } from "@/lib/permissions"
import { RoleFormModal } from "@/components/role-form-modal"
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
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(getAllRoles())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [selectedRole, setSelectedRole] = useState<Role | null>(roles[0] || null)
  const { toast } = useToast()
  const permissionsGrouped = getAllPermissionsGrouped()

  const handleEdit = (role: Role) => {
    setEditingRole(role)
    setIsModalOpen(true)
  }

  const handleDelete = (roleId: string) => {
    // Em um ambiente real, você faria uma chamada à API
    setRoles(roles.filter((role) => role.id !== roleId))

    if (selectedRole && selectedRole.id === roleId) {
      setSelectedRole(roles[0] || null)
    }

    toast({
      title: "Função removida",
      description: "A função foi removida com sucesso.",
      variant: "destructive",
    })
  }

  const handleRoleCreated = (newRole: Role) => {
    setRoles([...roles, newRole])
    setSelectedRole(newRole)
  }

  const handleRoleUpdated = (updatedRole: Role) => {
    setRoles(roles.map((role) => (role.id === updatedRole.id ? updatedRole : role)))
    if (selectedRole && selectedRole.id === updatedRole.id) {
      setSelectedRole(updatedRole)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Funções e Permissões"
        description="Gerencie as funções de usuários e suas permissões no sistema."
      >
        <Button
          onClick={() => {
            setEditingRole(null)
            setIsModalOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Função
        </Button>
      </DashboardHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Funções</CardTitle>
              <CardDescription>Funções disponíveis no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                      selectedRole?.id === role.id ? "bg-primary/10" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedRole(role)}
                  >
                    <div>
                      <p className="font-medium">{role.name}</p>
                      <p className="text-xs text-muted-foreground">{role.description}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEdit(role)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {role.id !== "admin" && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                              }}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Isso excluirá permanentemente a função {role.name} e
                                removerá esta função de todos os usuários que a possuem.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(role.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedRole ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedRole.name}</CardTitle>
                    <CardDescription>{selectedRole.description}</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => handleEdit(selectedRole)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar Permissões
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="grouped">
                  <TabsList className="mb-4">
                    <TabsTrigger value="grouped">Agrupadas</TabsTrigger>
                    <TabsTrigger value="list">Lista</TabsTrigger>
                  </TabsList>
                  <TabsContent value="grouped">
                    <div className="space-y-6">
                      {Object.entries(permissionsGrouped).map(([group, permissions]) => (
                        <div key={group}>
                          <h3 className="text-sm font-medium mb-2">{group}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {permissions.map((permission) => {
                              const hasPermission = selectedRole.permissions.includes(permission)
                              return (
                                <div
                                  key={permission}
                                  className={`flex items-center justify-between p-2 rounded-md border ${
                                    hasPermission ? "border-green-200 bg-green-50" : "border-gray-200"
                                  }`}
                                >
                                  <span className="text-sm">
                                    {permission.split(":")[1].charAt(0).toUpperCase() +
                                      permission.split(":")[1].slice(1)}
                                  </span>
                                  {hasPermission ? (
                                    <Check className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <X className="h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="list">
                    <div className="space-y-2">
                      {selectedRole.permissions.length > 0 ? (
                        selectedRole.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="mr-2 mb-2">
                            {permission}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-muted-foreground">Nenhuma permissão atribuída a esta função.</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <p className="text-sm text-muted-foreground">
                  Total de {selectedRole.permissions.length} permissões atribuídas a esta função.
                </p>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Selecione uma função para ver suas permissões.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <RoleFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        role={editingRole}
        onRoleCreated={handleRoleCreated}
        onRoleUpdated={handleRoleUpdated}
      />
    </DashboardShell>
  )
}
