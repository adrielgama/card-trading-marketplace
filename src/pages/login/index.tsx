import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { EyeOff, Eye } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { formSchema } from '@/helpers/schemas'

const loginSchema = formSchema.passthrough()

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    try {
      console.log(values.email, values.password)
      toast.success('Login efetuado com sucesso')
    } catch (error) {
      toast.error('Login ou senha inválidos')
      console.log(error)
    }
  }

  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center space-y-8"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23009264' fill-opacity='0.05'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <Logo />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 rounded-md bg-white p-16 drop-shadow-md"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="e-mail"
                    placeholder="Informe seu e-mail"
                    className={`rounded-[10px] px-4 py-7 placeholder:font-normal placeholder:text-gray-400 first-of-type:font-bold first-of-type:text-in-green-100 focus:outline-none ${field.value ? 'border-in-green-100' : 'border-gray-400'}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Informe sua senha"
                      className={`rounded-[10px] px-4 py-7 placeholder:font-normal placeholder:text-gray-400 first-of-type:font-bold first-of-type:text-in-green-100 focus:outline-none ${field.value ? 'border-in-green-100' : 'border-gray-400'}`}
                      {...field}
                    />
                    <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                      {showPassword ? (
                        <EyeOff size={17} onClick={togglePasswordVisibility} />
                      ) : (
                        <Eye
                          size={17}
                          className={
                            field.value ? 'text-in-green-100' : 'text-gray-400'
                          }
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full cursor-pointer gap-2 rounded-[10px] bg-in-orange-300 py-7 text-2xl font-bold text-white hover:bg-in-orange-400 disabled:bg-gray-500"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Login
