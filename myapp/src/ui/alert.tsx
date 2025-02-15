import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type AlertProps = {
  message: string;
  color: string;
  duration?: number; // Optional: duration in milliseconds before auto-hide
};

const Alert: React.FC<AlertProps> = ({ message, color, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true); // Show the alert when message changes
      const timer = setTimeout(() => {
        setVisible(false); // Hide after the specified duration
      }, duration);

      return () => clearTimeout(timer); // Cleanup timeout on unmount or new message
    }
  }, [message, duration]);

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-md shadow-lg transition-transform duration-500 z-50",
        visible ? "translate-y-4" : "-translate-y-full"
      )}
      style={{ color }}
    >
      {message}
    </div>
  );
};

export default Alert;