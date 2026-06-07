"use client";

import { useState } from "react";
import Link from "next/link";

const PRODUCTS = [
  {
    id: "x1-bomber",
    name: "X-1 Tech Shell Bomber",
    category: "Outerwear",
    price: 2499000,
    badge: "Premium Release",
    badgeColor: "bg-primary text-white",
    span: "md:col-span-2",
    aspect: "aspect-[16/9]",
    grayscale: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEIUCUQNo4u0psJeJyKIHvKgdFG8KKuKGfPeHbc2o4LhQQKcheWhnRHuQYapHnxoZCfgZF0GDsF59prAv1tbgwM7NCW6gIV0d5C0gQgkxORJK1zjI8WVdihJ7NlNVIR7spZ9606dOjf26Hw_6RGA9GGcP_nYJuhdtJu3H1ydcKfwId-7xPv99kKTqCx9L5YFQUNdv5pFPxqJGKT-8xVbWf9UysFvaVgQLXrrb62-2B0oLMkThAPHUTobC8XcEgz8JAKki_LfJwwig",
  },
  {
    id: "shadow-cap",
    name: "Shadow 6-Panel Cap",
    category: "Aksesoris",
    price: 450000,
    badge: "Stok Terbatas",
    badgeColor: "bg-error text-white",
    span: "",
    aspect: "aspect-[3/4]",
    grayscale: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmemiiBOYXozXcRWuVdlM9vKqFG16O32op3u1-8j1rX92VVVGXVEOPFaanWAuePHwwk_soOFT6v_dZXec2s076m0ZLfvqYgXe089dMawICpce3UgvgneUlFxl-zS5Y1BsqUMVrs__pZtvLwNIt_whlAtwxB6vLyjrVNENN3Ts_PD8lJ3q97B9gR3cpXSBiLe4dYMAO-Hfa30UzSf4Rpb49zgbR9REqJKMZg-B9PljUUH122NUOMgo0THPCpZF4JBFK3Y0JHJZBVaY",
  },
  {
    id: "archetype-tee",
    name: 'Heavy Box Tee "Archetype"',
    category: "Tops",
    price: 599000,
    badge: null,
    span: "",
    aspect: "aspect-[3/4]",
    grayscale: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLB-Pk710rJLNDoFQV8inJBMyCQwXxMhFmWJurAos7Bz6jHavxPLJFXtxybtuEo6V_ijlXzrMLgkDBj-E8glrhDkRX8d0m_MBld5X2nVkk_ReJWFMkw2RQOQo3i2WR8_safDieLWYpzWhqd_nJ7hKQum_QLKUvM5RCqbkzQhLcodjmx8Zb1IWQw1FOSyyBu3dI6tfAEonV73Jyt_DZXuxvYu3Pn7L960JhK1mLn03vny-Wk_39CXMYnwNQi8qdy-2ertplQrF2g74",
  },
  {
    id: "cargo-v2",
    name: "Cargo Utility Pant V2",
    category: "Bottoms",
    price: 1200000,
    badge: null,
    span: "",
    aspect: "aspect-[3/4]",
    grayscale: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7KFTKxVGcohwuBEL3JUT7JGfLn1-I3jyBkmZsrS9MOtJWBQRUXwOFOAib_7reilnVhFQhHniusrSyYQTAdUqi6r7URVCbkY695HhgO64Fl2gcjoh8P0u8dbeIaDHs7FVrg_tEou0oGzT6Dkii8McEhTCAJPeUU85vrIfylEI_wN_rfxZ6XcyQvxQjt4_-g1pUl6xyfrjqTrkfgpsAPF2F_e1yc3UpLWu6CSwFtjpkTX7fEB31GYwRWkoifNUzNOOGlsCxbdwyPCM",
  },
  {
    id: "void-hoodie",
    name: "Void Heavy Hoodie",
    category: "Tops",
    price: 1050000,
    badge: "Stok Terbatas",
    badgeColor: "bg-error text-white",
    span: "",
    aspect: "aspect-[3/4]",
    grayscale: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTOlo5uRTTozxuWemjFOu8jZ2PK5BjDrIQSTLR-o7UnKzCtUMXa17_Q3vQ59FVlWK4iv_YEAbZovDDnuTxyl8ACK8dyfDwgCEvQ_-ssZ--rB2UYU_5U7GarmtpvC4uJdCwfzoTo4jjsYGBePmwApUOeZtQ53Zc9-snQCuSFxZUlLRatuKketyVd_A1-7-genC756WwBUcyPYa8BvsRE3hhqblTb9Tc2Z9dAhJVX2HlzAcG1v_ZMAXjJPBvkShh0PM6IxSp7G0F2VM",
  },
];

const CATEGORIES = ["Outerwear", "Tops", "Bottoms", "Technical Wear"];
const SIZES = ["S", "M", "L", "XL"];

export default function KoleksiPage() {
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["M"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

  return (
    <div className="pt-32 pb-20 px-10">
      {/* Editorial Header */}
      <header className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-4 block">
              Archive 2024
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
            <select className="bg-transparent border-none font-bold uppercase text-sm tracking-tighter focus:ring-0 cursor-pointer outline-none">
              <option>Terbaru</option>
              <option>Terlaris</option>
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

          {/* Price */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-primary/10 pb-4">
              Harga
            </h3>
            <div className="space-y-4">
              <input
                type="range"
                className="w-full accent-primary h-1 bg-surface-container-highest cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-secondary">
                <span>IDR 0</span>
                <span>IDR 5.000K</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-primary text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary-container transition-all">
            Terapkan Filter
          </button>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
            {PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={`/produk/${product.id}`}
                className={`group relative ${product.span}`}
              >
                <div
                  className={`relative ${product.aspect} overflow-hidden bg-surface-container-low`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                      product.grayscale
                        ? "grayscale group-hover:grayscale-0"
                        : ""
                    }`}
                  />
                  {product.badge && (
                    <div
                      className={`absolute top-4 left-4 ${product.badgeColor} px-4 py-2 text-[10px] font-bold uppercase tracking-widest`}
                    >
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

          {/* Pagination */}
          <div className="mt-32 flex justify-center items-center gap-12">
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-30 cursor-not-allowed">
              <span className="material-symbols-outlined">arrow_back</span> Prev
            </button>
            <div className="flex gap-8">
              <span className="text-sm font-bold border-b-2 border-primary">
                01
              </span>
              <span className="text-sm font-bold text-secondary hover:text-primary cursor-pointer transition-colors">
                02
              </span>
              <span className="text-sm font-bold text-secondary hover:text-primary cursor-pointer transition-colors">
                03
              </span>
            </div>
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-all">
              Next{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
