import { products } from "@/app/data/products";
import Link from "next/link";

export default function ProductHighlightsPage() {
    // Let's assume highlights are first 3 products
    const highlights = products.slice(0, 3);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-12 px-6 text-white">
            <h1 className="text-4xl font-extrabold text-center mb-12">Product Highlights</h1>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {highlights.map((product) => (
                    <div
                        key={product.id}
                        className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                    >
                        {/* Image */}
                        <div className="relative w-full h-56 overflow-hidden rounded-t-2xl">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 p-5 flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white">{product.name}</h2>
                                <p className="text-gray-300 mt-2 text-sm line-clamp-3">{product.description}</p>
                            </div>

                            {/* Price + Button */}
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-lg font-semibold text-blue-400">${product.price}</span>
                                <Link
                                    href={`/products/${product.id}`}
                                    className="bg-blue-600 rounded-xl px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
