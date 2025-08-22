import clientPromise from "@/lib/mongodb"

export async function GET() {
    try {
        const client = await clientPromise
        const db = client.db("nextjs_store")
        const products = db.collection("products")

        const allProducts = await products.find({}).sort({ createdAt: -1 }).toArray()
        return new Response(JSON.stringify(allProducts), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: "Error fetching products" }), { status: 500 })
    }
}

export async function POST(req) {
    try {
        const { name, description, image, price, brand, category } = await req.json()
        if (!name || !description || !image || !price) {
            return new Response(JSON.stringify({ success: false, message: "All fields are required" }), { status: 400 })
        }

        const client = await clientPromise
        const db = client.db("nextjs_store")
        const products = db.collection("products")

        const newProduct = {
            name,
            description,
            image,
            price: parseFloat(price),
            brand: brand || "Unknown",
            category: category || "Electronics",
            createdAt: new Date(),
        }

        await products.insertOne(newProduct)
        return new Response(JSON.stringify({ success: true, message: "Product added successfully" }), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: "Error adding product" }), { status: 500 })
    }
}
