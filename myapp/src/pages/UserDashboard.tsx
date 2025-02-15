'use client'

import '../index.css'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image';
import defaultUserImage from '../images/default_user_image.webp'
import { useAuth } from "@/lib/authProvider"
import { useEffect, useState } from "react";
import ToggleBar from "./ToggleBar";

export default function UserDashboard() {
  const [isCollapsed, setCollapsed] = useState<boolean>(false);

    return(
       <div className="h-screen w-screen overflow-hidden flex items-center justify-center">
          <div id="body" className="bg-slate-50 h-full w-full flex">
            <ToggleBar isCollapsed={isCollapsed} setCollapsed={setCollapsed} />
            <div className={`right flex flex-col p-6 ${isCollapsed ? "w-[98%]" : "w-[83%]"}`}>
            
            </div>
          </div>
        </div>
    )
}