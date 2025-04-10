import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  const services = [
    {
      title: "Clínica Geral",
      description: "Consultas de rotina e acompanhamento de saúde",
      price: "R$ 150,00",
      image: "/placeholder.svg?height=200&width=300&text=Clínica+Geral",
    },
    {
      title: "Cardiologia",
      description: "Avaliação e acompanhamento cardíaco",
      price: "R$ 250,00",
      image: "/placeholder.svg?height=200&width=300&text=Cardiologia",
    },
    {
      title: "Dermatologia",
      description: "Tratamento de problemas de pele",
      price: "R$ 200,00",
      image: "/placeholder.svg?height=200&width=300&text=Dermatologia",
    },
    {
      title: "Psicologia",
      description: "Suporte para saúde mental e bem-estar",
      price: "R$ 180,00",
      image: "/placeholder.svg?height=200&width=300&text=Psicologia",
    },
    {
      title: "Nutrição",
      description: "Orientação nutricional personalizada",
      price: "R$ 150,00",
      image: "/placeholder.svg?height=200&width=300&text=Nutrição",
    },
    {
      title: "Pediatria",
      description: "Cuidados especializados para crianças",
      price: "R$ 200,00",
      image: "/placeholder.svg?height=200&width=300&text=Pediatria",
    },
    {
      title: "Ginecologia",
      description: "Saúde da mulher e acompanhamento ginecológico",
      price: "R$ 220,00",
      image: "/placeholder.svg?height=200&width=300&text=Ginecologia",
    },
    {
      title: "Ortopedia",
      description: "Tratamento de problemas musculoesqueléticos",
      price: "R$ 230,00",
      image: "/placeholder.svg?height=200&width=300&text=Ortopedia",
    },
    {
      title: "Endocrinologia",
      description: "Tratamento de distúrbios hormonais",
      price: "R$ 240,00",
      image: "/placeholder.svg?height=200&width=300&text=Endocrinologia",
    },
  ]

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
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nossas Especialidades</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Oferecemos uma ampla gama de especialidades médicas para atender às suas necessidades de saúde
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <Card key={index} className="overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">{service.price}</p>
                    <p className="text-sm text-muted-foreground">por consulta</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`}>
                        Agendar Consulta <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
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
