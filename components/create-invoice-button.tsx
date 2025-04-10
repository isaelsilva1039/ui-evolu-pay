"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreateInvoiceModal } from "@/components/create-invoice-modal"
import { Plus } from "lucide-react"

export function CreateInvoiceButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Nova Cobrança
      </Button>
      <CreateInvoiceModal open={open} onOpenChange={setOpen} />
    </>
  )
}
