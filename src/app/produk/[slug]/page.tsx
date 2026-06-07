"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const COLORS = [
  { name: "Obsidian Black", bg: "bg-black" },
  { name: "Ash Gray", bg: "bg-surface-container-highest" },
  { name: "Charcoal", bg: "bg-[#3B3B3B]" },
];

const SIZES = [
  { label: "S", available: true },
  { label: "M", available: true },
  { label: "L", available: true },
  { label: "XL", available: false },
];

const FEATURES = [
  {
    icon: "water_drop",
    title: "Waterproof Rating",
    desc: "20,000mm water column resistance.",
  },
  {
    icon: "air",
    title: "Breathability",
    desc: "Advanced moisture-wicking inner membrane.",
  },
  {
    icon: "layers",
    title: "3-Layer Laminate",
    desc: "Ultra-lightweight structural fabric system.",
  },
];

const RECOMMENDATIONS = [
  {
    id: "cargo-v2",
    name: "ARID CARGO PANTS",
    price: 1299000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbEcbw3SuVkaMO9IrZ7ZVSjLYaRDrOTdxKlRyaubOf7RrSlXl2muE5dYd645SeeXmkqf8Vl01bpYjLvR28LvCYrLxAvWxru1UBEwyUrZxxNhLxn1mg31W7hdw1MZEh3y11pm9OVd9O5j3APQd3P2ZsXqI_8ri7-bCBU83BzrmyMBuOREe0-C0tuMYoNZvDKDccxG3dgvW0wJ1OEPuiYF4fEtq8qjegsov4_37jRR21rSc-zmNGLLzgc-lR6h_Bq__TdC6kzuB8aVM",
  },
  {
    id: "vector-tee",
    name: "VECTOR OVERSIZED TEE",
    price: 549000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAX-8lV225Atd6g2coLi_5XNyJ2gBm_dWW0ySs8hruHGh2lrs7919_kfyqkfyF7b0zt1_jfBvDkUDznLV63QIsjVVtwMVjZ9Dfq5f8MpjPVJu7ibgNuAa3oMqSKBMjdEURKDvJiusGk58aSxJOuQb64V89b6FlfHHwHk4Enw0wxvcPej7HaE--Vduc8LKzgEjwxV9qO2W2FiNgW_ucUhYFRCmE3ZB2rzyrqmAVh5tYMq1x1Dgir6PROXyybgMqB4edf5CrWJGA-9Dk",
  },
  {
    id: "stealth-vest",
    name: "STEALTH MODULAR VEST",
    price: 1899000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvQriiGOSkD0Bhs8U4Rax2RjHMNt7DfjwBLf8DTvMY_KRfaoBK3_E5ebL67-9hlUhP8dt7Lahz5EKZJX1l_3m-772aSkV8GVgC-KZgyp31H-c4LqCYI8Mgup92MoLURIWQo3tC4We3xnlYklfNTNd7vhCv4A5Qm1R3E7GRA3rGuYBkvwRNYcMidzD9941juiNwIp0irOkniS0E3u5-PbIb4vKxK1OD0hb5QGwr5xwx7dX-u5KPdnaD1ORHHwh8eVamQMdmmSZi-VA",
  },
  {
    id: "core-hoodie",
    name: "CORE STRUCTURE HOODIE",
    price: 1149000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWvt1ZRFyfYyTX4sOJRYuTbwHU5vo68WMJGSe0-fOMEN_TBWyVDcrZYAFdU0g73Krl2KCgIrNh-nnK38nw1oXExWd-921weDwmxxWmpPO0EmJXV_V1VLBi0zyE8eViX60aZCY6V680Qef6aDnFMkpZo0dwvujrcGaiJHcbXduIYT1U9uevsM9osdPVjeELwoqa5ApGtf3YjyYDvDvm1Yzxy7CUUo8LMGdJZZRM6UjeWPwNhyC-5XnBCX8Vn3CAIjMl5FCqDwHwhnE",
  },
];

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem({
      id: "kaze-tech-shell",
      name: "KAZE TECH SHELL",
      price: 2499000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG4BxoSLng4gMDePGgF-VadeAjeDOPcSS9qzOsmmuY0sZZMUsE7_s4BrFGK8CMZInbMEbd_RU5rJ2dGEYXOmmqP7CWhC_8O2rLnly6iYs11hiba4P4bvU2Et-vmfS-6bxlKko4LT_o3aYrG_7LWdQi5WMLsyZ9cil0hSp92OPikNAVUsy8VDq3KRrjOrtvsH7emyE-rASDpd7jc457l5-DcYH7mzibD4HB9dRpMcOX8QKM3FEB5tZ2_M9WQw07exZ4OmvZH1XWqYY",
      color: COLORS[selectedColor].name,
      size: selectedSize,
      quantity: 1,
    });
    router.push("/keranjang");
  };

  return (
    <div className="pt-32 pb-20 px-6 md:px-10 lg:px-20 max-w-[1920px] mx-auto">
      {/* Breadcrumb */}
      <div className="mb-10 flex items-center gap-3 font-label text-[10px] tracking-[0.2em] uppercase text-outline">
        <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <Link href="/koleksi" className="hover:text-primary transition-colors">Koleksi</Link>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <span className="text-primary font-bold">Kaze Tech Shell</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        {/* Images */}
        <div className="lg:col-span-7 grid grid-cols-1 gap-6">
          <div className="relative aspect-[3/4] bg-surface-container overflow-hidden group">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG4BxoSLng4gMDePGgF-VadeAjeDOPcSS9qzOsmmuY0sZZMUsE7_s4BrFGK8CMZInbMEbd_RU5rJ2dGEYXOmmqP7CWhC_8O2rLnly6iYs11hiba4P4bvU2Et-vmfS-6bxlKko4LT_o3aYrG_7LWdQi5WMLsyZ9cil0hSp92OPikNAVUsy8VDq3KRrjOrtvsH7emyE-rASDpd7jc457l5-DcYH7mzibD4HB9dRpMcOX8QKM3FEB5tZ2_M9WQw07exZ4OmvZH1XWqYY"
              alt="Kaze Tech Shell Front View"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-primary text-white font-label text-[10px] uppercase tracking-widest px-4 py-2">
                Terbaru
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="aspect-square bg-surface-container overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcfxG_9rdW1CuXS719BDRG1P6so9IakIIAD2cQQrCvQuoKC1-GfTjwFlnefY6-obsuKimASvfF1_AMheDrwdOvdCAGnrJsh58kQc8Ujs1n07REESLW6UXgYWPXg806AlMPFQfpozzhzZgl_cOyGkd2pfbHc98G-u1VbX_4JVzCspn4roy1yKg7OFv8PPctlWyWnFYZmTpOvGjeJz7vVOh06qA59dM9EtlrhFxUc9zZXfItpdup6liIY1Za_mXELJSFJDqbotq_6I"
                alt="Detail 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-surface-container overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6dd9bwyQoqClGdZy7M2kkTkvf86uixDdx5lr7azU18K79jN6UNmxQCB_q27BVcISqx4WifZYUb5unj8zFcpz9H5WUVzlRQg7VKPJTpr-VOWgu0h6u8fZZmV_xBfOu8l5gMp6AdnaA7DhrIxsGShQmXlH_mIkXKQu5Ij6sekdYENG9ig4mQYVofo8LpXkWkFmDHUoA2NCAgAdhAYM-evmmCayVb9FenIWWAD7E_0l-NkDinNvnR4k9FJzN905FtK6jowvn5VMe6iM"
                alt="Detail 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-5 sticky top-32 space-y-12">
          <section>
            <h1 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter leading-none mb-4">
              KAZE TECH
              <br />
              SHELL
            </h1>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-headline font-bold text-primary">
                IDR 2.499.000
              </span>
              <span className="text-lg font-headline text-outline line-through">
                IDR 3.199.000
              </span>
            </div>
            <p className="text-secondary leading-relaxed font-body max-w-lg">
              Mendefinisikan ulang batas antara utilitas perkotaan dan estetika
              avant-garde. KAZE Tech Shell dirancang dengan kain laminasi 3-lapis
              yang tahan air dan angin.
            </p>
          </section>

          <div className="space-y-10">
            {/* Color */}
            <div className="space-y-4">
              <h3 className="font-label text-[11px] uppercase tracking-[0.3em] text-outline font-bold">
                Pilih Warna / {COLORS[selectedColor].name}
              </h3>
              <div className="flex gap-3">
                {COLORS.map((color, i) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(i)}
                    title={color.name}
                    className={`w-10 h-10 ${color.bg} border transition-all ${
                      selectedColor === i
                        ? "border-primary ring-offset-2 ring-1 ring-primary"
                        : "border-outline-variant hover:border-primary"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <h3 className="font-label text-[11px] uppercase tracking-[0.3em] text-outline font-bold">
                  Pilih Ukuran
                </h3>
                <button className="text-[10px] uppercase tracking-widest underline font-bold hover:text-outline transition-colors">
                  Panduan Ukuran
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => size.available && setSelectedSize(size.label)}
                    disabled={!size.available}
                    className={`py-4 border font-label text-sm font-bold transition-all ${
                      !size.available
                        ? "border-outline-variant opacity-30 cursor-not-allowed"
                        : selectedSize === size.label
                        ? "border-primary bg-black text-white border-2"
                        : "border-outline-variant hover:border-primary hover:bg-black hover:text-white"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-white py-6 font-headline font-bold uppercase tracking-widest text-lg hover:bg-primary-container transition-all active:scale-[0.98]"
            >
              TAMBAH KE KERANJANG
            </button>
            <button className="w-full border-2 border-primary text-primary py-6 font-headline font-bold uppercase tracking-widest text-lg hover:bg-primary hover:text-white transition-all active:scale-[0.98]">
              BELI SEKARANG
            </button>
          </div>

          {/* Features */}
          <div className="pt-8 space-y-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">{f.icon}</span>
                <div>
                  <p className="font-label text-xs font-bold uppercase tracking-wider">
                    {f.title}
                  </p>
                  <p className="text-sm text-secondary">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <section className="mt-40">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="text-4xl md:text-6xl font-headline font-black uppercase tracking-tighter leading-none">
            REKOMENDASI
            <br />
            UNTUKMU
          </h2>
          <Link
            href="/koleksi"
            className="font-label text-[11px] uppercase tracking-[0.3em] font-bold border-b-2 border-primary pb-2 hover:opacity-70 transition-opacity"
          >
            Lihat Semua Koleksi
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-outline-variant/10">
          {RECOMMENDATIONS.map((rec) => (
            <Link
              key={rec.id}
              href={`/produk/${rec.id}`}
              className="bg-surface group"
            >
              <div className="aspect-[3/4] overflow-hidden bg-surface-container">
                <img
                  src={rec.image}
                  alt={rec.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 space-y-2">
                <h4 className="font-headline font-bold uppercase text-lg">
                  {rec.name}
                </h4>
                <p className="font-label text-sm text-outline tracking-wider">
                  IDR {rec.price.toLocaleString("id-ID")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
