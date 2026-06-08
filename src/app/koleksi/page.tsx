"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Product } from "@/lib/store";

const CATEGORIES = ["Tops", "Bottoms", "Outerwear", "Aksesoris", "Technical Wear"];
const SIZES = ["S", "M", "L", "XL", "XXL"];

export default function KoleksiPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Terbaru");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filtered = products
    .filter((p) =>
      selectedCategories.length === 0 || selectedCategories.includes(p.category)
    )
    .filter((p) =>
      selectedSizes.length === 0 ||
      p.sizes?.some((s) => selectedSizes.includes(s.label) && s.stock > 0)
    )
    .sort((a, b) => {
      if (sortBy === "Harga Tertinggi") return b.price - a.price;
      if (sortBy === "Harga Terendah") return a.price - b.price;
      return 0;
    });

  return (
    <div className="pt-32 pb-20 px-10">
      {/* Editorial Header */}
      <header className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-4 block">
              Koleksi Kami
            </span>
            <h1 className="text-7xl md:text-9xl font-headline font-black tracking-tighter uppercase leading-[0.85] text-primary">
              SEMUA
              <br />
              KOLEKSI
            </h1>
          </div>
          <div className="flex items-center gap-4 border-b border-outline-variant/30 pb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              Sortir:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none font-bold uppercase text-sm tracking-tighter focus:ring-0 cursor-pointer outline-none"
            >
              <option>Terbaru</option>
              <option>Harga Tertinggi</option>
              <option>Harga Terendah</option>
            </select>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-16">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-12">
          {/* Category */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-primary/10 pb-4">
              Kategori
            </h3>
            <ul className="space-y-3">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <label className="flex items-center cursor-pointer text-sm uppercase tracking-tight font-medium hover:text-primary transition-colors text-secondary gap-3">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-4 h-4 border-primary accent-primary"
                    />
                    {cat}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Size */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-primary/10 pb-4">
              Ukuran
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`aspect-square border flex items-center justify-center text-xs font-bold transition-all ${
                    selectedSizes.includes(size)
                      ? "border-primary bg-primary text-white"
                      : "border-outline-variant/50 hover:bg-primary hover:text-white hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setSelectedSizes([]); setSelectedCategories([]); }}
            className="w-full bg-primary text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all"
          >
            Reset Filter
          </button>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-secondary uppercase tracking-widest text-sm">Memuat produk...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <span className="material-symbols-outlined text-5xl text-secondary mb-4">inventory_2</span>
              <p className="font-headline font-bold uppercase tracking-tight text-xl mb-2">
                {products.length === 0 ? "Koleksi Segera Hadir" : "Tidak ada produk"}
              </p>
              <p className="text-secondary text-sm">
                {products.length === 0
                  ? "Kami sedang mempersiapkan koleksi terbaik untuk Anda."
                  : "Coba ubah filter pencarian Anda."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
              {filtered.map((product) => (
                <Link
                  key={product.id}
                  href={`/produk/${product.slug || product.id}`}
                  className="group relative"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-low">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-surface-container">
                        <span className="material-symbols-outlined text-5xl text-secondary">image</span>
                      </div>
                    )}
                    {product.badge && (
                      <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-tighter mb-1 group-hover:underline underline-offset-4">
                        {product.name}
                      </h3>
                      <p className="text-xs text-secondary uppercase tracking-widest">
                        {product.category}
                      </p>
                    </div>
                    <p className="text-lg font-black tracking-tighter whitespace-nowrap">
                      IDR {product.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
