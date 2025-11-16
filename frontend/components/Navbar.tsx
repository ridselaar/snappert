'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm' : ''
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          SnapMemories
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
            How it Works
          </Link>
          <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
            Pricing
          </Link>
          <Link href="/security" className="text-gray-600 hover:text-gray-900 transition-colors">
            Security
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
            Sign In
          </Link>
          <Link href="/signup" className="button-primary">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
