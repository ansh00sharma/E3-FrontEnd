"use client"

import { useState, useRef, useEffect } from "react"


export default function S2Page() {
  const [text, setText] = useState("Click the start button and test our model")
  const [isListening, setIsListening] = useState(false)
  const textAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight
    }
  }, [textAreaRef]) // Updated dependency

  const handleStart = () => {
    setIsListening(true)
    // Simulating text being added over time
    const interval = setInterval(() => {
      setText((prev) => prev + "\nNew text added " + new Date().toLocaleTimeString())
    }, 2000)

    // Stop after 10 seconds for this example
    setTimeout(() => {
      clearInterval(interval)
      setIsListening(false)
    }, 10000)
  }

  const handleStop = () => {
    setIsListening(false)
  }

  return (
    <div className="flex h-screen">
      {/* Left part: Scrollable text area */}
      <div className="w-1/2 bg-black p-4 overflow-auto" ref={textAreaRef}>
        <pre className="text-white whitespace-pre-wrap">{text}</pre>
      </div>

      {/* Right part: Audio listener and buttons */}
      <div className="w-1/2 bg-gradient-to-br from-red-500 to-red-700 p-4 flex flex-col justify-between">
        <div className="flex-grow flex items-center justify-center">
          <div className={`w-32 h-32 rounded-full ${isListening ? "animate-pulse bg-red-600" : "bg-red-800"}`}></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleStart}
            disabled={isListening}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Start
          </button>
          <button
            onClick={handleStop}
            disabled={!isListening}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  )
}

