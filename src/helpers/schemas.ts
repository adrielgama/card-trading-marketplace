import { z } from 'zod'

export const formSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(3, { message: 'Senha inválida' }),
})
