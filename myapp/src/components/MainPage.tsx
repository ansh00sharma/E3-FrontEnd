'use client';
import '../../styles/globals.css';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import { useRouter } from 'next/navigation';

export default function MainPage() {
    const router = useRouter();
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <nav className="flex justify-between items-center p-4 bg-gray-800"></nav>
        <h1>This is Main Page</h1>
      </div>
    );
  }
  
  