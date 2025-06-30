"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname();
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ];
  return (
    <nav className="w-full flex justify-center py-4 bg-gradient-to-br from-dark via-dark-lighter to-dark-light shadow-lg z-50 sticky top-0">
      <ul className="flex gap-6 text-lg font-semibold">
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
    </nav>
  )
} 