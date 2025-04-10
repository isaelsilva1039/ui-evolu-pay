"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Save, TestTube, RefreshCw, LinkIcon, CheckCircle2, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

const integrationFormSchema = z.object({
  apiKey: z.string().min(1, "A chave de API é obrigatória"),
  apiSecret: z.string().min(1, "O segredo da API é obrigatório"),
  baseUrl: z.string().url("URL inválida"),
  enabled: z.boolean(),
  autoCreateProjects: z.boolean(),
  autoBlockProjects: z.boolean(),
  defaultProjectTemplate: z.string().optional(),
  webhookUrl: z.string().url("URL inválida").optional(),
})

type IntegrationFormValues = z.infer<typeof integrationFormSchema>

export default function EvoluttoIntegrationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "unknown">("unknown")
  const { toast } = useToast()

  const form = useForm<IntegrationFormValues>({
    resolver: zodResolver(integrationFormSchema),
    defaultValues: {
      apiKey: "",
      apiSecret: "",
      baseUrl: "https://api.evolutto.com/v1",
      enabled: false,
      autoCreateProjects: true,
      autoBlockProjects: true,
      defaultProjectTemplate: "",
      webhookUrl: "",
    },
  })

  async function onSubmit(data: IntegrationFormValues) {
    setIsLoading(true)
    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Configurações salvas",
        description: "As configurações de integração com a Evolutto foram salvas com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao salvar configurações",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao salvar as configurações",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function testConnection() {
    setIsTestingConnection(true)
    try {
      // Simulação de teste de conexão
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulando uma conexão bem-sucedida
      setConnectionStatus("connected")

      toast({
        title: "Conexão bem-sucedida",
        description: "A conexão com a API da Evolutto foi estabelecida com sucesso.",
      })
    } catch (error) {
      setConnectionStatus("disconnected")
      toast({
        title: "Erro de conexão",
        description: error instanceof Error ? error.message : "Não foi possível conectar à API da Evolutto",
        variant: "destructive",
      })
    } finally {
      setIsTestingConnection(false)
    }
  }

  const projectTemplates = [
    { id: "template1", name: "Template Básico" },
    { id: "template2", name: "Template Avançado" },
    { id: "template3", name: "Template Empresarial" },
    { id: "template4", name: "Template Educacional" },
  ]

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Integração com Evolutto"
        description="Configure a integração com a plataforma Evolutto para gerenciamento de projetos."
      />

      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium">Status da Integração:</h2>
            {connectionStatus === "connected" ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Conectado
              </Badge>
            ) : connectionStatus === "disconnected" ? (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                <XCircle className="mr-1 h-3 w-3" />
                Desconectado
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                Não verificado
              </Badge>
            )}
          </div>
          <Button variant="outline" onClick={testConnection} disabled={isTestingConnection}>
            {isTestingConnection ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testando...
              </>
            ) : (
              <>
                <TestTube className="mr-2 h-4 w-4" />
                Testar Conexão
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="settings" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da API</CardTitle>
                <CardDescription>Configure as credenciais de acesso à API da Evolutto.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="apiKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chave de API</FormLabel>
                            <FormControl>
                              <Input placeholder="Chave de API da Evolutto" {...field} />
                            </FormControl>
                            <FormDescription>
                              Você pode encontrar sua chave de API no painel da Evolutto.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="apiSecret"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Segredo da API</FormLabel>
                            <FormControl>
                              <Input placeholder="Segredo da API da Evolutto" type="password" {...field} />
                            </FormControl>
                            <FormDescription>Mantenha este segredo em segurança e não o compartilhe.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="baseUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL Base da API</FormLabel>
                          <FormControl>
                            <Input placeholder="https://api.evolutto.com/v1" {...field} />
                          </FormControl>
                          <FormDescription>URL base para todas as chamadas à API da Evolutto.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="webhookUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL do Webhook (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://seu-dominio.com/api/webhooks/evolutto" {...field} />
                          </FormControl>
                          <FormDescription>
                            URL para receber notificações da Evolutto sobre eventos de projetos.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator className="my-4" />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Comportamento da Integração</h3>

                      <FormField
                        control={form.control}
                        name="enabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Ativar Integração</FormLabel>
                              <FormDescription>Ative ou desative a integração com a Evolutto.</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="autoCreateProjects"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Criar Projetos Automaticamente</FormLabel>
                              <FormDescription>
                                Cria automaticamente um projeto na Evolutto após o pagamento.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="autoBlockProjects"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Bloquear Projetos Automaticamente</FormLabel>
                              <FormDescription>
                                Bloqueia automaticamente o acesso ao projeto quando o pagamento não for realizado.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="defaultProjectTemplate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Template Padrão de Projeto</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione um template" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {projectTemplates.map((template) => (
                                  <SelectItem key={template.id} value={template.id}>
                                    {template.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>Template padrão a ser usado ao criar novos projetos.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Configurações
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="projects" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Projetos Integrados</CardTitle>
                <CardDescription>Gerencie os projetos integrados com a Evolutto.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Projetos Recentes</h3>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Atualizar
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 border rounded-md">
                        <div className="space-y-1">
                          <div className="font-medium">Projeto #{i}</div>
                          <div className="text-sm text-muted-foreground">Cliente: Cliente {i}</div>
                          <div className="text-xs text-muted-foreground">Criado em: 10/0{i}/2023</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              i % 3 === 0
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : i % 2 === 0
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                            }
                          >
                            {i % 3 === 0 ? "Pendente" : i % 2 === 0 ? "Ativo" : "Em Progresso"}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <LinkIcon className="h-4 w-4" />
                            <span className="sr-only">Ver projeto</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Anterior</Button>
                <Button variant="outline">Próximo</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="logs" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Logs de Integração</CardTitle>
                <CardDescription>Visualize os logs de eventos da integração com a Evolutto.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Eventos Recentes</h3>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Atualizar
                    </Button>
                  </div>

                  <Textarea
                    className="font-mono text-xs h-80"
                    readOnly
                    value={`[2023-04-10 14:30:22] INFO: Iniciando sincronização com Evolutto
[2023-04-10 14:30:23] INFO: Autenticação bem-sucedida
[2023-04-10 14:30:24] INFO: Buscando projetos...
[2023-04-10 14:30:25] INFO: 15 projetos encontrados
[2023-04-10 14:30:26] INFO: Sincronizando status de pagamentos
[2023-04-10 14:30:27] WARN: Pagamento pendente para o projeto #123
[2023-04-10 14:30:28] INFO: Enviando notificação para cliente
[2023-04-10 14:30:29] INFO: Criando novo projeto para cliente ID #456
[2023-04-10 14:30:30] SUCCESS: Projeto #789 criado com sucesso
[2023-04-10 14:30:31] INFO: Sincronização concluída`}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Baixar Logs Completos
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
