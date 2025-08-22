import clientPromise from "@/lib/mongodb";
import Link from "next/link";

export default async function ProductDetails({ params }) {
    const { id } = params;

    try {
        const client = await clientPromise;
        const db = client.db("nextjs_store");
        const products = db.collection("products");

        // MongoDB _id is an ObjectId
        const { ObjectId } = require("mongodb");
        const product = await products.findOne({ _id: new ObjectId(id) });

        if (!product) {
            return (
                <h1 className="text-center text-red-600 text-2xl font-semibold mt-20">
                    Product Not Found
                </h1>
            );
        }

        return (
            <div className="max-w-6xl mx-auto p-6 my-8">
                <div className="grid md:grid-cols-2 gap-8 shadow-xl rounded-2xl overflow-hidden">
                    {/* Product Image */}
                    <div className="flex items-center justify-center">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-96 h-96 object-cover rounded-lg transform hover:scale-105 transition duration-300"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="p-6 flex flex-col justify-center">
                        <h1 className="text-3xl font-extrabold">{product.name}</h1>
                        <p className="text-gray-600 mt-3 leading-relaxed">{product.description}</p>
                        <p className="text-2xl text-blue-600 font-bold mt-5">${product.price}</p>

                        {/* Buttons */}
                        <div className="mt-6 flex gap-4">
                            <button className="bg-blue-600 px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                                Add to Cart
                            </button>
                            <Link
                                href="/products"
                                className="border border-gray-400 px-5 py-2 rounded-lg transition"
                            >
                                Back to Products
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <h1 className="text-center text-red-600 text-2xl font-semibold mt-20">
                Error loading product
            </h1>
        );
    }
}
