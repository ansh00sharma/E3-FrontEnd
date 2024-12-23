'use client'

import '@/app/globals.css'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to GenAiLand
      </motion.h1>
      <motion.p 
        className="text-lg md:text-xl text-center max-w-3xl mb-10 leading-relaxed text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Embark on a journey through the cutting-edge realm of Artificial Intelligence and Machine Learning. 
        At GenAiLand, we're pushing the boundaries of what's possible. From sophisticated face recognition 
        systems that enhance security to nuanced sentiment analysis that decodes human emotions, our 
        technologies are reshaping industries. Dive into the world of Natural Language Processing, where 
        machines understand and generate human language with unprecedented accuracy. Explore object 
        detection algorithms that are revolutionizing autonomous vehicles and surveillance systems. 
        Whether it's predictive analytics forecasting market trends or recommendation systems personalizing 
        user experiences, we're at the forefront of AI innovation.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
    <Link href="/login">
        <button className="button">
            Get Started
        </button>
    </Link>
      </motion.div>
    </div>
  )
}



