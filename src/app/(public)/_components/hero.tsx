import { Button } from "@/components/ui/button"
import Image from "next/image"
import doctorImg from '../../../../public/doctor-hero.png'

export const Hero = () => {
    return (
        <section >
            <div className="container mx-auto px-4 pt-20 pb-4 sm:pb-0 sm:px-6 lg:px-8">
                <main className="flex items-center justify-center">
                    <article className="flex=[2] max-w-3xl  spac-y-8 flex flex-col justify-center">
                        <h1 className="text-4xl lg:text-6xl font-bold">Encontre os melhores profissionais em um único local!</h1>
                        <p className="text-base md:text-lg text-gray-500">Nós somos uma plataforma para profissionais da saúde com foco em agilizar seu atendimento de forma simplificada e organizada.</p>

                        <Button className="bg-emerald-500 hover:bg-emerald-700 duration-500 cursor-pointer w-fit">
                            Profissionais disponíveis
                        </Button>
                    </article>


                    <div className="hidden md:block">
                        <Image 
                            src={doctorImg}
                            alt="imagem doutor"
                            width={340}
                            height={400}
                            className="object-contain"
                            quality={100}
                            priority
                        />
                    </div>
                </main>
            </div>
        </section>
    )
}