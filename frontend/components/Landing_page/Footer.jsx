import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavLogo from "../../public/assets/logo/sm.jpg";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from "react-icons/fa";
import axios from "axios";

export default function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = async () => {
    try {
      await axios.post("http://localhost:5000/api/subscribe", { email });
      alert("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      alert("Already subscribed or error");
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative text-gray-300 bg-gray-900 dark:bg-black overflow-hidden">

      {/* 🌈 Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#134e4a] via-gray-900 to-black opacity-60 bg-gradient-animate"></div>

      <div className="relative z-10">

        {/* MAIN CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

          {/* LOGO + DESCRIPTION */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={NavLogo}
                alt="logo"
                width={45}
                height={45}
                className="rounded-lg"
              />
              <h1 className="text-white font-bold text-lg">
                Share Management System
              </h1>
            </Link>

            <p className="text-sm text-gray-300 mt-4">
              A modern platform for managing shareholders efficiently and securely.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-5 text-gray-400">
              <FaGithub className="hover:text-white cursor-pointer transition" />
              <FaLinkedin className="hover:text-white cursor-pointer transition" />
              <FaTwitter className="hover:text-white cursor-pointer transition" />
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h2 className="text-white font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#aboutus">About</Link></li>
              <li><Link href="/news">News</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
              <li><Link href="/login">Login</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h2 className="text-white font-semibold mb-4">
              Stay Updated
            </h2>

            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get latest updates.
            </p>

            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full px-3 py-2 rounded-l-lg bg-gray-800 text-white outline-none"
              />
              <button
                onClick={subscribe}
                className="bg-[#134e4a] px-4 py-2 rounded-r-lg text-white hover:bg-[#0f3d3a]"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-800 text-center py-6 text-sm text-gray-400">
          © 2023 Shareholder Management System. All rights reserved.
        </div>
      </div>

      {/* 🔝 BACK TO TOP BUTTON */}
      <button
        onClick={scrollTop}
        className="fixed bottom-6 right-6 bg-[#134e4a] text-white p-3 rounded-full shadow-lg hover:scale-105 transition z-50"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
}