import "../../styles/globals.css";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GenAiLand - Explore the Future of AI and ML",
  description:
    "Dive into the cutting-edge world of Artificial Intelligence and Machine Learning at GenAiLand.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black flex gap-0 overflow-hidden`}>
        <NavBar />
        <div className='flex-1'>{children}</div>
      </body>
    </html>
  );
}
