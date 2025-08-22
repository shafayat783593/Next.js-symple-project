import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "@/lib/mongodb"
import { compare } from "bcryptjs"

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const client = await clientPromise
                const db = client.db()
                const user = await db.collection("users").findOne({ email: credentials.email })
                if (!user) return null

                const isValid = await compare(credentials.password, user.password)
                if (!isValid) return null

                return { id: user._id, name: user.name, email: user.email }
            },
        }),
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
    },
})

export { handler as GET, handler as POST }
