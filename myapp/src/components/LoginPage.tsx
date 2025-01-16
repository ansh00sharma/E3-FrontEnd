'use client'
import '../../styles/globals.css'
import Link from 'next/link'
import  Button  from "@/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/card"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <nav className="flex justify-between items-center p-4 bg-gray-800">
        <Link href="/">
          <span className="text-xl font-bold">GenAiLand</span>
        </Link>
        <div className="space-x-4">
            <button className="button" onClick={() => router.push('/explore')}>
                Explore
            </button>
            <button className="button" onClick={() => router.push('/user-register')}>
                Register
            </button>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Login Options</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <LoginCard title="Face Recognition" description="Use our Real time Face Recognition system to quickly login without need of remembering any Usernam or Passwords." onClick={() => router.push('/facelogin')}/>
          <LoginCard title="Registered Email" description="Login through your Registered Email address and Password in case any other Service is unavailable." onClick={() => router.push('/emaillogin')}/>
          <LoginCard title="Registered Number" description="You can also login via your registered Contact Number, Authenticate by OTP." onClick={() => router.push('/face-login')}/>
        </div>
      </main>
    </div>
  )
}

function LoginCard({ title, description,onClick }: { title: string, description: string, onClick: () => void}) {
  return (
    <Card className="card w-full max-w-sm bg-gray-900 border-gray-400 p-4 rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-2 pb-2">{description}</p>
          <button className="button" onClick={onClick}>
            via {title}
          </button>
      </CardContent>
    </Card>
  )
}



