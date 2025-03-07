"use client";
import Image from "next/image";
import "../../styles/globals.css";
import defaultUserImage from "../images/default_user_image.webp";
import { Dispatch, SetStateAction, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useAuth } from "@/lib/authProvider"

type NavItem = {
  label: string;
  value?: string; // For navigation
  onClick?: () => void; // For actions like logout
};

type Props = {
  isCollapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export default function ToggleBar({isCollapsed,setCollapsed,}: Props) {
  const [selectedTab, setSelectedTab] = useState<string>("");
  const selectedTabClass = (item: string) => {
    if (selectedTab === item) {
      return "bg-gray-100";
      }
    return "";
    };
    const { user, logout,selectedAvatar } = useAuth(); 
    console.log("user : ",user)
    const NavList: NavItem[] = [
      { label: "Profile", value: "/userDashboard/userProfile" },
      { label: "Subscribed Services", value: "#" },
      { label: "Activity", value: "/userDashboard/userActivity" },
      { label: "Contact Us", value: "#" },
      { label: "Sign Out", onClick: logout }, // Handles logout dynamically
    ];
  return (
    <nav className={`bg-white h-full flex flex-col gap-1 border-r border-slate-100 relative ${isCollapsed ? "w-[2%]" : "w-[17%]"}`}>
      <span className="border border-gray-400 rounded-md absolute top-5 -right-2 bg-white p-0.5 font-bold text-xs cursor-pointer" onClick={() => setCollapsed(!isCollapsed)}>
        {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
      </span>
      {!isCollapsed ? (
        <>
          <div className="logo text-2xl font-bold text-center pt-6 flex items-center justify-center">
          {user?.name}
          </div>
          <div className="user flex items-center justify-center flex-col gap-4 border-b border-slate-200 py-4">
            <Image
              className="w-24 rounded-full shadow-xl unoptimized"
              alt="User Image"
              src={defaultUserImage}
            />
            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-sm">{user?.gender}</span>
            </div>
            <div className="text-sm text-slate-400 text-center flex flex-col gap-1">
              <div className="font-semibold text-slate-500">{user?.phone_number}</div>
              <div className="font-semibold text-slate-500">{user?.email}</div>
            </div>
          </div>
          <ul className="px-6 space-y-2">
            {NavList?.map((item) => (
              <li key={item.label} onClick={() => setSelectedTab(item.label)}>
                {item.value ? (
                  <a
                    href={item.value}
                    className="block px-4 py-2.5 text-slate-800 font-semibold hover:bg-emerald-950 hover:text-white rounded-lg"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="w-full text-left block px-4 py-2.5 text-red-600 font-semibold hover:bg-red-500 hover:text-white rounded-lg"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </nav>
  );
}
