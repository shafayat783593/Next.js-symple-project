"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function ProductsPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products")
      const data = await res.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-12 my-7 px-6 text-white">
      <h1 className="text-3xl font-extrabold text-center mb-10 text-white">Our Products</h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 p-5 flex flex-col bg-gray-800"
          >
            <div className="relative w-full h-48 overflow-hidden rounded-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 mt-4">
              <h2 className="text-lg font-bold text-white">{product.name}</h2>
              <p className="text-sm text-gray-300 mt-1 line-clamp-2">{product.description}</p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xl font-semibold text-blue-400">${product.price}</span>
              <Link
                href={`/products/${product._id}`}
                className="bg-blue-600 rounded-2xl text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
