'use client'

import { useState,useEffect } from 'react'
import { useRouter} from 'next/navigation'
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import Image from "next/image";
import avatar1 from "../images/avatar1.webp"
import avatar2 from "../images/avatar2.webp"
import avatar3 from "../images/avatar3.webp"
import avatar4 from "../images/avatar4.webp"
import defaultUserImage from "../images/default_user_image.webp";
import ToggleBar from "./ToggleBar";
import { useAuth } from "@/lib/authProvider"
// import { DatabaseIcon } from 'lucide-react'
const avatars = [
  { src: avatar1, name: "avatar1" },
  { src: avatar2, name: "avatar2" },
  { src: avatar3, name: "avatar3" },
  { src: avatar4, name: "avatar4" },
];

export default function UserProfile() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirm_password] = useState('')
  const [phone_number, setContact] = useState('')
  const [genderValue, setGender] = useState('')
  const [name, setNickname] = useState('')
  const router = useRouter();
  const [isvalid, setValid] = useState(true)
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isCollapsed, setCollapsed] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ message: string; color: string } | null>(null);
  const { user } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
 
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
  
  useEffect(() => {
    const storedAvatar = sessionStorage.getItem("selectedAvatar");
    if (!storedAvatar) {
      sessionStorage.setItem("selectedAvatar", "avatar1"); // Set default to avatar1
      setSelectedAvatar("avatar1");
    } else {
      setSelectedAvatar(storedAvatar);
    }
  }, []);

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    sessionStorage.setItem("selectedAvatar", avatar);
  };
  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center">
        <div id="body" className="bg-slate-50 h-full w-full flex">
            <ToggleBar isCollapsed={isCollapsed} setCollapsed={setCollapsed} />
            <div className={`right flex flex-col p-6 ${isCollapsed ? "w-[98%]" : "w-[83%]"}`}>
            <form onSubmit={handleLogin} className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 border border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
                <div className="grid grid-cols-2 gap-6">
                    {/* Left Side Inputs */}
                    <div>
                      <div className="h-[100px]">
                          <Label htmlFor="name" className="block text-white text-sm font-bold mb-2 px-2" >
                            Name
                          </Label>
                          <div className='pb-5'>
                            <Input type="text" id="name" placeholder="Set a Nickname for your Profile" value={user?.name} onChange={(e) => setNickname(e.target.value)} className="bg-gray-700 text-white border-gray-600 focus:border-white w-full p-2" required/>
                          </div>
                      </div>
                      <div className="h-[100px]">
                          <Label htmlFor="name" className="block text-white text-sm font-bold mb-2 px-2" >
                            Email
                          </Label>
                          <div className='pb-5'>
                            <Input type="text" id="name" placeholder={user?.email} className="bg-gray-700 text-white border-gray-600 focus:border-white w-full p-2" disabled/>
                          </div>
                      </div>
                      <div className="h-[100px]">
                          <Label htmlFor="name" className="block text-white text-sm font-bold px-2" >
                            Profile Picture
                          </Label>
                      </div>    
                      <div className="h-[100px] grid grid-cols-4 gap-4">
                          {avatars.map((avatar, index) => (
                              <div
                              key={index}
                              className={`w-24 h-24 rounded-full shadow-xl cursor-pointer border-4 ${
                                selectedAvatar === avatar.name ? "border-blue-500" : "border-transparent"
                              }`}
                              onClick={() => handleAvatarSelect(avatar.name)}
                              > 
                              <Image
                                className="w-full h-full object-cover rounded-full"
                                alt={`Avatar ${index + 1}`}
                                src={avatar.src}
                              />
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Right Side Inputs */}
                    <div>
                      
                      <div className="h-[100px]">
                          <Label htmlFor="phone_number" className="block text-white text-sm font-bold mb-2 px-2" >
                            Contact
                          </Label>
                          <div className='pb-5'>
                            <Input type="number" id="phone_number" placeholder="For Verification" value={user?.phone_number} onChange={(e) => setContact(e.target.value)} className="bg-gray-700 text-white border-gray-600 focus:border-white w-full p-2" required/>
                          </div>
                      </div>
                      <div className="h-[100px]">
                          <Label htmlFor="gender" className="block text-white text-sm font-bold mb-2 px-2" >
                            Gender
                          </Label>
                          <div className='pb-5'>
                            <Input type="text" id="gender" placeholder="We are Cool with Everything" value={user?.gender} onChange={(e) => setGender(e.target.value)} className="bg-gray-700 text-white border-gray-600 focus:border-white w-full p-2" required/>
                          </div>
                      </div>
                      <div className="h-[100px] mt-16 flex flex-col items-center justify-center">
                          <Label htmlFor="name" className="block text-white text-sm font-bold mb-2 px-2" >
                            Face Recognition Picture
                          </Label>
                          <Image className="w-48 rounded-full shadow-xl" alt="Profile Image" src={defaultUserImage}/>
                      </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Save
                  </button>
                </div>
            </form>
            </div>
        </div>
    </div>          
    
  )
}
