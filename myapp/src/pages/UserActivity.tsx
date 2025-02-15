"use client";

import "../../styles/globals.css";
import { useEffect, useState } from "react";
import ToggleBar from "./ToggleBar";
import { useAuth } from "@/lib/authProvider"

interface LogEntry {
  action: string;
  date: string;
  day: string;
  ip_address: string;
  log_id: string;
  time: string;
  user_agent: string;
}

export default function UserActivity() {
  // const { accessToken } = useAuth();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCollapsed, setCollapsed] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await fetch(
          `http://127.0.0.1:5000/logs/${currentPage}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken? `Bearer ${accessToken}` : "",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setLogs(Array.isArray(data.message) ? data.message : []);
      } catch (error) {
        console.error("Error fetching logs:", error);
        setLogs([]);
      }
      setLoading(false);
    };

    fetchLogs();
  }, [currentPage]);

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center">
      <div id="body" className="bg-slate-50 h-full w-full flex">
        <ToggleBar isCollapsed={isCollapsed} setCollapsed={setCollapsed} />
        <div
          className={`right flex flex-col p-6 ${
            isCollapsed ? "w-[98%]" : "w-[83%]"
          }`}
        >
          <h1 className="text-2xl font-bold mb-4">User Activity</h1>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : logs.length > 0 ? (
            <div className="bg-white shadow-md rounded-lg p-6 font-mono text-sm overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead className="border-b border-gray-200 text-gray-700 uppercase font-semibold text-sm pb-3">
                  <tr>
                    <td className="pr-6">Action</td>
                    <td className="pr-6">IP Address</td>
                    <td className="pr-6">Time & Date</td>
                    <td className="pr-6">User Agent</td>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.log_id} className="py-2 text-sm">
                      <td className="pr-6">{log.action}</td>
                      <td className="pr-6 text-gray-500">{log.ip_address}</td>
                      <td className="pr-6">
                        {log.time} - {log.date}({log.day})
                      </td>
                      <td className="text-gray-500">{log.user_agent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
  );
}
