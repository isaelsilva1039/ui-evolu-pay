"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useForm } from "react-hook-form"

export default function AppointmentPage() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      paymentMethod: "credit",
    },
  })

  const services = [
    { id: "clinica-geral", name: "Clínica Geral", price: "R$ 150,00" },
    { id: "cardiologia", name: "Cardiologia", price: "R$ 250,00" },
    { id: "dermatologia", name: "Dermatologia", price: "R$ 200,00" },
    { id: "psicologia", name: "Psicologia", price: "R$ 180,00" },
    { id: "nutricao", name: "Nutrição", price: "R$ 150,00" },
    { id: "pediatria", name: "Pediatria", price: "R$ 200,00" },
    { id: "ginecologia", name: "Ginecologia", price: "R$ 220,00" },
    { id: "ortopedia", name: "Ortopedia", price: "R$ 230,00" },
    { id: "endocrinologia", name: "Endocrinologia", price: "R$ 240,00" },
  ]

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const onSubmit = (data: any) => {
    console.log({
      ...data,
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
    })
    nextStep()
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">MediConnect</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/services" className="text-sm font-medium transition-colors hover:text-primary">
                Serviços
              </Link>
              <Link href="/doctors" className="text-sm font-medium transition-colors hover:text-primary">
                Médicos
              </Link>
              <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                Sobre
              </Link>
              <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                Contato
              </Link>
              <Button asChild>
                <Link href="/appointment">Agendar Consulta</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container max-w-4xl py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tighter">Agendar Consulta</h1>
            <p className="text-muted-foreground">Preencha os dados abaixo para agendar sua consulta online</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    step >= 1 ? "bg-primary text-primary-foreground" : "border border-input bg-background",
                  )}
                >
                  1
                </div>
                <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>Especialidade</span>
              </div>
              <div className="hidden sm:block h-0.5 w-10 bg-muted"></div>
              <div className="flex items-center space-x-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    step >= 2 ? "bg-primary text-primary-foreground" : "border border-input bg-background",
                  )}
                >
                  2
                </div>
                <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>Data e Hora</span>
              </div>
              <div className="hidden sm:block h-0.5 w-10 bg-muted"></div>
              <div className="flex items-center space-x-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    step >= 3 ? "bg-primary text-primary-foreground" : "border border-input bg-background",
                  )}
                >
                  3
                </div>
                <span className={step >= 3 ? "font-medium" : "text-muted-foreground"}>Seus Dados</span>
              </div>
              <div className="hidden sm:block h-0.5 w-10 bg-muted"></div>
              <div className="flex items-center space-x-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    step >= 4 ? "bg-primary text-primary-foreground" : "border border-input bg-background",
                  )}
                >
                  4
                </div>
                <span className={step >= 4 ? "font-medium" : "text-muted-foreground"}>Confirmação</span>
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Selecione a especialidade</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className={cn(
                      "cursor-pointer transition-colors hover:border-primary",
                      selectedService === service.id && "border-primary",
                    )}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-bold text-primary">{service.price}</p>
                      <p className="text-sm text-muted-foreground">por consulta</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={nextStep} disabled={!selectedService}>
                  Próximo
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Selecione a data e horário</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium mb-2">Data da consulta</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    locale={ptBR}
                    className="border rounded-md p-3"
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Horário disponível</h3>
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className="w-full"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Selecione uma data para ver os horários disponíveis</p>
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={prevStep}>
                  Voltar
                </Button>
                <Button onClick={nextStep} disabled={!selectedDate || !selectedTime}>
                  Próximo
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Seus dados</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Digite seu e-mail" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Forma de pagamento</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="credit" />
                              </FormControl>
                              <FormLabel className="font-normal">Cartão de crédito</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="debit" />
                              </FormControl>
                              <FormLabel className="font-normal">Cartão de débito</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="pix" />
                              </FormControl>
                              <FormLabel className="font-normal">PIX</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Voltar
                    </Button>
                    <Button type="submit">Finalizar agendamento</Button>
                  </div>
                </form>
              </Form>
            </div>
          )}

          {step === 4 && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-center text-green-700">Agendamento Confirmado!</CardTitle>
                <CardDescription className="text-center text-green-600">
                  Sua consulta foi agendada com sucesso
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="font-medium">Detalhes da consulta</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Especialidade:</span>
                      <span className="font-medium">{services.find((s) => s.id === selectedService)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data:</span>
                      <span className="font-medium">
                        {selectedDate && format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Horário:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valor:</span>
                      <span className="font-medium">{services.find((s) => s.id === selectedService)?.price}</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Enviamos um e-mail com todas as informações da sua consulta. Você receberá o link de acesso 15 minutos
                  antes do horário agendado.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild>
                  <Link href="/">Voltar para a página inicial</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 md:py-12 border-t">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold">MediConnect</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Cuidados médicos online de qualidade, acessíveis e convenientes.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Serviços</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/services/clinica-geral" className="text-muted-foreground hover:text-foreground">
                    Clínica Geral
                  </Link>
                </li>
                <li>
                  <Link href="/services/cardiologia" className="text-muted-foreground hover:text-foreground">
                    Cardiologia
                  </Link>
                </li>
                <li>
                  <Link href="/services/dermatologia" className="text-muted-foreground hover:text-foreground">
                    Dermatologia
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-muted-foreground hover:text-foreground">
                    Ver todos
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link href="/doctors" className="text-muted-foreground hover:text-foreground">
                    Nossos médicos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Termos de uso
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Política de privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MediConnect. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
