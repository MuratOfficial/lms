import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/main"
        className="text-sm font-medium transition-colors hover:text-zinc-500"
      >
        Главная
      </Link>
      <Link
        href="/tasks"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-zinc-500"
      >
        Задачи
      </Link>
      <Link
        href="/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-zinc-500"
      >
        Настройки
      </Link>
      <Link
        href="/progress"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-zinc-500"
      >
        Прогресс
      </Link>
      <Link
        href="/board"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-zinc-500"
      >
        Игры
      </Link>
    </nav>
  )
}