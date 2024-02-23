import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(3, { message: 'Nome inválido' }).optional(),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(3, { message: 'Senha inválida' }),
})
