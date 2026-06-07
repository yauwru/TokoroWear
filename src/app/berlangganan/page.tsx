"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BerlanggananPage() {
  const { data: session, status } = useSession();
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "already">("idle");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email && subscribeStatus === "idle") {
      setSubscribeStatus("loading");
      fetch("/api/subscribers", { method: "POST" })
        .then((r) => r.json())
        .then((data) => {
          setSubscribeStatus(data.status === "exists" ? "already" : "success");
        })
        .catch(() => setSubscribeStatus("idle"));
    }
  }, [status, session, subscribeStatus]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-secondary text-sm uppercase tracking-widest">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
      <div className="w-full max-w-md text-center space-y-8">
        <div className="flex flex-col items-center gap-3">
          <Image src="/logo-white.png" alt="TOKORO WEAR" width={40} height={40} className="object-contain" />
          <h1 className="text-4xl font-headline font-black uppercase tracking-tighter">
            Newsletter
          </h1>
          <p className="text-secondary text-sm leading-relaxed max-w-xs">
            Jadilah yang pertama tahu tentang koleksi terbaru, drop eksklusif, dan penawaran spesial TOKORO WEAR.
          </p>
        </div>

        {!session && (
          <div className="space-y-4">
            <button
              onClick={() => signIn("google", { callbackUrl: "/berlangganan" })}
              className="w-full flex items-center justify-center gap-3 bg-black border border-outline/30 text-white py-4 font-bold uppercase tracking-widest text-sm hover:border-white/40 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Daftar dengan Google
            </button>
            <p className="text-secondary text-[10px] uppercase tracking-widest">
              Email Anda hanya digunakan untuk newsletter toko
            </p>
          </div>
        )}

        {subscribeStatus === "loading" && (
          <div className="py-6 space-y-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-secondary text-sm">Mendaftarkan akun Anda...</p>
          </div>
        )}

        {subscribeStatus === "success" && (
          <div className="border border-green-500/30 bg-green-500/5 p-8 space-y-4">
            <span className="material-symbols-outlined text-green-400 text-5xl block">check_circle</span>
            <h2 className="font-headline font-black text-xl uppercase text-white">
              Berhasil Berlangganan!
            </h2>
            <p className="text-secondary text-sm">
              <strong className="text-white">{session?.user?.email}</strong> berhasil didaftarkan.
              Anda akan mendapat info eksklusif dari TOKORO WEAR.
            </p>
          </div>
        )}

        {subscribeStatus === "already" && (
          <div className="border border-blue-500/30 bg-blue-500/5 p-8 space-y-4">
            <span className="material-symbols-outlined text-blue-400 text-5xl block">info</span>
            <h2 className="font-headline font-black text-xl uppercase text-white">
              Sudah Terdaftar
            </h2>
            <p className="text-secondary text-sm">
              <strong className="text-white">{session?.user?.email}</strong> sudah terdaftar sebagai subscriber.
            </p>
          </div>
        )}

        <Link
          href="/"
          className="inline-block border border-outline/20 px-8 py-3 text-xs font-bold uppercase tracking-widest text-secondary hover:text-white hover:border-white/40 transition-colors"
        >
          Kembali ke Toko
        </Link>
      </div>
    </div>
  );
}
