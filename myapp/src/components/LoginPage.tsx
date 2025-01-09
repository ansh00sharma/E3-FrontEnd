'use client'

import Link from 'next/link'
import  Button  from "@/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/card"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <nav className="flex justify-between items-center p-4 bg-gray-800">
        <Link href="/">
          <span className="text-xl font-bold">GenAiLand</span>
        </Link>
        <div className="space-x-4">
            <button className="button">
                Explore
            </button>
            <button className="button">
                Register
            </button>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Login Options</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <LoginCard title="Face Recognition" description="Use our Real time Face Recognition system to quickly login without need of remembering any Usernam or Passwords." />
          <LoginCard title="Registered Email" description="Login through your Registered Email address and Password in case any other Service is unavailable." />
          <LoginCard title="Registered Number" description="You can also login via your registered Contact Number, Authenticate by OTP." />
        </div>
      </main>
    </div>
  )
}

function LoginCard({ title, description }: { title: string, description: string }) {
  return (
    <Card className="w-full max-w-sm bg-gray-900 border-gray-400 p-4 rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-2 pb-2">{description}</p>
        <Link href={title.toLowerCase() === 'face recognition' ? '/faceLogin' : '#'}>
          <button className="button">
            via {title}
          </button>
        </Link>
      </CardContent>
    </Card>
  )
}


