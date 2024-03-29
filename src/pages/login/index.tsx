import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { EyeOff, Eye } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
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
import { useAuthContext } from '@/context/AuthContext'
import { formSchema } from '@/helpers/schemas'

const loginSchema = formSchema.passthrough()

const Login: React.FC = () => {
  const { login } = useAuthContext()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await login(values.email, values.password)
      toast.success('Login efetuado com sucesso')
    } catch (error) {
      toast.error('Falha no login. Verifique suas credenciais.')
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <Logo />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid space-y-6 rounded-md bg-white px-16 py-12 text-center shadow-md backdrop-blur-sm"
        >
          <h1 className="font-medium text-in-green-100">Login</h1>
          <div className="grid space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="e-mail"
                      placeholder="Informe seu e-mail"
                      className={`first-of-type:font-m rounded-md p-6 placeholder:font-normal placeholder:text-gray-400 first-of-type:text-in-green-100 focus:outline-none ${field.value ? 'border-in-green-100' : 'border-gray-400'}`}
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
                        className={`rounded-md p-6 placeholder:font-normal placeholder:text-gray-400 first-of-type:font-bold first-of-type:text-in-green-100 focus:outline-none ${field.value ? 'border-in-green-100' : 'border-gray-400'}`}
                        {...field}
                      />
                      <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                        {showPassword ? (
                          <EyeOff
                            size={17}
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <Eye
                            size={17}
                            className={
                              field.value
                                ? 'text-in-green-100'
                                : 'text-gray-400'
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
              className="w-full cursor-pointer gap-2 rounded-md bg-in-gold-300 py-4 text-base font-medium text-white hover:bg-in-gold-400 disabled:bg-gray-500"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              Entrar
            </Button>
          </div>
          <div className="mt-3 flex w-full justify-center">
            <button
              type="button"
              className="flex cursor-pointer flex-row gap-1 text-end text-xs text-in-gold-500 hover:text-in-gold-400 hover:underline"
              onClick={() => navigate('/signup')}
            >
              Não tem uma conta?
              <span className="text-in-green-100 hover:text-in-green-600">
                Registre-se.
              </span>
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Login
