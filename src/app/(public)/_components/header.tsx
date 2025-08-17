"use client"

import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { LogIn, Menu } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { handleRegister } from "../_actions/login";


export const Header = () => {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    console.log(session);
    console.log(status);


    const navItems = [
        { label: "Profissionais", href: "#" },
    ];

    async function handleLogin() {
        await handleRegister('github')
    }

    const NavItems = () => (
        <>
            {navItems.map((item) => (
                <Button
                    onClick={() => setIsOpen(false)}
                    key={item.href}
                    asChild
                    className="bg-transparent hover:bg-transparent text-black shadow-none"
                >
                    <Link href={item.href}>
                        {item.label}
                    </Link>
                </Button>
            ))}

            {status === "loading" ? (
                <></>
            ) : session ? (
                <Link href='/' className="flex items-center justify-center gap-2 text-base">
                    Panel da clinica
                </Link>
            ) : (
                <Button className="cursor-pointer" onClick={handleLogin}> 
                    <LogIn />
                    Fazer login
                </Button>
            )}
        </>
    );




    return (
        <header
            className="fixed top-0 left-0 w-full z-[999] bg-white shadow-md p-4 px-6"
        >
            <div className="container mx-auto flex items-center justify-between ">
                <Link href="/" className="text-3xl font-bold text-gray-800 ">
                    Adonto<span className="text-emerald-500">PRO</span>
                </Link>

                <nav className="hidden md:flex space-x-4">
                    <NavItems />
                </nav>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button className="text-black hover:bg-transparent" variant={"ghost"} size={"icon"}>
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[240px] sm:w-[320px] z-[9999]">
                        <SheetHeader>
                            <SheetTitle>MENU</SheetTitle>
                            <SheetDescription>
                                Veja nossos links
                            </SheetDescription>

                            <nav className="flex flex-col space-y-4 mt-6">
                                <NavItems />
                            </nav>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

            </div>

        </header>
    );
}