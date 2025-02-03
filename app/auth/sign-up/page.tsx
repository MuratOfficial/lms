import { RegisterForm } from '@/components/ui/registration-form'
import React from 'react'

function RegisterPage() {
  return (

    <div className="flex min-h-svh flex-col items-center justify-center bg-zinc-100 p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-3xl">
          <RegisterForm/>
          </div>
        </div>
    
  )
}

export default RegisterPage