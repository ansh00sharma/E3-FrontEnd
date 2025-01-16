'use client'

import { useState } from 'react'
// import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import Link from 'next/link'

export default function EmailLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Logging in with:', { email, password })
    // Here you would typically send this data to your server
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
      <div className=" w-full max-w-md">
        <form onSubmit={handleLogin} className=" bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="mb-4 ">
            <Label htmlFor="email" className="block text-white text-sm font-bold mb-2 px-2">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 text-white border-gray-600 focus:border-white w-full p-2"
              required
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="password" className="block text-white text-sm font-bold mb-2 px-2">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 text-white border-gray-600 focus:border-white w-full p-2"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
            </button>
            <div className='customcard'>checking</div>
            <Link href="/user-register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Not registered? Click Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

