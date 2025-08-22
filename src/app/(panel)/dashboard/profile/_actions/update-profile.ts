"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { error, time } from "console"
import { z } from "zod"

const formSchema = z.object({
    name: z.string().min(1, { message: 'O nome é obrigatorio' }),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.boolean(),
    timeZone: z.string(),
    times: z.array(z.string())
})

type FormSchema = z.infer<typeof formSchema>


export async function updateProfile(formData: FormSchema) {

    const session = await auth()

    if (!session?.user?.id) {
        return {
            error: 'Usuário não autenticado'
        }
    }


    const schema = formSchema.safeParse(formData)

    if (!schema.success) {
        return {
            error: 'Dados inválidos'
        }
    }

    try {

        await prisma.user.update({
            where: {
                id: session?.user?.id
            },
            data: {
                name: formData.name,
                adress: formData.address,
                phone: formData.phone,
                status: formData.status,
                timeZone: formData.timeZone,
                times: formData.times || []
            }
        })

        return {
            message: 'Perfil atualizado com sucesso'
        }

    } catch (err) {
        console.log(err)
        return {
            error: 'Erro ao atualizar o perfil'
        }
    }

}