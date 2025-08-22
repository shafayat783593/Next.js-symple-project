"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { hash } from "bcryptjs"

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // ✅ Redirect logged-in users away from register page
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/check") // you need this endpoint
                const data = await res.json()
                if (data.loggedIn) router.push("/dashboard")
            } catch { }
        }
        checkAuth()
    }, [router])

    const handleRegister = async () => {
        setLoading(true)
        setError("")

        try {
            const hashedPassword = await hash(password, 10)

            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password: hashedPassword }),
            })

            const data = await res.json()
            if (data.success) router.push("/")
            // else setError(data.message)
        } catch (err) {
            setError("Something went wrong")
        }
        setLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r ">
            <div
                // initial={{ opacity: 0, y: 50 }}
                // animate={{ opacity: 1, y: 0 }}
                // transition={{ duration: 0.6 }}
                className="w-full max-w-md rounded-2xl   hover:shadow-[0_8px_35px_rgba(59,130,246,0.6)]  p-8 shadow-xl"
            >
                <h1 className="mb-6 text-center text-3xl font-bold text-indigo-600">Create Account</h1>
                {error && <p className="mb-3 text-center text-red-500">{error}</p>}

                <input
                    type="text"
                    placeholder="Full Name"
                    className="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="mb-6 w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full rounded-lg bg-indigo-600 py-3 text-white transition hover:bg-indigo-700 disabled:opacity-60"
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="mt-4 text-center text-sm text-gray-200">
                    Already have an account?{" "}
                    <span
                        className="cursor-pointer font-semibold text-indigo-600 hover:underline"
                        onClick={() => router.push("/login")}
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    )
}
