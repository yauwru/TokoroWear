"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function KeranjangPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const shipping = 45000;
  const tax = Math.round(subtotal * 0.11);
  const total = subtotal + shipping + tax;

  return (
    <div className="pt-32 pb-20 px-6 md:px-10 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-5xl md:text-7xl font-headline font-black tracking-tighter uppercase leading-none">
          TAS BELANJA ANDA
        </h1>
        <div className="h-1 w-24 bg-primary mt-4" />
      </header>

      {items.length === 0 ? (
        <div className="py-32 text-center space-y-8">
          <span className="material-symbols-outlined text-6xl text-outline-variant">
            shopping_bag
          </span>
          <p className="font-headline font-bold text-2xl uppercase tracking-tighter text-secondary">
            Keranjang Anda kosong
          </p>
          <Link
            href="/koleksi"
            className="inline-block bg-primary text-white px-10 py-5 font-headline font-bold uppercase tracking-widest hover:bg-primary-container transition-all"
          >
            MULAI BELANJA
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-12">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex flex-col md:flex-row gap-8 pb-12 border-b border-outline-variant/30"
              >
                <div className="w-full md:w-56 aspect-[3/4] bg-surface-container overflow-hidden group flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold uppercase tracking-tight font-headline">
                        {item.name}
                      </h3>
                      <p className="text-secondary mt-1 font-label text-sm uppercase">
                        Warna: {item.color} | Ukuran: {item.size}
                      </p>
                    </div>
                    <p className="text-xl font-bold font-headline tracking-tighter whitespace-nowrap">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-8">
                    <div className="flex items-center border border-outline/20">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity - 1)
                        }
                        className="px-4 py-2 hover:bg-surface-container transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">
                          remove
                        </span>
                      </button>
                      <span className="px-6 py-2 font-bold font-label min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }
                        className="px-4 py-2 hover:bg-surface-container transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">
                          add
                        </span>
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-error font-bold uppercase text-xs tracking-widest hover:underline transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">
                        delete
                      </span>
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Upsell */}
            <div className="pt-12">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 font-headline">
                MUNGKIN ANDA SUKA
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/produk/shadow-cap"
                  className="bg-surface-container-low p-6 flex flex-col justify-between aspect-square group cursor-pointer"
                >
                  <div className="h-3/4 overflow-hidden mb-4">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXrWhznZR9iWPeb8khgYPa7hcmYkxLvSpz7hcOlDqSRBWI-yKXPRGVIhdWim50DYdZVefx1Q0MvDXQaMjk_Cp8kLU7zSRaL5VNFAxY6DcZmJZ2fZhBlqV9pqXVY2FI2MYVjf_xQ_pcRCJ771XbgaWToCPL1A5UFoL9P2DzKkkQ7t4kNjkQycbdw38rP1elvkLEarQ50Z8pqcmJoMbPj0CBuvdjKpNSo8xHFBmFJyhV1zTHYDmvo61Ei1F7RwXCe7bCoZlHtxf-7os"
                      alt="Sneakers"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div>
                    <p className="font-bold uppercase text-xs tracking-tighter">
                      Aksesoris
                    </p>
                    <p className="font-headline font-bold uppercase tracking-tighter">
                      Sneakers "Flux"
                    </p>
                  </div>
                </Link>
                <div className="bg-primary text-white p-6 flex flex-col justify-between aspect-square">
                  <div className="flex justify-between items-start">
                    <span className="material-symbols-outlined text-4xl">
                      local_shipping
                    </span>
                    <span className="font-black text-3xl font-headline italic">
                      FREE
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline font-black text-2xl uppercase leading-tight tracking-tighter">
                      PENGIRIMAN GRATIS
                    </h4>
                    <p className="font-label text-xs mt-2 text-white/70">
                      Untuk pesanan di atas Rp 5.000.000
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-surface-container-lowest p-10 border border-outline-variant/10 shadow-sm">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 font-headline">
                RINGKASAN PESANAN
              </h2>

              <div className="space-y-6 font-label">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-secondary uppercase tracking-wider">
                    Subtotal
                  </span>
                  <span className="font-bold">
                    Rp {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-secondary uppercase tracking-wider">
                    Estimasi Pengiriman
                  </span>
                  <span className="font-bold">
                    Rp {shipping.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-secondary uppercase tracking-wider">
                    Pajak (PPN 11%)
                  </span>
                  <span className="font-bold">
                    Rp {tax.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="pt-8 mt-8 border-t border-outline-variant/30 flex justify-between items-end">
                  <span className="text-xl font-black uppercase tracking-tighter font-headline">
                    TOTAL
                  </span>
                  <span className="text-3xl font-black tracking-tighter font-headline">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <button className="w-full mt-12 bg-primary text-white py-6 px-4 font-black uppercase tracking-widest text-sm hover:bg-primary-container transition-all duration-300 group flex items-center justify-center gap-3">
                LANJUT KE CHECKOUT
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                  arrow_right_alt
                </span>
              </button>

              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-secondary font-bold">
                  <span className="material-symbols-outlined text-lg">
                    verified_user
                  </span>
                  Pembayaran Aman & Terenkripsi
                </div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-secondary font-bold">
                  <span className="material-symbols-outlined text-lg">
                    assignment_return
                  </span>
                  30 Hari Pengembalian Mudah
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-12 pt-8 border-t border-outline-variant/30">
                <label className="text-[10px] font-black uppercase tracking-widest text-secondary mb-3 block">
                  KODE PROMO
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="MASUKKAN KODE"
                    className="bg-surface-container w-full px-4 py-3 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-primary outline-none border-none"
                  />
                  <button className="bg-secondary text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors">
                    Terapkan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
