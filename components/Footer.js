"use client"

import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaLocationArrow } from "react-icons/fa"
import Link from "next/link"
import { useSession } from "next-auth/react"

const Footer = () => {
  const { data: session } = useSession()
  console.log(session)

  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4"></h2>
          <p>Your trusted platform for managing life electronics — secure your tomorrow, today.</p>
          <div className="flex mt-4 space-x-4 text-xl">
            <a href="https://www.facebook.com/rana.rahim.5473" className="hover:text-pink-300"><FaFacebook /></a>
            <a href="https://x.com/" className="hover:text-pink-300"><FaTwitter /></a>
            <a href="https://www.linkedin.com/in/md-shafayat-hosan" className="hover:text-pink-300"><FaLinkedin /></a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-pink-300 transition duration-200">Home</Link></li>
            <li><Link href="/products" className="hover:text-pink-300 transition duration-200">All product</Link></li>
            {session?.user && (
              <li><Link href="/dashboard" className="hover:text-pink-300 transition duration-200">Dashboard</Link></li>
            )}
            <li><Link href="/contactSupport" className="hover:text-pink-300 transition duration-200">Add product</Link></li>
          </ul>
        </div>

        {/* Support Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><Link href="/notFound" className="hover:text-pink-300 transition duration-200">FAQ</Link></li>
            <li><Link href="/notFound" className="hover:text-pink-300 transition duration-200">Terms & Conditions</Link></li>
            <li><Link href="/notFound" className="hover:text-pink-300 transition duration-200">Privacy Policy</Link></li>
            <li><Link href="/notFound" className="hover:text-pink-300 transition duration-200">Help Center</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p className="flex items-center gap-2"><FaEnvelope /> sshapa17@gmail.com</p>
          <p className="flex items-center gap-2 mt-2"><FaPhone /> +880 1610665069</p>
          <p className="flex items-center gap-2 mt-2"><FaLocationArrow /> Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center mt-10 border-t border-white/30 pt-4 text-sm text-gray-300">
        © {new Date().getFullYear()} LifeSecure. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
