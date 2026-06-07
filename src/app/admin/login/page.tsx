"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@tokorowear.id");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email atau password salah.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <Image
            src="/logo-white.png"
            alt="TOKORO WEAR"
            width={48}
            height={48}
            className="object-contain mb-4"
          />
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">
            Admin Panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/20"
              placeholder="admin@tokorowear.id"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/20"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs font-bold uppercase tracking-widest">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest text-sm hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? "MASUK..." : "MASUK"}
          </button>
        </form>

        <p className="text-center text-white/20 text-[10px] mt-8 uppercase tracking-widest">
          © 2024 TOKORO WEAR
        </p>
      </div>
    </div>
  );
}
