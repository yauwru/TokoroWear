"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { label: "Koleksi", href: "/koleksi" },
  { label: "Pria", href: "/koleksi?gender=pria" },
  { label: "Wanita", href: "/koleksi?gender=wanita" },
  { label: "Aksesoris", href: "/koleksi?kategori=aksesoris" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md flex justify-between items-center px-10 py-6 border-b border-outline-variant/10">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 select-none group">
        <Image
          src="/logo-black.png"
          alt="TOKORO WEAR"
          width={40}
          height={40}
          className="object-contain group-hover:opacity-70 transition-opacity"
          priority
        />
        <span className="text-2xl font-black tracking-tighter text-black font-headline uppercase hidden sm:block">
          TOKORO WEAR
        </span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center space-x-12">
        {NAV_LINKS.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href === "/koleksi" && pathname.startsWith("/koleksi"));
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`font-headline font-bold uppercase tracking-tighter transition-colors ${
                isActive
                  ? "text-black border-b-2 border-black pb-1"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-6">
        <button className="hover:opacity-70 transition-opacity duration-200">
          <span className="material-symbols-outlined text-black">search</span>
        </button>

        <Link
          href="/keranjang"
          className="relative hover:opacity-70 transition-opacity duration-200"
        >
          <span className="material-symbols-outlined text-black">
            shopping_bag
          </span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center font-bold leading-none">
              {totalItems}
            </span>
          )}
        </Link>

        <button className="hover:opacity-70 transition-opacity duration-200">
          <span className="material-symbols-outlined text-black">person</span>
        </button>
      </div>
    </nav>
  );
}
