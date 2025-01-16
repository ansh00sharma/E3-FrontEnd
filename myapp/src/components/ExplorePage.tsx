'use client'

import { useState } from 'react'
// import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface ExploreItem {
  title: string
  content: string
  buttonText: string
}

const exploreItems: ExploreItem[] = [
  { title: "AI Chatbots", content: "Develop advanced conversational AI for customer support and engagement.", buttonText: "Learn More" },
  { title: "Computer Vision", content: "Cutting-edge image and video analysis for various applications.", buttonText: "Discover" },
  { title: "Natural Language Processing", content: "Advanced text analysis and generation capabilities.", buttonText: "Explore" },
  { title: "Predictive Analytics", content: "Leverage AI for accurate forecasting and decision-making.", buttonText: "Get Started" },
  { title: "Robotics AI", content: "Intelligent systems for autonomous robots and machinery.", buttonText: "See Demo" },
  { title: "AI in Healthcare", content: "Revolutionizing diagnostics and patient care with AI.", buttonText: "Read More" },
  { title: "AI Ethics", content: "Ensuring responsible and ethical AI development and deployment.", buttonText: "Join Discussion" },
  { title: "Edge AI", content: "Bringing AI capabilities to edge devices for real-time processing.", buttonText: "Try Now" },
  { title: "AI in Finance", content: "Transforming financial services with intelligent algorithms.", buttonText: "Learn More" },
]

export default function ExplorePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <span className="text-xl font-bold">GenAiLand</span>
          </Link>
          <div className="space-x-4">
            <button className="text-white hover:text-gray-300" onClick={() => router.push('/login')}>
              Login
            </button>
            <button  className="text-white hover:text-gray-300">
              Register
            </button>
          </div>
        </div>
      </nav>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Things we are working on...</h1>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-30 animate-gradient-xy"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {exploreItems.map((item, index) => (
                <ExploreCard key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExploreCard({ title, content, buttonText }: ExploreItem) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-6 h-full flex flex-col justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-gray-600 mb-4">{content}</p>
            <button className="w-full">{buttonText}</button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

