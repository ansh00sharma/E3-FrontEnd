'use client'

import { useState } from 'react'
import Link from 'next/link'
import {Button} from "@nextui-org/react";
import { FaArrowRight } from 'react-icons/fa';
// import { Button } from '@/ui/button'
import { ChevronLeft, ChevronRight, Trophy, Users, BarChart } from 'lucide-react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`bg-white shadow-sm transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4">
        <Button radius="lg" variant="bordered" size="md" 
        onPress={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}>
          {isOpen ? <ChevronLeft /> : <ChevronRight />}</Button>
      </div>
      <nav className="mt-5">
        <Link href="/top-performers" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
          <Trophy className="h-5 w-5" />
          {isOpen && <span className="ml-2">Top Performers</span>}
        </Link>
        <Link href="/all-students" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
          <Users className="h-5 w-5" />
          {isOpen && <span className="ml-2">All Students</span>}
        </Link>
        <Link href="/statistics" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
          <BarChart className="h-5 w-5" />
          {isOpen && <span className="ml-2">Statistics</span>}
        </Link>
      </nav>
    </div>
  )
}

