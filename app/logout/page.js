"use client"

import { signOut, useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session) {
            // Automatically sign out the user when visiting this page
            signOut({ callbackUrl: "/" })
        } else if (status === "unauthenticated") {
            // If already logged out, redirect to home
            router.push("/")
        }
    }, [session, status, router])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold">Logging out...</h1>
            <p className="text-gray-500">You are being logged out. Please wait...</p>
        </div>
    )
}
