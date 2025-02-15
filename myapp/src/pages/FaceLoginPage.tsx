'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter,usePathname  } from 'next/navigation'
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
// import { Alert, AlertDescription } from "@/ui/alert"
import '../index.css';
import defaultUserImage from '../images/default_user_image.webp'
import Image from 'next/image';

export default function FaceLoginPage() {
  const [email, setEmail] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const leftCanvasRef = useRef<HTMLCanvasElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isvalid, setValid] = useState(false)
  const [bgColor, setBgColor] = useState("red");
  const [isVideoAvailable, setIsVideoAvailable] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Function to initialize and maintain WebSocket connection
    if (isValidEmail(email)){
      const socket = new WebSocket('ws://127.0.0.1:8080/ws/login/');
    
      socket.addEventListener("open", (event) => {
        console.log("websocket connection Established")
        startCamera(socket);
      });
    
      socket.onmessage = (event) => {
        const response = JSON.parse(event.data);
        console.log(response)

        if (response.status === 200) {
          setBgColor("green");
          setTimeout(() => {
            router.push('/userPannelPage'); // Replace with the actual route
          }, 1500);
        } else {
          setBgColor("red");
        }
        // console.log(isVideoAvailable)
      };
    
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        socket.close();
      };
      socket.onclose = () => {
        console.log("WebSocket connection closed.");
        clearInterval(intervalRef.current as NodeJS.Timeout);
      };
    }
    
  }, [email]);
  
  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const startCamera = async (socket:WebSocket) => {
    try {
      setIsVideoAvailable(true)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      if (leftCanvasRef.current) {
        const leftCanvasContext = leftCanvasRef.current.getContext('2d')
        // Start drawing the video to the left canvas continuously
        const drawVideoToCanvas = (): void => {
          if (videoRef.current && leftCanvasContext) {
            leftCanvasContext.drawImage(videoRef.current, 0, 0, 350, 350);
          }
          requestAnimationFrame(drawVideoToCanvas);
        };
        drawVideoToCanvas();
      }
      if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      intervalRef.current = setInterval(() => captureAndSendFrame(socket), 2000);

    } catch (err) {
      console.error('Error accessing the camera:', err)
    }
  }

  const captureAndSendFrame = async (socket: WebSocket) => {
    if (leftCanvasRef.current) {
      const leftContext = leftCanvasRef.current.getContext('2d');
  
      if (leftContext) {
        // Convert the canvas to a Blob (binary data)
        leftCanvasRef.current.toBlob(async (blob) => {
          if (!blob) {
            console.error("Failed to capture the image. Please try again.");
            return;
          }
  
          if (socket && socket.readyState === WebSocket.OPEN) {
            const uemail = email; // Replace with actual email
            const encoder = new TextEncoder();
            const emailBytes = encoder.encode(uemail);
  
            // Add a delimiter (e.g., null byte) between the email and the image data
            const delimiter = new Uint8Array([0]); // Null byte as delimiter
  
            // Convert blob to binary data
            const blobBuffer = new Uint8Array(await blob.arrayBuffer());
  
            // Calculate the total buffer size
            const combinedBuffer = new Uint8Array(
              emailBytes.length + delimiter.length + blobBuffer.length
            );
  
            // Combine email, delimiter, and blob binary data
            combinedBuffer.set(emailBytes, 0);
            combinedBuffer.set(delimiter, emailBytes.length);
            combinedBuffer.set(blobBuffer, emailBytes.length + delimiter.length);
  
            // Send the combined buffer over WebSocket
            socket.send(combinedBuffer.buffer);
            console.log('Sent binary data from frontend with delimiter: ', combinedBuffer.buffer);
          } else {
            console.error("WebSocket connection is not open.");
          }
        }, 'image/png');
      }
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newEmail = e.target.value;
  const isEmailValid = isValidEmail(newEmail);
  setValid(isEmailValid);
  setEmail(newEmail);
 }

      
  return (
    <div className="min-h-screen mt-0 pt-1 h-screen w-screen  flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-1 overflow-hidden">
      <h1 className="text-3xl font-bold text-center mb-4 mt-0 border-white">Face Recognition Login</h1>
      <div className="w-full max-w-6xl  flex justify-between items-start">
        <form className="space-y-4 flex w-full">

          <div className="w-1/2 pr-4 flex flex-col items-center justify-center">
            <div className="w-full flex flex-col">
              <Input 
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full flex flex-col bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg py-2 px-4"
              />
              {!isvalid ? (
                <p>Email is not Valid !</p>
              ) : null}
            </div>
            <div>
            <Label className="block text-center text-lg font-medium text-white-800">Capture a Clear and Focussed Picture</Label>
              <div className="relative w-[358px] h-[358px] flex items-center justify-center" style={{ backgroundColor: bgColor }}>
              {isVideoAvailable ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute w-[350px] h-[350px] object-cover"
                  />
                  ) : (
                    <Image
                    src={defaultUserImage}
                    alt="Default User"
                    width={350}
                    height={350}
                    className="absolute w-[350px] h-[350px] object-cover"
                  />
                  )}
                <canvas
                  ref={leftCanvasRef }

                  width={350}
                  height={350}
                  className="absolute w-[350px] h-[350px] object-cover"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
