import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Configurações" description="Gerencie as configurações da sua conta e preferências." />
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="payment">Pagamentos</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
              <CardDescription>Atualize as informações da sua empresa.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nome da Empresa</Label>
                <Input id="company-name" defaultValue="Minha Empresa Ltda." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-email">Email</Label>
                <Input id="company-email" type="email" defaultValue="contato@minhaempresa.com.br" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-phone">Telefone</Label>
                <Input id="company-phone" defaultValue="(11) 98765-4321" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-cnpj">CNPJ</Label>
                <Input id="company-cnpj" defaultValue="12.345.678/0001-90" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">Endereço</Label>
                <Input id="company-address" defaultValue="Av. Paulista, 1000 - São Paulo, SP" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pagamento</CardTitle>
              <CardDescription>Configure os métodos de pagamento aceitos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="boleto" className="flex flex-col space-y-1">
                  <span>Boleto Bancário</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Aceitar pagamentos via boleto bancário
                  </span>
                </Label>
                <Switch id="boleto" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="credit-card" className="flex flex-col space-y-1">
                  <span>Cartão de Crédito</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Aceitar pagamentos via cartão de crédito
                  </span>
                </Label>
                <Switch id="credit-card" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="pix" className="flex flex-col space-y-1">
                  <span>PIX</span>
                  <span className="font-normal text-xs text-muted-foreground">Aceitar pagamentos via PIX</span>
                </Label>
                <Switch id="pix" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="bank-transfer" className="flex flex-col space-y-1">
                  <span>Transferência Bancária</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Aceitar pagamentos via transferência bancária
                  </span>
                </Label>
                <Switch id="bank-transfer" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Cobrança</CardTitle>
              <CardDescription>Configure as opções padrão para suas cobranças.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-due-days">Dias para Vencimento (Padrão)</Label>
                <Input id="default-due-days" type="number" defaultValue="5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-fine">Multa por Atraso (%)</Label>
                <Input id="default-fine" type="number" defaultValue="2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-interest">Juros por Dia (%)</Label>
                <Input id="default-interest" type="number" defaultValue="0.033" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-send" className="flex flex-col space-y-1">
                  <span>Envio Automático</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Enviar cobranças automaticamente ao criar
                  </span>
                </Label>
                <Switch id="auto-send" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>Configure como e quando deseja receber notificações.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="email-payment" className="flex flex-col space-y-1">
                  <span>Pagamentos Recebidos</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Receber notificações por email quando um pagamento for recebido
                  </span>
                </Label>
                <Switch id="email-payment" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="email-overdue" className="flex flex-col space-y-1">
                  <span>Cobranças Vencidas</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Receber notificações por email quando uma cobrança vencer
                  </span>
                </Label>
                <Switch id="email-overdue" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="email-subscription" className="flex flex-col space-y-1">
                  <span>Assinaturas</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Receber notificações por email sobre eventos de assinaturas
                  </span>
                </Label>
                <Switch id="email-subscription" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="email-marketing" className="flex flex-col space-y-1">
                  <span>Marketing</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Receber emails sobre novidades e dicas
                  </span>
                </Label>
                <Switch id="email-marketing" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notificações para Clientes</CardTitle>
              <CardDescription>Configure as notificações enviadas aos seus clientes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="client-new-invoice" className="flex flex-col space-y-1">
                  <span>Nova Cobrança</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Enviar email ao cliente quando uma nova cobrança for criada
                  </span>
                </Label>
                <Switch id="client-new-invoice" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="client-payment-reminder" className="flex flex-col space-y-1">
                  <span>Lembrete de Pagamento</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Enviar lembrete antes do vencimento da cobrança
                  </span>
                </Label>
                <Switch id="client-payment-reminder" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="client-payment-received" className="flex flex-col space-y-1">
                  <span>Pagamento Recebido</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Enviar confirmação quando o pagamento for recebido
                  </span>
                </Label>
                <Switch id="client-payment-received" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="client-overdue" className="flex flex-col space-y-1">
                  <span>Cobrança Vencida</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Enviar notificação quando a cobrança vencer
                  </span>
                </Label>
                <Switch id="client-overdue" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chaves de API</CardTitle>
              <CardDescription>Gerencie suas chaves de API para integração com outros sistemas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">Chave de API (Produção)</Label>
                <div className="flex space-x-2">
                  <Input
                    id="api-key"
                    defaultValue="ak_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    type="password"
                    readOnly
                  />
                  <Button variant="outline">Mostrar</Button>
                  <Button variant="outline">Copiar</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key-sandbox">Chave de API (Sandbox)</Label>
                <div className="flex space-x-2">
                  <Input
                    id="api-key-sandbox"
                    defaultValue="ak_sandbox_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    type="password"
                    readOnly
                  />
                  <Button variant="outline">Mostrar</Button>
                  <Button variant="outline">Copiar</Button>
                </div>
              </div>
              <div className="pt-4">
                <Button variant="outline">Gerar Nova Chave</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>Configure webhooks para receber notificações em tempo real.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">URL do Webhook</Label>
                <Input id="webhook-url" defaultValue="https://minhaempresa.com.br/api/webhooks/asaas" />
              </div>
              <div className="space-y-2">
                <Label>Eventos</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="webhook-payment" defaultChecked />
                    <Label htmlFor="webhook-payment">Pagamentos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="webhook-invoice" defaultChecked />
                    <Label htmlFor="webhook-invoice">Cobranças</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="webhook-subscription" defaultChecked />
                    <Label htmlFor="webhook-subscription">Assinaturas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="webhook-customer" />
                    <Label htmlFor="webhook-customer">Clientes</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
