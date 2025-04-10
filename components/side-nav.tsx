"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowUpFromLine,
  BarChart3,
  Building,
  CreditCard,
  FileText,
  LayoutDashboard,
  Repeat,
  Settings,
  Users,
  UserCog,
  ShieldCheck,
  LinkIcon,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface SideNavProps {
  isCollapsed?: boolean
  onNavClick?: () => void
}

export function SideNav({ isCollapsed = false, onNavClick }: SideNavProps) {
  const pathname = usePathname()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    admin: false,
    integrations: false,
  })

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Cobranças",
      href: "/invoices",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Pagamentos",
      href: "/payments",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Transferências",
      href: "/transfers",
      icon: <ArrowUpFromLine className="h-5 w-5" />,
    },
    {
      title: "Contas Bancárias",
      href: "/bank-accounts",
      icon: <Building className="h-5 w-5" />,
    },
    {
      title: "Clientes",
      href: "/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Assinaturas",
      href: "/subscriptions",
      icon: <Repeat className="h-5 w-5" />,
    },
    {
      title: "Relatórios",
      href: "/reports",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Meu Perfil",
      href: "/profile",
      icon: <User className="h-5 w-5" />,
    },
  ]

  const adminItems = [
    {
      title: "Usuários",
      href: "/admin/users",
      icon: <UserCog className="h-5 w-5" />,
    },
    {
      title: "Permissões",
      href: "/admin/roles",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
  ]

  const integrationItems = [
    {
      title: "Evolutto",
      href: "/integrations/evolutto",
      icon: <LinkIcon className="h-5 w-5" />,
    },
  ]

  return (
    <div className={cn("flex flex-col gap-2 p-2 h-full", isCollapsed ? "items-center" : "items-start")}>
      <TooltipProvider delayDuration={0}>
        <nav className="grid gap-1 px-2 py-4 w-full">
          {navItems.map((item, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    onClick={onNavClick}
                    className={cn(
                      "flex items-center justify-center h-10 w-10 rounded-md",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    {item.icon}
                    <span className="sr-only">{item.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.title}</TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={item.href}
                onClick={onNavClick}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ),
          )}

          {/* Admin Section */}
          {isCollapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="/admin/users"
                  onClick={onNavClick}
                  className={cn(
                    "flex items-center justify-center h-10 w-10 rounded-md mt-4",
                    pathname.startsWith("/admin")
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Administração</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Administração</TooltipContent>
            </Tooltip>
          ) : (
            <Collapsible open={openGroups.admin} onOpenChange={() => toggleGroup("admin")} className="w-full mt-4">
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5" />
                  <span>Administração</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 transition-transform", openGroups.admin ? "rotate-180" : "")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 pt-1">
                {adminItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={onNavClick}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Integrations Section */}
          {isCollapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="/integrations/evolutto"
                  onClick={onNavClick}
                  className={cn(
                    "flex items-center justify-center h-10 w-10 rounded-md mt-2",
                    pathname.startsWith("/integrations")
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <LinkIcon className="h-5 w-5" />
                  <span className="sr-only">Integrações</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Integrações</TooltipContent>
            </Tooltip>
          ) : (
            <Collapsible
              open={openGroups.integrations}
              onOpenChange={() => toggleGroup("integrations")}
              className="w-full mt-2"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                <div className="flex items-center gap-3">
                  <LinkIcon className="h-5 w-5" />
                  <span>Integrações</span>
                </div>
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", openGroups.integrations ? "rotate-180" : "")}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 pt-1">
                {integrationItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={onNavClick}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}

          <div className="mt-4">
            <Link
              href="/settings"
              onClick={onNavClick}
              className={cn(
                isCollapsed
                  ? "flex items-center justify-center h-10 w-10 rounded-md"
                  : "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                pathname === "/settings"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {isCollapsed ? (
                <>
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Configurações</span>
                </>
              ) : (
                <>
                  <Settings className="h-5 w-5" />
                  <span>Configurações</span>
                </>
              )}
            </Link>
          </div>
        </nav>
      </TooltipProvider>
    </div>
  )
}
