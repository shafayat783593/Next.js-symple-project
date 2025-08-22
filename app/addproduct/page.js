"use client";
import { useState } from "react";

export default function AddProduct() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        image: "",
        price: "",
        rating: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                price: Number(form.price),
                rating: form.rating ? Number(form.rating) : 0,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage("✅ Product added successfully!");
            setForm({ name: "", description: "", image: "", price: "", rating: "" });
        } else {
            setMessage(`❌ Failed to add product: ${data.message}`);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-lg mx-auto shadow-lg rounded-2xl p-6 hover:shadow-[0_8px_35px_rgba(59,130,246,0.6)] my-20">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Add New Product</h2>
            {message && <p className="text-center mb-4">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Product Description"
                    value={form.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (1-5)"
                    value={form.rating}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    min={0}
                    max={5}
                />
                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
}
