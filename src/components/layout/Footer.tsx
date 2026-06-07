"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[#1A1A1A] text-white w-full py-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-10 max-w-full">
        {/* Brand */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-white.png"
              alt="TOKORO WEAR"
              width={36}
              height={36}
              className="object-contain"
            />
            <span className="text-xl font-black font-headline text-white uppercase tracking-tighter">
              TOKORO WEAR
            </span>
          </div>
          <p className="text-gray-400 text-sm tracking-wide leading-relaxed max-w-xs">
            Eksplorasi estetika urban melalui kurasi material teknis dan siluet
            avant-garde. Didesain untuk masa depan.
          </p>
        </div>

        {/* Belanja */}
        <div className="space-y-6">
          <h5 className="text-white font-bold uppercase tracking-[0.2em] text-xs font-headline">
            Belanja
          </h5>
          <ul className="space-y-4 text-sm">
            {["Semua Koleksi", "Rilisan Terbaru", "Kolaborasi", "Aksesoris"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href="/koleksi"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Informasi */}
        <div className="space-y-6">
          <h5 className="text-white font-bold uppercase tracking-[0.2em] text-xs font-headline">
            Informasi
          </h5>
          <ul className="space-y-4 text-sm">
            {[
              "Tentang Kami",
              "Bantuan",
              "Kebijakan Privasi",
              "Syarat & Ketentuan",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h5 className="text-white font-bold uppercase tracking-[0.2em] text-xs font-headline">
            Newsletter
          </h5>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Anda"
              className="w-full bg-transparent border-b border-gray-600 py-3 focus:outline-none focus:border-white transition-colors text-white placeholder-gray-500 text-sm"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity">
              <span className="material-symbols-outlined text-white">
                arrow_forward
              </span>
            </button>
          </div>

          <div className="flex gap-8 pt-4">
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest"
            >
              TikTok
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-20 px-10 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-[10px] font-label tracking-widest uppercase">
          © 2024 TOKORO WEAR. Urbanisme Terkurasi.
        </p>
        <p className="text-gray-500 text-[10px] font-label tracking-widest uppercase">
          Dibuat dengan presisi di Jakarta
        </p>
      </div>
    </footer>

    {/* Hidden admin access — fixed bottom-right, barely visible */}
    <Link
      href="/admin"
      className="fixed bottom-4 right-4 w-7 h-7 flex items-center justify-center opacity-[0.08] hover:opacity-30 transition-opacity duration-300 z-50"
      aria-hidden="true"
    >
      <span className="material-symbols-outlined text-black text-[14px]">lock</span>
    </Link>
  );
}
