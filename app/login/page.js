"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleEmailLogin = async () => {
        setLoading(true)
        setError("")

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })

        setLoading(false)

        if (res?.error) {
            // if user not found → redirect register
            if (res.error.toLowerCase().includes("user")) {
                router.push("/register")
            } else {
                setError(res.error)
            }
        }

        if (res?.ok) router.push("/products")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br ">
            <div className=" p-8 rounded-2xl shadow-2xl w-full max-w-md   hover:shadow-[0_8px_35px_rgba(59,130,246,0.6)] ">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Welcome Back 👋
                </h1>
                <p className="text-center text-gray-500 mb-6">
                    Login to continue exploring our products
                </p>

                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                <div className="form-control mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-control mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="btn btn-primary w-full mb-4"
                    onClick={handleEmailLogin}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login with Email"}
                </button>

                <div className="divider">OR</div>

                <button
                    className="btn btn-outline w-full mb-4"
                    onClick={() => signIn("github", { callbackUrl: "/" })}
                >
                    Login with GitHub
                </button>

                <p className="text-center text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <Link href="/register" className="text-blue-600 font-semibold hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    )
}
