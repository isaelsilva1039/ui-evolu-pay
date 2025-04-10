"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreateTransferModal } from "@/components/create-transfer-modal"
import { RecurringTransferModal } from "@/components/recurring-transfer-modal"
import { ArrowUpFromLine, ChevronDown, Repeat } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function CreateTransferButton() {
  const [openSingle, setOpenSingle] = useState(false)
  const [openRecurring, setOpenRecurring] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <ArrowUpFromLine className="mr-2 h-4 w-4" />
            Nova Transferência
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpenSingle(true)}>
            <ArrowUpFromLine className="mr-2 h-4 w-4" />
            Transferência Única
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenRecurring(true)}>
            <Repeat className="mr-2 h-4 w-4" />
            Transferência Recorrente
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateTransferModal open={openSingle} onOpenChange={setOpenSingle} />
      <RecurringTransferModal open={openRecurring} onOpenChange={setOpenRecurring} />
    </>
  )
}
