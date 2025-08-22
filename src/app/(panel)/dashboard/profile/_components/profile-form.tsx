import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";



interface useProfileFormProps {
    name: string | null
    address: string | null
    phone: string | null
    status: boolean
    timeZone: string | null
}

const profileSchema = z.object({
    name: z.string().min(1, { message: 'O nome é obrigatorio' }),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.string(), 
    timeZone: z.string().min(1, { message: 'O time zone é obrigatorio' }),
})

export type ProfileFormData = z.infer<typeof profileSchema>

// Inicializa o formualario com reacthookform
export function useProfileForm({ name, address, phone, status, timeZone  }: useProfileFormProps ){
    return useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: name || '',
            address: address || '',
            phone: phone || '',
            status: status ? 'active' : 'inactive',
            timeZone: timeZone || '',
        }
    })
}