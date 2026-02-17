'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'コンセプト', href: '#concept' },
    { label: 'プログラム', href: '#programs' },
    { label: '特長', href: '#features' },
    { label: 'お問い合わせ', href: '#contact' },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white/90 backdrop-blur-md">
      <div className="container-max flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg">
            <span className="text-xl font-bold text-white">O</span>
          </div>
          <span className="text-xl font-bold text-gray-900">
            Ousia<span className="gradient-text">School</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full gradient-bg px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:shadow-xl hover:shadow-primary-500/30"
          >
            無料相談
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
          aria-label="メニュー"
        >
          <svg
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="border-t border-gray-100 bg-white px-4 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium text-gray-600 transition-colors hover:text-primary-600"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 rounded-full gradient-bg px-6 py-3 text-center text-sm font-semibold text-white"
            >
              無料相談
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
