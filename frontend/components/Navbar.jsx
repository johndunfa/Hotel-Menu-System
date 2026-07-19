'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-amber-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Boku Grand Hotel
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-amber-200 transition">Home</Link>
            <Link href="/menu" className="hover:text-amber-200 transition">Menu</Link>
            <Link href="/admin/login" className="hover:text-amber-200 transition">Admin</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-3">
            <Link href="/" className="block hover:text-amber-200 transition">Home</Link>
            <Link href="/menu" className="block hover:text-amber-200 transition">Menu</Link>
            <Link href="/admin/login" className="block hover:text-amber-200 transition">Admin</Link>
          </div>
        )}
      </div>
    </nav>
  );
}