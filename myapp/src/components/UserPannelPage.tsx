'use client'

import '../../styles/globals.css'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image';
import defaultUserImage from '../images/default_user_image.webp'

export default function UserPannelPage() {
    return(
        <div className="h-screen w-screen overflow-hidden flex items-center justify-center">
  <div id="body" className="bg-slate-50 h-full w-full flex">
    <nav className="bg-white w-80 h-full flex flex-col gap-10 border-r border-slate-100">
      <div className="logo text-2xl font-bold text-center h-16 flex items-center justify-center">
        Name
      </div>
      <div className="user flex items-center justify-center flex-col gap-4 border-b border-slate-200 py-4">
        <Image className="w-24 rounded-full shadow-xl" alt="User Image" src={defaultUserImage}/>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-lg text-emerald-700">User Name</span>
          <span className="text-slate-400 text-sm">Male</span>
        </div>
        <div className="text-sm text-slate-400 text-center">
          <span className="font-semibold text-slate-500">
            7303638798
          </span>{' '}
          30
        </div>
      </div>
      <ul className="px-6 space-y-2">
        <li>
          <a
            className="block px-4 py-2.5 text-slate-800 font-semibold hover:bg-emerald-950 hover:text-white rounded-lg"
            href="#"
          >
            Profile
          </a>
        </li>
        <li>
          <a
            className="block px-4 py-2.5 text-slate-800 font-semibold hover:bg-emerald-950 hover:text-white rounded-lg"
            href="#"
          >
            Subscribed Services
          </a>
        </li>
        <li>
          <a
            className="block px-4 py-2.5 text-slate-800 font-semibold hover:bg-emerald-950 hover:text-white rounded-lg"
            href="#"
          >
            Logs
          </a>
        </li>
        <li /*className="bg-slate-50 pb-2 rounded-lg border"*/>
          <a
            className="block px-4 py-2.5 text-slate-800 font-semibold hover:bg-emerald-950 hover:text-white rounded-lg"
            href="#"
          >
            Contact Us
          </a>
        </li>
        <li>
          <a
            className="block px-4 py-2.5 text-slate-800 font-semibold hover:bg-emerald-950 hover:text-white rounded-lg"
            href="#"
          >
            Sign Out
          </a>
        </li>
      </ul>
    </nav>
    <div className="right w-full flex flex-col">
      <header className="h-16 w-full flex items-center p-4 text-slate-400">
        <ol className="text-slate-400 flex flex-wrap gap-1 text-sm [&>li:last-child]:font-semibold [&>li:not(:first-child)]:before:content-['\00bb']">
          <li className="before:content-['\2616'] before:mx-2">
            <a href="#">Homepage</a>
          </li>
          <li className="before:mx-2">
            <a href="#">Category Name</a>
          </li>
          <li className="before:mx-2">Page name</li>
        </ol>
      </header>

      <div className="p-4">
        <h1 className="text-xl font-semibold text-slate-500 page-title">
          Page Name
        </h1>
      </div>
    </div>
  </div>
</div>
    )
}