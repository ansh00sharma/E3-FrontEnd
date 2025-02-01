'use client';
import '../../styles/globals.css';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <nav className="flex justify-between items-center p-4 bg-gray-800">
        <Link href="/">
          <span className="text-xl font-bold">GenAiLand</span>
        </Link>
        <div className="space-x-4">
          <button className="button" onClick={() => router.push('/explore')}>
            Explore
          </button>
          <button
            className="button"
            onClick={() => router.push('/user-register')}
          >
            Register
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 h-[85%]">
        <h1 className="text-3xl font-bold text-center h-[10%] flex items-end justify-center">Login Options</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 h-[90%] overflow-auto">
          <LoginCard
            title="Face Recognition"
            description="Use our Real time Face Recognition system to quickly login without need of remembering any Usernam or Passwords."
            onClick={() => router.push('/facelogin')}
          />
          <LoginCard
            title="Registered Email"
            description="Login through your Registered Email address and Password in case any other Service is unavailable."
            onClick={() => router.push('/emaillogin')}
          />
          <LoginCard
            title="Registered Number"
            description="You can also login via your registered Contact Number, Authenticate by OTP."
            onClick={() => router.push('/registeredNumberLogin')}
          />
        </div>
      </main>
    </div>
  );
}

function LoginCard({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <Card className="card w-full max-w-sm h-[300px] bg-gray-900 border-gray-400 p-0.5 rounded-lg">
      <div className="w-full h-full bg-black p-1 rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-2 pb-2 h-[120px]">{description}</p>
        <div className="w-full flex items-center justify-center">
        <button className="button hover:bg-white hover:text-black" onClick={onClick}>
          via {title}
        </button>
        </div>
      </CardContent>
      </div>
    </Card>
  );
}
