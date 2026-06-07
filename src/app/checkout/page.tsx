"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const WHATSAPP_NUMBER = "6281234567890"; // Ganti dengan nomor WA toko

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    note: "",
    payment: "Transfer Bank BCA",
    shipping: "JNE REG",
  });
  const [loading, setLoading] = useState(false);

  const shippingCost = 45000;
  const tax = Math.round(subtotal * 0.11);
  const total = subtotal + shippingCost + tax;

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 px-10 text-center space-y-6">
        <p className="font-headline font-bold text-2xl uppercase tracking-tighter">Keranjang kosong</p>
        <Link href="/koleksi" className="inline-block bg-primary text-white px-10 py-5 font-headline font-bold uppercase tracking-widest">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return;
    setLoading(true);

    const orderId = `TRW-${Date.now()}`;
    const itemsText = items
      .map((item) => `• ${item.name} (${item.color}, ${item.size}) x${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`)
      .join("\n");

    const waMessage = `*PESANAN BARU — ${orderId}*

*Data Pembeli:*
Nama: ${form.name}
No. HP: ${form.phone}
Email: ${form.email}
Alamat: ${form.address}, ${form.city}, ${form.province} ${form.postalCode}

*Item Pesanan:*
${itemsText}

*Ringkasan:*
Subtotal: Rp ${subtotal.toLocaleString("id-ID")}
Ongkir (${form.shipping}): Rp ${shippingCost.toLocaleString("id-ID")}
PPN 11%: Rp ${tax.toLocaleString("id-ID")}
*TOTAL: Rp ${total.toLocaleString("id-ID")}*

Pembayaran: ${form.payment}
${form.note ? `Catatan: ${form.note}` : ""}

Terima kasih sudah memesan di TOKORO WEAR! 🖤`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    clearCart();
    setLoading(false);
    window.open(waUrl, "_blank");
    router.push("/");
  }

  return (
    <div className="pt-32 pb-20 px-6 md:px-10 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-5xl md:text-7xl font-headline font-black tracking-tighter uppercase leading-none">
          Checkout
        </h1>
        <div className="h-1 w-24 bg-primary mt-4" />
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Form */}
        <div className="lg:col-span-7 space-y-10">
          {/* Data diri */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-secondary mb-6">Data Penerima</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block mb-2">Nama Lengkap *</label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-outline/30 bg-transparent px-4 py-3 focus:outline-none focus:border-primary font-body text-sm"
                  placeholder="Steven Tokoro"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block mb-2">No. WhatsApp *</label>
                <input
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-outline/30 bg-transparent px-4 py-3 focus:outline-none focus:border-primary font-body text-sm"
                  placeholder="08123456789"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-outline/30 bg-transparent px-4 py-3 focus:outline-none focus:border-primary font-body text-sm"
                  placeholder="email@contoh.com"
                />
              </div>
            </div>
          </div>

          {/* Alamat */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-secondary mb-6">Alamat Pengiriman</h2>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block mb-2">Alamat Lengkap *</label>
                <input
                  name="address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border border-outline/30 bg-transparent px-4 py-3 focus:outline-none focus:border-primary font-body text-sm"
                  placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan, Kecamatan"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block mb-2">Kota</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border border-outline/30 bg-transparent px-4 py-3 focus:outline-none focus:border-primary font-body text-sm"
                    placeholder="Jakarta"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block mb-2">Provinsi</label>
                  <input
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                    className="w-full border border-outline/30 bg-transparent px-4 py-3 focus:outline-none focus:border-primary font-body text-sm"
                    placeholder="DKI Jakarta"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block mb-2">Kode Pos</label>
                  <input
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    className="w-full border border-outline/30 bg-transparent px-4 py-3 focus:outline-none focus:border-primary font-body text-sm"
                    placeholder="12345"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pembayaran */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-secondary mb-6">Metode Pembayaran</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Transfer Bank BCA", "Transfer Bank Mandiri", "Transfer Bank BRI", "GoPay", "OVO", "QRIS"].map((method) => (
                <label
                  key={method}
                  className={`flex items-center gap-3 border p-4 cursor-pointer transition-all ${
                    form.payment === method
                      ? "border-primary bg-primary/5"
                      : "border-outline/20 hover:border-outline/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={form.payment === method}
                    onChange={handleChange}
                    className="accent-black"
                  />
                  <span className="text-xs font-bold uppercase tracking-tight">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pengiriman */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-secondary mb-6">Metode Pengiriman</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["JNE REG", "JNE YES", "SiCepat REG", "SiCepat BEST", "J&T REG", "Gosend"].map((method) => (
                <label
                  key={method}
                  className={`flex items-center gap-3 border p-4 cursor-pointer transition-all ${
                    form.shipping === method
                      ? "border-primary bg-primary/5"
                      : "border-outline/20 hover:border-outline/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={method}
                    checked={form.shipping === method}
                    onChange={handleChange}
                    className="accent-black"
                  />
                  <span className="text-xs font-bold uppercase tracking-tight">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Catatan */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block mb-2">Catatan (opsional)</label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              rows={3}
              className="w-full border border-outline/30 bg-transparent px-4 py-3 focus:outline-none focus:border-primary font-body text-sm resize-none"
              placeholder="Contoh: tolong bungkus rapi, hadiah"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-32 bg-surface-container-lowest p-8 border border-outline-variant/10">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 font-headline">Ringkasan</h2>

            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-20 object-cover flex-shrink-0 bg-surface-container"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold uppercase text-xs tracking-tight truncate">{item.name}</p>
                    <p className="text-secondary text-[10px] mt-0.5">{item.color} · {item.size} · {item.quantity}x</p>
                    <p className="font-bold text-sm mt-1">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm border-t border-outline-variant/20 pt-6">
              <div className="flex justify-between">
                <span className="text-secondary">Subtotal</span>
                <span className="font-bold">Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Ongkir</span>
                <span className="font-bold">Rp {shippingCost.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">PPN 11%</span>
                <span className="font-bold">Rp {tax.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-xl font-black pt-4 border-t border-outline-variant/20">
                <span>TOTAL</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-[#25D366] text-white py-5 px-4 font-black uppercase tracking-widest text-sm hover:bg-[#20bd5a] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <span className="material-symbols-outlined">chat</span>
              {loading ? "Memproses..." : "Pesan via WhatsApp"}
            </button>

            <p className="text-[10px] text-secondary text-center mt-4 leading-relaxed">
              Anda akan diarahkan ke WhatsApp untuk konfirmasi pesanan dan pembayaran
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
