"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function UnauthorizedPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-8">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/logo-white.png"
            alt="TOKORO WEAR"
            width={40}
            height={40}
            className="object-contain opacity-50"
          />
          <div className="w-16 h-16 rounded-full border-2 border-red-500/40 flex items-center justify-center bg-red-500/5">
            <span className="material-symbols-outlined text-red-400 text-3xl">lock</span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-white font-headline font-black text-2xl uppercase tracking-tighter">
            Akses Ditolak
          </h1>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto">
            Halaman ini hanya dapat diakses oleh admin TOKORO WEAR.
            {session?.user?.email && (
              <span className="block mt-2 text-red-400/70">
                Akun <strong>{session.user.email}</strong> tidak memiliki izin admin.
              </span>
            )}
          </p>
        </div>

        <div className="border border-red-500/20 bg-red-500/5 p-6 text-left space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400/70 mb-3">
            Khusus Admin
          </p>
          <p className="text-white/50 text-xs leading-relaxed">
            Jika Anda adalah admin, pastikan Anda masuk menggunakan akun Google yang terdaftar sebagai admin toko.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full bg-white text-black py-3 font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-colors"
          >
            Ganti Akun Google
          </button>
          <Link
            href="/"
            className="w-full border border-white/10 text-white/50 py-3 font-bold uppercase tracking-widest text-xs hover:border-white/30 hover:text-white transition-colors block"
          >
            Kembali ke Toko
          </Link>
        </div>
      </div>
    </div>
  );
}
