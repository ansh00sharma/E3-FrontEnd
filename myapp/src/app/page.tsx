'use client'

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import AnimatedText from '@/components/AnimatedText'

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-hidden">
          <div className="container mx-auto px-6 py-8 h-full">
            <AnimatedText />
          </div>
        </main>
      </div>
    </div>
  )
}
