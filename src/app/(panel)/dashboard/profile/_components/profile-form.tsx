import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const profileSchema = z.object({
    name: z.string().min(1, { message: 'O nome é obrigatorio' }),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.string(), 
    timeZone: z.string().min(1, { message: 'O time zone é obrigatorio' }),
})

export type ProfileFormData = z.infer<typeof profileSchema>

export function useProfileForm(){
    return useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: '',
            address: '',
            phone: '',
            status: '',
            timeZone: '',
        }
    })
}