"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import defaultUserImage from "../images/default_user_image.webp";

interface User {
  email: string;
  name: string;
  phone_number:string;
  gender:string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  selectedAvatar: string | null;
  setSelectedAvatar: (avatar: string) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const router = useRouter();

  // Restore session on page refresh
  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData");
    const storedToken = sessionStorage.getItem("accessToken");
    const storedAvatar = sessionStorage.getItem("selectedAvatar");


    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
    }
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar);
    } else {
      sessionStorage.setItem("selectedAvatar", defaultUserImage.src);
      setSelectedAvatar(defaultUserImage.src);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:8080/user/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.status === 200) {
        sessionStorage.setItem("accessToken", data.access_token);
        sessionStorage.setItem("userData", JSON.stringify(data.user)); // Fix: Stringify user data

        setAccessToken(data.access_token);
        setUser(data.user);

        let storedAvatar = sessionStorage.getItem("selectedAvatar");
        if (!storedAvatar) {
          sessionStorage.setItem("selectedAvatar", defaultUserImage.src); // Store image path
          storedAvatar = defaultUserImage.src;
        }

        setAccessToken(data.access_token);
        setUser(data.user);

        router.push("/userDashboard");
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = () => {
    // sessionStorage.removeItem("accessToken");
    // sessionStorage.removeItem("userData");

    // setUser(null);
    // setAccessToken(null);
    router.push("/explore");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, selectedAvatar, setSelectedAvatar,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};