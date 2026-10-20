import {email, z} from 'zod';

export const colaboradorSchema = z.object({
    nome:z.string().min(3, {message: 'Nome deve conter no mínimo três letras'}),
    email:z.email({message:"O email deve ser válido"}),
    idade:z.int({error: "A idade precisa ser um número entre 0 e 65"}).min(0).max(65),
    departamento: z.enum(['TI', 'RH', 'Financeiro'], {
        error: 'O departamento deve ser obrigatoriamente: TI, RH ou Financeiro'
    })
});

export type Colaborador = z.infer<typeof colaboradorSchema>