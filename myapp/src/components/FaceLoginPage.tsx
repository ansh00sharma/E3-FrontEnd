'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter,usePathname  } from 'next/navigation'
import {Button} from "@/ui/button2"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Alert, AlertDescription } from "@/ui/alert"

export default function FaceLoginPage() {
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const leftCanvasRef = useRef<HTMLCanvasElement>(null)
  const rightCanvasRef = useRef<HTMLCanvasElement>(null)
  const leftCanvasContextRef = useRef<CanvasRenderingContext2D | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleRouteChange = () => {
      if (pathname === '/facelogin') {
        startCamera()
      } else {
        stopCamera()
      }
    }

    handleRouteChange() // Run on initial load

    return () => {
      stopCamera() // Stop the camera on unmount
    }
  }, [pathname])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      if (leftCanvasRef.current) {
        leftCanvasContextRef.current = leftCanvasRef.current.getContext('2d')
      }

      // Start drawing the video to the left canvas continuously
      if (leftCanvasContextRef.current && videoRef.current) {
        const drawVideoToCanvas = (): void => { // Explicit return type is void
          // Check if videoRef.current is valid
          if (videoRef.current) {
            leftCanvasContextRef.current?.drawImage(videoRef.current, 0, 0, 350, 350);
          }
          // Keep drawing the video
          requestAnimationFrame(drawVideoToCanvas);
        };
        drawVideoToCanvas();
      }
    } catch (err) {
      console.error('Error accessing the camera:', err)
    }
  }

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream
    const tracks = stream?.getTracks()
    tracks?.forEach(track => track.stop())
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const captureImage = () => {
    if (leftCanvasRef.current && rightCanvasRef.current) {
      const leftContext = leftCanvasRef.current.getContext('2d')
      const rightContext = rightCanvasRef.current.getContext('2d')

      if (leftContext && rightContext) {
        // Capture the current frame from the left canvas and draw it on the right canvas
        const imageData = leftContext.getImageData(0, 0, 350, 350)
        rightContext.putImageData(imageData, 0, 0)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!rightCanvasRef.current) {
      setErrorMsg("No image captured. Please capture an image before logging in.");
      return;
    }
  
    // Convert the captured image to a Blob
    const rightCanvas = rightCanvasRef.current;
    rightCanvas.toBlob(async (blob) => {
      if (!blob) {
        setErrorMsg("Failed to capture the image. Please try again.");
        return;
      }
  
      // Create FormData to send email and image
      const formData = new FormData();
      formData.append("email", email); // Add email
      formData.append("image", blob, "captured_image.png"); // Add Blob as a file with a filename

      function showAlert(message:string, color:string) {
        // Create the alert box
        const alertBox = document.createElement("div");
        alertBox.textContent = message;
        alertBox.style.position = "fixed";
        alertBox.style.top = "10px";
        alertBox.style.right = "10px";
        alertBox.style.padding = "15px";
        alertBox.style.borderRadius = "5px";
        alertBox.style.color = "white";
        alertBox.style.backgroundColor = color;
        alertBox.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
        alertBox.style.zIndex = "1000";
    
        // Append the alert box to the body
        document.body.appendChild(alertBox);
    
        // Automatically remove the alert box after 3 seconds
        setTimeout(() => {
            alertBox.remove();
        }, 3000);
    }
      try {
        // Send the FormData to the backend
        const response = await fetch("http://localhost:8080/user/imagelogin/", {
          method: "POST",
          body: formData,
        });
        
        const data = await response.json();

        if (data.status === 200) {
            showAlert(data.message, "green");
        }
        else if (data.status === 404) {
            showAlert(data.message, "red");
        } else if (data.status === 400) {
            showAlert(`Error: ${data.message}`, "red");
        } else {
            throw new Error(`Server error: ${response.status} - ${response.statusText}`);
        }
  
        // Handle the response
        // const data = await response.json();
        console.log("response from backend", data);
      } catch (error) {
        console.error("Error during login:", error);
        setErrorMsg("Login failed. Please try again.");
      }
    }, "image/png"); // Set the image type as PNG
  };
      

  return (
    <div className="min-h-screen mt-0 pt-1 h-screen w-screen  flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-1 overflow-hidden">
      <h1 className="text-3xl font-bold text-center mb-4 mt-0 border-white">Face Recognition Login</h1>
      <div className="w-full max-w-6xl  flex justify-between items-start">
      <form onSubmit={handleSubmit} className="space-y-4 flex w-full">
          {/* Left Side - Video Stream Canvas */}
          <div className="w-1/2 pr-4 flex flex-col items-center justify-center">
            <div className="w-full flex flex-col">
                <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full flex flex-col bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg py-2 px-4"
                />
            </div>
            <div>
            <Label className="block text-center text-lg font-medium text-white-800">Capture a Clear and Focussed Picture</Label>
            
            <div className="relative w-[350px] h-[350px] mb-4">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <canvas
                ref={leftCanvasRef}
                width={350}
                height={350}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          </div>
          </div>

          {/* Right Side - Capture Button & Capture Image Canvas */}
          <div className="w-1/2 pl-4 flex flex-col items-center justify-center h-full space-y-4">
            <button
              type="button"
              onClick={captureImage}
              className="w-full bg-white text-gray-900 hover:bg-gray-200 font-medium py-2 px-4 rounded-lg"
            >
              Capture Image
            </button>

            <div className="relative w-[250px] h-[250px] mx-auto">
              <canvas
                ref={rightCanvasRef}
                width={250}
                height={250}
                className="absolute top-0 left-0 w-full h-full border-2 border-gray-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 font-medium py-2 px-4 rounded-lg"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

