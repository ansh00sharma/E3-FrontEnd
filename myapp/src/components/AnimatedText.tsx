'use client'
import { useEffect, useRef, useState } from 'react'

export default function AnimatedText() {
  const [text, setText] = useState('')
  const fullText = "Welcome to StudentBoard"
  const textRef = useRef('') // Use a ref to track the string being typed

  useEffect(() => {
    let i = 0
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        textRef.current += fullText.charAt(i) // Append the character to the ref
        setText(textRef.current) // Update the state with the full value
        i++
      } else {
        clearInterval(typingEffect)
      }
    }, 100)

    return () => clearInterval(typingEffect)
  }, [])

  return (
    <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800">
        {text}
        <span className="animate-blink"></span>
      </h1>
    </div>
  )
}
