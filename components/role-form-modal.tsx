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
import { toast } from "@/components/ui/use-toast"
import { getAllPermissionsGrouped, type Permission, type Role } from "@/lib/permissions"
import { Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const roleFormSchema = z.object({
  id: z
    .string()
    .min(2, "O ID deve ter pelo menos 2 caracteres")
    .regex(/^[a-z0-9_-]+$/, {
      message: "O ID deve conter apenas letras minúsculas, números, hífens e underscores",
    }),
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  description: z.string().min(5, "A descrição deve ter pelo menos 5 caracteres"),
  permissions: z.array(z.string()),
})

type RoleFormValues = z.infer<typeof roleFormSchema>

interface RoleFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  role: Role | null
  onRoleCreated?: (role: Role) => void
  onRoleUpdated?: (role: Role) => void
}

export function RoleFormModal({ open, onOpenChange, role, onRoleCreated, onRoleUpdated }: RoleFormModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const permissionsGrouped = getAllPermissionsGrouped()

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: role
      ? {
          id: role.id,
          name: role.name,
          description: role.description,
          permissions: role.permissions,
        }
      : {
          id: "",
          name: "",
          description: "",
          permissions: [],
        },
  })

  async function onSubmit(data: RoleFormValues) {
    setIsLoading(true)
    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newRole: Role = {
        id: data.id,
        name: data.name,
        description: data.description,
        permissions: data.permissions as Permission[],
      }

      if (role) {
        // Atualizar função existente
        onRoleUpdated?.(newRole)
        toast({
          title: "Função atualizada",
          description: `A função ${data.name} foi atualizada com sucesso.`,
        })
      } else {
        // Criar nova função
        onRoleCreated?.(newRole)
        toast({
          title: "Função criada",
          description: `A função ${data.name} foi criada com sucesso.`,
        })
      }

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao processar sua solicitação",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{role ? "Editar Função" : "Nova Função"}</DialogTitle>
          <DialogDescription>
            {role
              ? "Edite as informações e permissões da função existente."
              : "Preencha as informações para criar uma nova função."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Função</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da função" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID da Função</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ID da função (ex: admin, manager)"
                        {...field}
                        disabled={!!role} // Desabilitar edição do ID para funções existentes
                      />
                    </FormControl>
                    <FormDescription>Identificador único usado internamente pelo sistema.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descreva o propósito desta função" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Permissões</FormLabel>
              <Accordion type="multiple" className="w-full">
                {Object.entries(permissionsGrouped).map(([group, permissions]) => (
                  <AccordionItem key={group} value={group}>
                    <AccordionTrigger>{group}</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                        {permissions.map((permission) => (
                          <FormField
                            key={permission}
                            control={form.control}
                            name="permissions"
                            render={({ field }) => {
                              const permissionLabel = permission.split(":")
                              return (
                                <FormItem
                                  key={permission}
                                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(permission)}
                                      onCheckedChange={(checked) => {
                                        const updatedPermissions = checked
                                          ? [...field.value, permission]
                                          : field.value?.filter((value) => value !== permission)
                                        field.onChange(updatedPermissions)
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>
                                      {permissionLabel[1].charAt(0).toUpperCase() + permissionLabel[1].slice(1)}
                                    </FormLabel>
                                    <FormDescription>
                                      {permissionLabel[0]}: {permissionLabel[1]}
                                    </FormDescription>
                                  </div>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {role ? "Atualizando..." : "Criando..."}
                  </>
                ) : role ? (
                  "Atualizar Função"
                ) : (
                  "Criar Função"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
