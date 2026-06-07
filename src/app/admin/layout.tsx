import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";
import AdminSidebar from "@/components/admin/AdminSidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

export const metadata: Metadata = {
  title: "Admin — TOKORO WEAR",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body bg-[#0f0f0f] text-white`}>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="flex-1 ml-64 p-10 bg-[#0f0f0f] min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
