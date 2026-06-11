import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaUser,
  FaSignInAlt,
} from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const router = useRouter();
  const handleNav = () => setNav(!nav);

  // Scroll logic (Apple style)
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // background blur effect
      setScrolled(currentScrollY > 50);

      // hide/show logic
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true); // scrolling down → hide
      } else {
        setHidden(false); // scrolling up → show
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "About", href: "/#aboutus", icon: <FaInfoCircle /> },
    { name: "News", href: "/news", icon: <MdNotifications /> },
    { name: "Contact", href: "/#contact", icon: <FaEnvelope /> },
    { name: "Buy", href: "/buy", icon: <AiOutlineShoppingCart /> },
  ];

  const isActive = (path) => router.pathname === path;

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-14 h-16">

          {/* MOBILE HAMBURGER */}
          <button
            onClick={handleNav}
            className="md:hidden text-2xl"
          >
            <AiOutlineMenu />
          </button>

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3 ml-auto md:ml-0"
          >
            <Image
              src="/assets/logo/sm.jpg"
              width={42}
              height={42}
              alt="logo"
              className="rounded-xl"
            />
            <span className="hidden sm:block font-semibold text-[#134e4a]">
              Shareholder System
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={`flex items-center gap-1 transition ${
                  isActive(link.href)
                    ? "text-[#134e4a] font-bold"
                    : "text-gray-600 hover:text-[#134e4a]"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            <Link
              href="/login"
              className="flex items-center gap-2 bg-[#134e4a] text-white px-4 py-2 rounded-xl hover:bg-[#0f3d3a] transition"
            >
              <FaUser />
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* OVERLAY */}
      {nav && (
        <div
          onClick={handleNav}
          className="fixed inset-0 bg-black/40 md:hidden z-[90]"
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 left-0 h-full w-[75%] sm:w-[60%] bg-white shadow-2xl p-6 z-[100] transform transition-transform duration-300 md:hidden ${
          nav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <Image
            src="/assets/logo/sm.jpg"
            width={40}
            height={40}
            alt="logo"
            className="rounded-lg"
          />

          <button onClick={handleNav} className="text-2xl">
            <AiOutlineClose />
          </button>
        </div>

        <div className="flex flex-col gap-6 text-sm font-medium">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              onClick={handleNav}
              className={`flex items-center gap-3 ${
                isActive(link.href)
                  ? "text-[#134e4a] font-bold"
                  : "text-gray-700"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          <Link
            href="/login"
            onClick={handleNav}
            className="flex items-center gap-2 bg-[#134e4a] text-white px-4 py-2 rounded-lg w-fit mt-4"
          >
            <FaSignInAlt />
            Login
          </Link>
        </div>
      </div>
    </>
  );
}