"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AnticipationModal } from "@/components/anticipation-modal"
import { CloudLightningIcon as Lightning } from "lucide-react"

export function AnticipationButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" size="sm" className="w-full flex items-center gap-1" onClick={() => setOpen(true)}>
        <Lightning className="h-3 w-3" />
        <span>Antecipar</span>
      </Button>
      <AnticipationModal open={open} onOpenChange={setOpen} />
    </>
  )
}
