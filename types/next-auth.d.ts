import { DefaultSession } from "next-auth";

declare module 'next-auh'{
    interface Session {
        user: User & DefaultSession['user']
    }
}

interface User{
    id: string,
    name: string,
    email: string,
    emailVerified?: null|string|boolean,
    image?: string,
    stripe_customer_id?: string,
    time: string[],
    address?: string,
    phone?: string,
    status: boolean,
    createdAt: string,
    updatedAt: string
}