import { Card, CardContent } from '@/components/ui/card'
import { RegisterForm } from '@/components/ui/registration-form'
import { cn } from '@/lib/utils'
import React from 'react'

function ErrorPage() {
  return (

    <div className="flex min-h-svh flex-col items-center justify-center bg-zinc-100 p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-3xl">
          <div className={cn("flex flex-col gap-6")} >
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          
          <div className="relative hidden bg-muted md:block">
            <img
              src="/images/photo3.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Создано в учебных целях не передаем ваши данные третьим лицам. Был разработан <a href="https://github.com/MuratOfficial">@MuratOfficial</a>.
      </div>
    </div>
          </div>
        </div>
    
  )
}

export default ErrorPage