'use client'

import { useState } from 'react'
import { useRouter} from 'next/navigation'
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import Link from 'next/link'
import Alert from "@/ui/alert"
// import { DatabaseIcon } from 'lucide-react'

export default function UserRegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirm_password] = useState('')
  const [phone_number, setContact] = useState('')
  const [genderValue, setGender] = useState('')
  const [name, setNickname] = useState('')
  const router = useRouter();
  const [isvalid, setValid] = useState(true)
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [alert, setAlert] = useState<{ message: string; color: string } | null>(null);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isPasswordMatchchecker = (password:string, confirm_password:string)=>{
    return password === confirm_password;
  }
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let gender = '';
    try{
      if (genderValue === 'Male') {
        gender = 'M';
      } else if (genderValue === 'Female') {
        gender = 'F';
      } else {
        gender = 'O';
      }
      const payload = {
        email,
        password,
        confirm_password,
        name,
        phone_number,
        gender,
      };
      console.log(JSON.stringify(payload))
      const response = await fetch("http://localhost:8080/user/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify(payload)
        
      });
      const data = await response.json();
      console.log(data)
      if (data.status === 201) {
        // Successful login : show alert -> redirect to page
        // handle token
        setAlert({ message: data.message, color: "green" });
        setTimeout(() => {
          console.log("Redirecting to /userPannelPage...");
          router.push("/login"); // Redirect after a short delay
        }, 1500);
      } else {
        // Error from backend - show message
        setAlert({ message: data.message, color: "red" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // alert("Unable to connect to the server. Please try again later.");
    }
}
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newEmail = e.target.value;
  const isEmailValid = isValidEmail(newEmail);
  setValid(isEmailValid);
  setEmail(newEmail);
    };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirm_password(newConfirmPassword);
    setIsPasswordMatch(isPasswordMatchchecker(password, newConfirmPassword));
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center py-8">
  <div className="w-full max-w-4xl">
    <form
      onSubmit={handleLogin}
      className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 border border-gray-700"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* Left Side Inputs */}
        <div>
          <div className="h-[100px]">
            <Label
              htmlFor="email"
              className="block text-white text-sm font-bold mb-2 px-2"
            >
              Email
            </Label>
            <div className='pb-5'>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className="bg-gray-700 text-white border-gray-600 focus:border-white w-full p-2"
                required
              />
              {!isvalid ? (
                  <p className="text-gray-400 text-xs pl-2 pt-2">Email is not Valid</p>
                ) : <p className="text-gray-400 text-xs pl-2 pt-8"></p>}
            </div>
          </div>
          <div className="h-[100px]">
            <Label
              htmlFor="password"
              className="block text-white text-sm font-bold mb-2 px-2"
            >
              Password
            </Label>
            <div className='pb-5'>
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
          </div>
          <div className="h-[100px]">
            <Label
              htmlFor="confirm_password"
              className="block text-white text-sm font-bold mb-2 px-2"
            >
              Confirm Password
            </Label>
            <div className='pb-5'>
              <Input
                type="password"
                id="confirm_password"
                placeholder="Confirm your password"
                value={confirm_password}
                onChange={handlePasswordChange}
                className="bg-gray-700 text-white border-gray-600 focus:border-white w-full p-2"
                required
              />
              {!isPasswordMatch ? (
                  <p className="text-gray-400 text-xs pl-2 pt-2">Passwords Do Not Match</p>
                ) : null}
            </div>
          </div>
        </div>

        {/* Right Side Inputs */}
        <div>
          <div className="h-[100px]">
            <Label
              htmlFor="name"
              className="block text-white text-sm font-bold mb-2 px-2"
            >
              Name
            </Label>
            <div className='pb-5'>
              <Input
                type="text"
                id="name"
                placeholder="Set a Nickname for your Profile"
                value={name}
                onChange={(e) => setNickname(e.target.value)}
                className="bg-gray-700 text-white border-gray-600 focus:border-white w-full p-2"
                required
              />
            </div>
          </div>
          <div className="h-[100px]">
            <Label
              htmlFor="phone_number"
              className="block text-white text-sm font-bold mb-2 px-2"
            >
              Contact
            </Label>
            <div className='pb-5'>
              <Input
                type="number"
                id="phone_number"
                placeholder="For Verification"
                value={phone_number}
                onChange={(e) => setContact(e.target.value)}
                className="bg-gray-700 text-white border-gray-600 focus:border-white w-full p-2"
                required
              />
            </div>
          </div>
          <div className="h-[100px]">
            <Label
              htmlFor="gender"
              className="block text-white text-sm font-bold mb-2 px-2"
            >
              Gender
            </Label>
            <div className='pb-5'>
              <Input
                type="text"
                id="gender"
                placeholder="We are Cool with Everything"
                value={genderValue}
                onChange={(e) => setGender(e.target.value)}
                className="bg-gray-700 text-white border-gray-600 focus:border-white w-full p-2"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
        <Link
          href="/emaillogin"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Already registered? Login Here
        </Link>
      </div>
    </form>
    {alert && <Alert message={alert.message} color={alert.color} />}
  </div>
</div>
  )
}
