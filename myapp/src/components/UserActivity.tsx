'use client'

import '../../styles/globals.css'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image';
import defaultUserImage from '../images/default_user_image.webp'
import { useEffect, useState } from 'react';

interface LogEntry {
    action: string;
    date: string;
    day: string;
    ip_address: string;
    log_id: string;
    time: string;
    user_agent: string;
  }
  

export default function UserActivityPage() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    useEffect(() => {
        const fetchLogs = async () => {
          setLoading(true);
          try {
            const response = await fetch(`http://127.0.0.1:5000/logs/9cae7a40-ff78-4a6f-b81e-01046c23d56b/${currentPage}/`);
            const data = await response.json();
            setLogs(Array.isArray(data.message) ? data.message : []);
          } catch (error) {
            console.error("Error fetching logs:", error);
            setLogs([])
          }
          setLoading(false);
        };
    
        fetchLogs();
      }, [currentPage]);
    
    

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
                        Activity
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
            <div className="right w-full flex flex-col p-6">
                <h1 className="text-2xl font-bold mb-4">User Activity</h1>

                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : logs.length > 0 ? (
                    <div className="bg-white shadow-md rounded-lg p-6 font-mono text-sm">
                        {/* Table Header */}
                        <div className="grid grid-cols-4 gap-2 pb-3 border-b border-gray-200 text-gray-700 uppercase font-semibold text-xs">
                            <span>Action</span>
                            <span>IP Address</span>
                            <span>Time & Date</span>
                            <span>User Agent</span>
                        </div>

                        {/* Table Rows */}
                        {logs.map((log) => (
                            <div key={log.log_id} className="grid grid-cols-4 gap-2 py-2">
                            <span>{log.action}</span>
                            <span className="text-gray-500">{log.ip_address}</span>
                            <span>{log.time} - {log.date}({log.day})</span>
                            <span className="text-gray-500 truncate">{log.user_agent}</span>
                            </div>
                        ))}
                        
                    </div>
                ) : (
                    <p className="text-gray-500">No activity found.</p>
                )}

                {/* Spacing to keep pagination at bottom */}
                <div className="flex-grow"></div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6 space-x-2 border-t border-gray-200 pt-4">
                    {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-lg text-sm ${
                            page === currentPage
                                ? "bg-emerald-700 text-white font-bold"
                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            }`}
                        >
                            {page}
                        </button>
                        );
                    })}
                    </div>
                </div>
        </div>
    </div>
)
}