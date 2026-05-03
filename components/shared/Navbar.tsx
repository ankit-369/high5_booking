"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "HOME",       href: "/" },
  { label: "ABOUT US",   href: "/#about" },
  { label: "SERVICES",   href: "/#services" },
  { label: "CONTACT US", href: "/#contact" },
];


function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-40" style={{ backgroundColor: "#0B0C2A" }}>

      {/* ── Main bar ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.high5performance.in/wp-content/uploads/2021/12/Logo-Guidelines-18.png"
            alt="High5 Performance"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Center nav — hidden on mobile */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-white text-xs font-semibold tracking-wider uppercase
                           relative after:absolute after:left-0 after:-bottom-0.5
                           after:h-px after:w-0 after:bg-[#FF4F3C]
                           hover:text-[#FF4F3C] hover:after:w-full
                           after:transition-all after:duration-200 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions — hidden on mobile */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>

          <Link
            href="/book/trial"
            className="ml-2 px-4 py-2 rounded-full text-white text-xs font-bold
                       tracking-wide uppercase whitespace-nowrap
                       hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#7AC143" }}
          >
            Book Your Trial Session
          </Link>
        </div>

        {/* Hamburger — visible on mobile */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden text-white p-1 rounded focus:outline-none"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile slide-down menu ─────────────────────────────────────────── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
                    ${mobileOpen ? "max-h-96 border-t border-white/10" : "max-h-0"}`}
        style={{ backgroundColor: "#0B0C2A" }}
      >
        <ul className="px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 text-white text-sm font-semibold tracking-wider
                           uppercase border-b border-white/10 hover:text-[#FF4F3C]
                           transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-3 pb-1 flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </li>
          <li className="pt-1 pb-3">
            <Link
              href="/book/trial"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-4 py-2.5 rounded-full text-white
                         text-xs font-bold tracking-wide uppercase hover:opacity-90
                         transition-opacity"
              style={{ backgroundColor: "#7AC143" }}
            >
              Book Your Trial Session
            </Link>
          </li>
        </ul>
      </div>

    </nav>
  );
}
