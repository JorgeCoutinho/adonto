"use client"
import { ProfileFormData, useProfileForm } from "./profile-form"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import imgTest from '../../../../../../public/foto1.png'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Prisma } from "@/generated/prisma";
import { updateProfile } from "../_actions/update-profile"
 

type UserWithSubscription = Prisma.UserGetPayload<{
    include: { subscription: true }
}>


interface ProfileContentProps {
    user: UserWithSubscription
}



export const ProfileContent = ({user}: ProfileContentProps) => {

    const [selecteHours, setSelectHours] = useState<string[]>(user.times || [])
    const [dialogIsOpen, setDialogIsOpen] = useState(false)




    const form = useProfileForm({
        name: user.name,
        address: user.adress,
        phone: user.phone,
        status: user.status,
        timeZone: user.timeZone,
    })

    function generateTimeSlots(): string[] {
        const hours: string[] = []

        for (let i = 8; i <= 24; i++) {
            for (let j = 0; j < 2; j++) {
                const hour = i.toString().padStart(2, '0')
                const minute = (j * 30).toString().padStart(2, '0')
                hours.push(`${hour}:${minute}`)
            }
        }

        return hours

    }

    const hours = generateTimeSlots()

    function toggleHour(hour: string) {
        setSelectHours((prev) => prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour].sort())
    }

    const timeZone = Intl.supportedValuesOf('timeZone').filter((zone) => 
        zone.startsWith('America/Sao_paulo') ||
            zone.startsWith('America/Fortaleza') ||
            zone.startsWith('America/Recife') ||
            zone.startsWith('America/Bahia') ||
            zone.startsWith('America/Belem') ||
            zone.startsWith('America/Manaus') ||
            zone.startsWith('America/Cuiba') ||
            zone.startsWith('America/Boa_vista') 
    )

    async function onSubmit(value: ProfileFormData) {
        // const profileData = {
        //     ...value,
        //     times: selecteHours
        // }

        const response = await updateProfile({
            name: value.name,
            address: value.address,
            phone: value.phone,
            status: value.status === 'active' ? true : false,
            timeZone: value.timeZone,
            times: selecteHours || [],
        })

        console.log(response)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Meu Perfil</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex justify-center">
                            <div className="bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden">
                                <Image
                                    src={user.image ? user.image : imgTest}
                                    alt="Foto da clinica "
                                    className="object-cover"
                                    width="460"
                                    height="460"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">Nome completo</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Digite seu nome da clinica." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">Endereço completo</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Digite o endereço da clinica." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">Telefone</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Digite o Telefone da clinica..." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">Telefone</FormLabel>
                                        <FormControl>

                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value ? 'active' : 'inactive'}

                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder='Selecione o status da clinica' />
                                                    <SelectContent>
                                                        <SelectItem value="active">Ativo (Clinica Aberta)</SelectItem>
                                                        <SelectItem value="inactive">Inativo (Clinica Fechada)</SelectItem>
                                                    </SelectContent>
                                                </SelectTrigger>
                                            </Select>

                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-4">
                                <Label className="font-semibold">
                                    Configura horários da clinica
                                </Label>
                                <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                                    <DialogTrigger asChild >
                                        <Button variant={"outline"} className="w-full justify-between">Clique para selecionar o horário <ArrowRight className="w-5 h-5" /> </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Horários da clinica</DialogTitle>
                                            <DialogDescription>
                                                Selecione abaixo os horários de funcionamento da clinica
                                            </DialogDescription>
                                        </DialogHeader>
                                        <section className="py-4">
                                            <p className="text-sm text-muted-foreground mb-2">Clique nos horários para marcar ou desmarcar:</p>

                                            <div className="grid grid-cols-5 gap-2">
                                                {hours.map((hour, index) => (
                                                    <Button
                                                        key={hour}
                                                        variant='outline'
                                                        className={cn('h-10', selecteHours.includes(hour) && 'border-2 border-emerald-500')}
                                                        onClick={() => toggleHour(hour)}
                                                    >
                                                        {hour}
                                                    </Button>
                                                ))}
                                            </div>
                                        </section>
                                        <Button className="w-full" onClick={() => setDialogIsOpen(false)}>
                                            Fechar Modal
                                        </Button>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <FormField
                                control={form.control}
                                name="timeZone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">Selecione o fuso horário</FormLabel>
                                        <FormControl>

                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder='Selecione o fuso horário' />
                                                    <SelectContent>
                                                        {timeZone.map((zone) => (
                                                            <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </SelectTrigger>
                                            </Select>

                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        
                                <Button
                                    type="submit"
                                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                                >
                                    Salvar alterações
                                </Button>

                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}