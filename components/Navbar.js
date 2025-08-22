"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

export default function Navbar() {
    const { data: session } = useSession()

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link href="/"> Home</Link>
                            </li>
                            <li>
                                <Link href="/products"> Products</Link>
                            </li>
                            <li>
                                <Link href="/addproduct"> Add products</Link>
                            </li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl"> Electronics</a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link href="/"> Home</Link>
                        </li>
                        <li>
                            <Link href="/products"> Products</Link>
                        </li>
                        <li>
                            <Link href="/addproduct"> Add products</Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end flex gap-2">
                    {session ? (

                     <div className="flex gap-6 justify-center items-center font-bold ">

                            <h1 className=" text-white"> {session?.user?.name}</h1>

                            <Link href="/logout" className="btn btn-secondary">
                                Logout
                            </Link>
                     </div>
                    
                    ) : (
                        <>
                            <Link href="/login" className="btn btn-primary">
                                Login
                            </Link>
                            <Link href="/register" className="btn btn-outline btn-primary">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
