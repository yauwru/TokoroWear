"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "dashboard", exact: true },
  { href: "/admin/pesanan", label: "Pesanan", icon: "receipt_long" },
  { href: "/admin/produk", label: "Produk", icon: "inventory_2" },
  { href: "/admin/pembayaran", label: "Pembayaran", icon: "payment" },
  { href: "/admin/pengiriman", label: "Pengiriman", icon: "local_shipping" },
  { href: "/admin/laporan", label: "Laporan", icon: "bar_chart" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col">
      {/* Logo */}
      <div className="px-8 py-8 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3" target="_blank">
          <Image src="/logo-white.png" alt="TR" width={32} height={32} className="object-contain" />
          <div>
            <p className="text-white font-headline font-black text-sm uppercase tracking-tighter">TOKORO WEAR</p>
            <p className="text-white/30 text-[9px] uppercase tracking-[0.3em]">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
              isActive(item.href, item.exact)
                ? "bg-white text-black"
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-6 border-t border-white/5 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white/30 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          Lihat Toko
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white/30 hover:text-red-400 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          Keluar
        </button>
      </div>
    </aside>
  );
}
