"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ];
  return (
    <nav className="w-full bg-gradient-to-br from-dark via-dark-lighter to-dark-light shadow-lg z-50 sticky top-0">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4 relative">
        <div className="text-xl font-bold text-primary select-none flex-1 text-center sm:text-left">RoastMyEssay</div>
        {/* Hamburger for mobile */}
        <button
          className="sm:hidden text-2xl text-primary focus:outline-none ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        {/* Desktop nav */}
        <ul className="hidden sm:flex gap-6 text-lg font-semibold ml-4">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link href={link.href} legacyBehavior>
                <a className={`px-3 py-1 rounded transition-colors duration-200 
                  ${pathname === link.href 
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md underline' 
                    : 'text-gray-200 hover:text-primary hover:underline'}
                `}>{link.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile dropdown */}
      {menuOpen && (
        <ul className="sm:hidden flex flex-col gap-2 px-6 pb-4 bg-gradient-to-br from-dark via-dark-lighter to-dark-light shadow-lg animate-fade-in-down">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link href={link.href} legacyBehavior>
                <a
                  className={`block px-3 py-2 rounded transition-colors duration-200 text-lg font-semibold
                    ${pathname === link.href 
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md underline' 
                      : 'text-gray-200 hover:text-primary hover:underline'}
                  `}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
} 