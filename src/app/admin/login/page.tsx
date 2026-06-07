"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);

  function handleGoogleSignIn() {
    setLoading(true);
    signIn("google", { callbackUrl: "/admin" });
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-12">
          <Image
            src="/logo-white.png"
            alt="TOKORO WEAR"
            width={48}
            height={48}
            className="object-contain mb-4"
          />
          <p className="text-white font-headline font-black text-lg uppercase tracking-tighter mb-1">
            TOKORO WEAR
          </p>
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em]">
            Admin Panel
          </p>
        </div>

        <div className="border border-white/10 p-8 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-white font-bold text-sm uppercase tracking-widest">
              Masuk sebagai Admin
            </p>
            <p className="text-white/40 text-xs leading-relaxed">
              Hanya akun yang diotorisasi yang dapat mengakses panel ini.
            </p>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 font-bold uppercase tracking-widest text-sm hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {loading ? "Memuat..." : "Masuk dengan Google"}
          </button>
        </div>

        <p className="text-center text-white/20 text-[10px] mt-8 uppercase tracking-widest">
          © 2024 TOKORO WEAR
        </p>
      </div>
    </div>
  );
}
