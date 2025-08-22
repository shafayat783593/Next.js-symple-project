import clientPromise from "@/lib/mongodb"

export async function POST(req) {
    try {
        const { name, email, password } = await req.json()
        const client = await clientPromise
        const db = client.db("nextjs_store") // Use same DB for users
        const users = db.collection("users")

        // Check if user exists
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            return new Response(
                JSON.stringify({ success: false, message: "User already exists" }),
                { status: 400 }
            )
        }

        await users.insertOne({ name, email, password, createdAt: new Date() })

        return new Response(
            JSON.stringify({ success: true, message: "User created" }),
            { status: 201 }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, message: "Error creating user" }),
            { status: 500 }
        )
    }
}
