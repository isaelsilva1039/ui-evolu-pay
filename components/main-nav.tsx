import Link from "next/link"
import { CreditCard } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/dashboard" className="flex items-center gap-2">
        <CreditCard className="h-6 w-6 text-primary" />
        <span className="hidden font-bold text-xl text-primary md:inline-block">PaySystem</span>
      </Link>
    </div>
  )
}
