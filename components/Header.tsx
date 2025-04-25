// components/Navbar.jsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Handle scroll behavior - disable when mobile menu is open
  useEffect(() => {
    if (isOpen) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        // Scrolling up or near top - show navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isOpen]);

  // Close the menu when a link is clicked or route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Main Navbar */}
      <nav className={`bg-white shadow-lg sticky top-0 z-30 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-32">
            {/* Logo */}
            <div className="flex-shrink-0 text-center font-serif">
              <Link href="/" className="text-xl font-bold text-[#b32837]">
                The <br />
                Creative <br />
                Journal
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <NavLink href="/" text="Home" />
              <NavLink href="/about" text="About" />
              <NavLink href="/services" text="Services" />
              <NavLink href="/contact" text="Contact" />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-800 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Separate from sticky nav */}
      <div
        className={`mobile-menu md:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-between h-28 px-4 border-b">
          <Link href="/" className="text-xl font-bold text-[#b32837] font-serif">
            The <br />
            Creative <br />
            Journal
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-800 focus:outline-none"
            aria-label="Close menu"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-4 py-2 flex flex-col space-y-4">
          <MobileNavLink href="/" text="Home" />
          <MobileNavLink href="/about" text="About" />
          <MobileNavLink href="/services" text="Services" />
          <MobileNavLink href="/contact" text="Contact" />
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500/80 bg-opacity-50 z-40 md:hidden"></div>
      )}
    </>
  );
}

// Component for desktop navigation links
function NavLink({ href, text }: { href: string; text: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${
        isActive ? 'text-[#b32837] border-b-2 border-[#b32837]' : 'text-gray-800 hover:text-pink-300'
      } px-3 py-2 text-sm font-medium`}
    >
      {text}
    </Link>
  );
}

// Component for mobile navigation links
function MobileNavLink({ href, text }: { href: string; text: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${
        isActive ? 'bg-pink-50 text-[#b32837]' : 'text-gray-800 hover:bg-gray-100'
      } block px-4 py-2 rounded-md text-base font-medium`}
    >
      {text}
    </Link>
  );
}