"use client";
import Image from "next/image";
import "../../styles/globals.css";
import defaultUserImage from "../images/default_user_image.webp";
import { useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const NavList = [
  { label: "Profile", value: "#" },
  { label: "Subscribed Services", value: "#" },
  { label: "Activity", value: "#" },
  { label: "Contact Us", value: "#" },
  { label: "Sign Out", value: "#" },
];

export default function NavBar() {
  const [isCollapseNav, setCollapseNav] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const selectedTabClass = (item: string) => {
    if (selectedTab === item) {
      return "bg-gray-100";
    }
    return "";
  };
  return (
    <nav
      className={`bg-white h-full flex flex-col gap-1 border-r border-slate-100 relative ${
        isCollapseNav ? "w-6" : "w-80"
      }`}
    >
      <span
        className="border border-gray-400 rounded-md absolute top-5 -right-2 bg-white p-0.5 font-bold text-xs cursor-pointer"
        onClick={() => setCollapseNav(!isCollapseNav)}
      >
        {isCollapseNav ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
      </span>
      {!isCollapseNav ? (
        <>
          <div className="logo text-2xl font-bold text-center pt-6 flex items-center justify-center">
            Name
          </div>
          <div className="user flex items-center justify-center flex-col gap-4 border-b border-slate-200 py-4">
            <Image
              className="w-24 rounded-full shadow-xl"
              alt="User Image"
              src={defaultUserImage}
            />
            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-sm">Male</span>
            </div>
            <div className="text-sm text-slate-400 text-center flex flex-col gap-1">
              <div className="font-semibold text-slate-500">7303638798</div>
              <div className="font-semibold text-slate-500">sharma999ansh</div>
            </div>
          </div>
          <ul className="px-6 space-y-2">
            {NavList?.map((item) => (
              <li key={item.label} onClick={() => setSelectedTab(item.label)}>
                <a
                  className={`block px-4 py-2.5 text-slate-800 font-semibold hover:bg-emerald-950 hover:text-white rounded-lg ${selectedTabClass(
                    item.label
                  )}`}
                  href={item.value}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </nav>
  );
}
