import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SnapMemories - Secure Snapchat Memory Backup',
  description: 'Safely backup all your Snapchat memories to your preferred cloud storage with enterprise-grade security.',
  keywords: 'snapchat, memories, backup, secure, cloud storage',
  authors: [{ name: 'SnapMemories' }],
  openGraph: {
    title: 'SnapMemories - Secure Snapchat Memory Backup',
    description: 'Safely backup all your Snapchat memories',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {children}
      </body>
    </html>
  );
}
