"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/store";

const CATEGORIES = ["Outerwear", "Tops", "Bottoms", "Aksesoris", "Technical Wear"];
const BADGES = ["", "Baru", "Habis", "Stok Terbatas", "Premium Release"] as const;
const DEFAULT_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];

type Props = {
  initialData?: Partial<Product>;
  mode: "create" | "edit";
  productId?: string;
};

export default function ProductForm({ initialData, mode, productId }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(initialData?.name ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "Outerwear");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [price, setPrice] = useState(String(initialData?.price ?? ""));
  const [originalPrice, setOriginalPrice] = useState(String(initialData?.originalPrice ?? ""));
  const [imageUrl, setImageUrl] = useState(initialData?.images?.[0] ?? "");
  const [badge, setBadge] = useState<string>(initialData?.badge ?? "");
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);

  // Colors
  const [colors, setColors] = useState<{ name: string; hex: string }[]>(
    initialData?.colors ?? [{ name: "Obsidian Black", hex: "#000000" }]
  );

  // Sizes
  const [sizes, setSizes] = useState<{ label: string; stock: number }[]>(
    initialData?.sizes ?? [
      { label: "S", stock: 0 },
      { label: "M", stock: 0 },
      { label: "L", stock: 0 },
      { label: "XL", stock: 0 },
    ]
  );

  function addColor() {
    setColors([...colors, { name: "", hex: "#000000" }]);
  }

  function removeColor(i: number) {
    setColors(colors.filter((_, idx) => idx !== i));
  }

  function updateColor(i: number, key: "name" | "hex", val: string) {
    setColors(colors.map((c, idx) => (idx === i ? { ...c, [key]: val } : c)));
  }

  function addSize(label: string) {
    if (sizes.find((s) => s.label === label)) return;
    setSizes([...sizes, { label, stock: 0 }]);
  }

  function removeSize(i: number) {
    setSizes(sizes.filter((_, idx) => idx !== i));
  }

  function updateStock(i: number, val: string) {
    setSizes(sizes.map((s, idx) => (idx === i ? { ...s, stock: parseInt(val) || 0 } : s)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name: name.toUpperCase(),
      category,
      description,
      price: parseInt(price.replace(/\D/g, "")),
      originalPrice: originalPrice ? parseInt(originalPrice.replace(/\D/g, "")) : null,
      images: imageUrl ? [imageUrl] : [],
      colors,
      sizes,
      badge: badge || null,
      isActive,
    };

    const url = mode === "create" ? "/api/admin/products" : `/api/admin/products/${productId}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setError("Gagal menyimpan produk. Coba lagi.");
      setSaving(false);
      return;
    }

    router.push("/admin/produk");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-3xl">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-xs font-bold uppercase tracking-widest">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <section className="space-y-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 border-b border-white/5 pb-3">
          Informasi Dasar
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="admin-label">Nama Produk</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="NAMA PRODUK"
              className="admin-input"
            />
          </div>

          <div>
            <label className="admin-label">Kategori</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="admin-input">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="admin-label">Badge</label>
            <select value={badge} onChange={(e) => setBadge(e.target.value)} className="admin-input">
              {BADGES.map((b) => <option key={b} value={b}>{b || "— Tidak Ada —"}</option>)}
            </select>
          </div>

          <div className="col-span-2">
            <label className="admin-label">Deskripsi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="admin-input resize-none"
              placeholder="Deskripsi produk..."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="space-y-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 border-b border-white/5 pb-3">
          Harga
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Harga Jual (Rp)</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="2499000"
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Harga Coret / Original (Rp) — opsional</label>
            <input
              type="text"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="3199000"
              className="admin-input"
            />
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="space-y-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 border-b border-white/5 pb-3">
          Foto Produk
        </h2>
        <div>
          <label className="admin-label">URL Foto Utama</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="admin-input"
          />
          {imageUrl && (
            <div className="mt-3 w-24 h-32 bg-white/5 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </section>

      {/* Colors */}
      <section className="space-y-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 border-b border-white/5 pb-3">
          Warna
        </h2>
        <div className="space-y-3">
          {colors.map((color, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="color"
                value={color.hex}
                onChange={(e) => updateColor(i, "hex", e.target.value)}
                className="w-10 h-10 cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={color.name}
                onChange={(e) => updateColor(i, "name", e.target.value)}
                placeholder="Nama warna"
                className="admin-input flex-1"
              />
              <button type="button" onClick={() => removeColor(i)} className="p-2 hover:text-red-400 text-white/30 transition-colors">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          ))}
          <button type="button" onClick={addColor} className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px]">add</span> Tambah Warna
          </button>
        </div>
      </section>

      {/* Sizes & Stock */}
      <section className="space-y-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 border-b border-white/5 pb-3">
          Ukuran & Stok
        </h2>

        {/* Quick add size buttons */}
        <div className="flex flex-wrap gap-2">
          {DEFAULT_SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addSize(s)}
              disabled={!!sizes.find((sz) => sz.label === s)}
              className="px-3 py-1.5 border border-white/10 text-xs font-bold uppercase hover:border-white/30 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            >
              + {s}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {sizes.map((size, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="w-16 text-sm font-bold uppercase text-center border border-white/10 py-2">
                {size.label}
              </span>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="number"
                  value={size.stock}
                  onChange={(e) => updateStock(i, e.target.value)}
                  min={0}
                  className="admin-input w-32"
                  placeholder="0"
                />
                <span className="text-xs text-white/30 uppercase tracking-widest">pcs</span>
              </div>
              <button type="button" onClick={() => removeSize(i)} className="p-2 hover:text-red-400 text-white/20 transition-colors">
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Status */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 border-b border-white/5 pb-3">
          Status
        </h2>
        <label className="flex items-center gap-4 cursor-pointer">
          <div
            onClick={() => setIsActive(!isActive)}
            className={`relative w-12 h-6 transition-colors ${isActive ? "bg-green-500" : "bg-white/10"}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white transition-all ${isActive ? "left-7" : "left-1"}`} />
          </div>
          <span className="text-sm font-bold uppercase tracking-wide">
            {isActive ? "Aktif — Ditampilkan di toko" : "Nonaktif — Disembunyikan dari toko"}
          </span>
        </label>
      </section>

      {/* Submit */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/5">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-white text-black px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[16px]">save</span>
          {saving ? "Menyimpan..." : mode === "create" ? "Simpan Produk" : "Update Produk"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/produk")}
          className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
