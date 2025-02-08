"use client";
import { useEffect, useState } from "react";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import Link from "next/link";
import "../../styles/globals.css";
import { Card, CardContent } from "@/ui/card";
// import Alert from "@/ui/alert";
import { useRouter } from "next/navigation";

export default function RegisteredNumberLoginPage() {
  const [phone_number, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [alert, setAlert] = useState<{ message: string; color: string } | null>(
    null
  );
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { phone_number };
    console.log("sending otp to : ", JSON.stringify(payload));
    try {
      const response = await fetch("http://localhost:8080/user/sendloginotp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
        setAlert({ message: data.messsage, color: "green" });
        setIsOtpSent(true);
      } else {
        setAlert({ message: data.message, color: "red" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // alert("Unable to connect to the server. Please try again later.");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { phone_number, otp };
    console.log("Verifying OTP with:", payload);

    try {
      const response = await fetch(
        "http://localhost:8080/user/verifyloginotp/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setAlert({ message: data.message, color: "green" });
        setTimeout(() => {
          router.push("/userPannelPage");
        }, 1500);
      } else {
        setAlert({ message: data.message, color: "red" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setAlert({
        message: "Unable to login. Please try again later.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    if (alert?.message) {
      window.alert(alert?.message);
    }
  }, [alert?.message]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
      <div className="w-[600px]">
        <Card className="w-full bg-gray-900 border-gray-400 p-0.5 rounded-lg">
          <div className="rounded-xl bg-black w-full h-full">
            <CardContent className="w-full h-full p-0">
              <form
                onSubmit={isOtpSent ? handleLogin : handleSendOtp}
                className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 h-full border border-gray-700"
              >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                {/* Registered Mobile Number */}
                <div className="mb-4">
                  <Label
                    htmlFor="phone_number"
                    className="block text-white text-sm font-bold mb-2 px-2"
                  >
                    Registered Mobile Number
                  </Label>
                  <Input
                    type="number"
                    id="phone_number"
                    placeholder="Enter your registered number"
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-gray-700 text-white border-gray-600 focus:border-white w-full p-2"
                    required
                  />
                </div>

                {/* OTP Input - Shown only after OTP is sent */}
                {isOtpSent && (
                  <div className="mb-6">
                    <Label
                      htmlFor="otp"
                      className="block text-white text-sm font-bold mb-2 px-2"
                    >
                      OTP
                    </Label>
                    <Input
                      type="text"
                      id="otp"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="bg-gray-700 text-white border-gray-600 focus:border-white w-full p-2"
                      required
                    />
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {isOtpSent ? "Login" : "Send OTP"}
                  </button>
                  {!isOtpSent && (
                    <span className="flex gap-0.5">
                      <span className="inline-block align-baseline font-bold text-sm text-blue-500">
                        Not registered?
                      </span>
                      <Link
                        href="/user-register"
                        className="inline-block hover:underline align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                      >
                        Click Here
                      </Link>
                    </span>
                  )}
                </div>
              </form>
              {/* {alert && <Alert message={alert.message} color={alert.color} />} */}
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
