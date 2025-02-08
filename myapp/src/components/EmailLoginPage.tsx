"use client";
import { useEffect, useState } from "react";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import Link from "next/link";
import "../../styles/globals.css";
import { Card, CardContent } from "@/ui/card";
import { useRouter } from "next/navigation";

export default function EmailLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<{ message: string; color: string } | null>(
    null
  );
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    console.log(JSON.stringify(payload));
    try {
      const response = await fetch("http://localhost:8080/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
        // handle token
        sessionStorage.setItem("accessToken", data.access_token);
        
        setAlert({ message: data.message, color: "green" });
        setTimeout(() => {
          console.log("Redirecting to /userPannelPage...");
          router.push("/userPannelPage"); // Redirect after a short delay
        }, 1500);
      } else {
        // Error from backend - show message
        setAlert({ message: data.message, color: "red" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // alert("Unable to connect to the server. Please try again later.");
    }
  };

  useEffect(() => {
    if (alert?.message) {
      window.alert(alert?.message);
    }
  }, [alert?.message]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
      <div className="w-[600px]">
        <Card className="w-full h-[400px] bg-gray-900 border-gray-400 p-0.5 rounded-lg">
          <div className="rounded-xl bg-black w-full h-full">
            <CardContent className="w-full h-full p-0">
              <form
                onSubmit={handleLogin}
                className=" bg-gray-800 w-full h-full shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-700"
              >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <div className="mb-4 ">
                  <Label
                    htmlFor="email"
                    className="block text-white text-sm font-bold mb-2 px-2"
                  >
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-700 text-white border-gray-600 focus:border-white w-full p-2"
                  />
                </div>
                <div className="mb-6">
                  <Label
                    htmlFor="password"
                    className="block text-white text-sm font-bold mb-2 px-2"
                  >
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
                <div className="flex flex-col gap-4 items-center">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Login
                  </button>
                  <span className="flex gap-0.5">
                    <span className="inline-block align-baseline font-bold text-sm text-blue-500">
                      Not registered?
                    </span>
                    <Link
                      href="/user-register"
                      className="inline-block hover:underline align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    >
                      Click Here
                    </Link>
                  </span>
                </div>
              </form>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
