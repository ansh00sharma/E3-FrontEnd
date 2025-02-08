"use client";

import "../../styles/globals.css";
import { useEffect, useState } from "react";

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
        const access_token = sessionStorage.getItem("accessToken");
        const response = await fetch(
          `http://127.0.0.1:5000/logs/${currentPage}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: access_token ? `Bearer ${access_token}` : "",
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
    <div className="h-screen w-full overflow-hidden flex items-center justify-center">
      <div id="body" className="bg-slate-50 h-full w-full flex">
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
                  <span>
                    {log.time} - {log.date}({log.day})
                  </span>
                  <span className="text-gray-500 truncate">
                    {log.user_agent}
                  </span>
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
  );
}
