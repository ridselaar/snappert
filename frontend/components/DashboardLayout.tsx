'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold">
            SnapMemories
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/dashboard/history" className="text-gray-600 hover:text-gray-900">
              History
            </Link>
            <Link href="/dashboard/settings" className="text-gray-600 hover:text-gray-900">
              Settings
            </Link>
            <button 
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
      
      <main className="py-12 px-4">
        {children}
      </main>
    </div>
  );
}
