'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export default function PricingCard({ name, price, features, popular = false }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative bg-white p-8 rounded-2xl ${
        popular ? 'ring-2 ring-gray-900 shadow-xl' : 'shadow-sm'
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-full text-sm">
          Most Popular
        </span>
      )}
      
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">€{price}</span>
        <span className="text-gray-600 text-sm block">ex VAT / one-time</span>
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link 
        href={`/signup?plan=${name.toLowerCase()}`}
        className={`block text-center py-3 px-6 rounded-full font-medium transition-all ${
          popular 
            ? 'bg-gray-900 text-white hover:bg-gray-800' 
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Choose {name}
      </Link>
    </motion.div>
  );
}
