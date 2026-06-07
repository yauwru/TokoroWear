import Link from "next/link";

const FEATURED_CATEGORIES = [
  {
    label: "T-shirt",
    span: "md:col-span-2",
    aspect: "aspect-square",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuADkGyipGKX-Cc7N2gpLp2VKmoQOubpXjfgtdx2tqcaf8vB44htA9GbOioHisXT3YIdAf0uRhxqZJPkvhwEAnjY-V7aToaK4dSP63p9TUVKpCl4gTqQHuELhrxEzeYcITAh629wd9O-VR2YNgt8kKG4e8rQ1ZUHE_n0_pPxlV8ozjRCpFvDqM586dIuVpFJa6NQdyHT1kSHZNeoA-UpKwUb-xAsAlTKHRZxlKK45tJXTpBNrt7-SaTbkX7g-Dd4f-R2WpA7b8J9o",
    textColor: "text-white mix-blend-difference",
    position: "bottom-10 left-10",
  },
  {
    label: "Hoodie",
    span: "",
    aspect: "aspect-square",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBouaDHrMdUOSYHDGHFgtqdTtV7x2C_8heJjqykSgX4bStwP21MTxe9wd7t7XpP68mmWvSxhdjcFdCBkUN7R-mJBJjV83mdvG_LQIeskrWGc2i19khhYW-bW2_jHdVjKZr5tx0c9dV9tNww_qx2K5c4dQKCXTSZs7-ZymP9Fw2YtUJjGpv_At9J0jOA3a6H6XrkslsiF2JFWlIuq7OMAEzlWJn5GwkM-rPm2-41z1Jk8P8mmFsy8dDiHQkA4jFZ0cxX_f9KpJzfTqA",
    textColor: "text-white",
    position: "bottom-6 left-6",
  },
  {
    label: "Celana",
    span: "",
    aspect: "aspect-square",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYo2f8uNKX0MvfRsDI14LtPG1qaza8WiPIw-hLzg2FKQh3_MjjMQvD79MdNfHisgMWcO1b6jUusNgzw4B4obWFo3zKrpMAx5Mxa8BIck_1603MjccOi1Zo3QsW9d50LQzmt0T3vJ_EAm3B7xyoeIQocsKhbLCPg-tiMtHWWWyCyDfMDVbxu2GP-HDBwaPzvNh9Xr3nh0jSFDfqmQQw1mYJKidNa_ZAyGRK-JlTB1giL0BnldfRcic9lGJJxovP1Xd3awKTNQvPRfg",
    textColor: "text-black",
    position: "bottom-6 left-6",
  },
  {
    label: "Jersey",
    span: "md:col-span-2",
    aspect: "aspect-[16/9]",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIR9xJgTMnLPXc3lt_e8OzA36gRCVk66WibeN9UBj0Y2zTviqx-JBcuX8O1wxwwIrQdvfwPMLyg58Tyw0G0pJJKGQSN1MKbXKb1dRDSTURYK08DuOeMqZfbty4zxQdxjTSTQL4COT9ZBdPSUTZeguIikfe0c78xnTNOJw2pvxALJte6SncLCuxEValaaB10pTGFsZJ09g8-FEGNJ6GTUbJ5y8QS4qk7DV5q8nrHiOX4A2-y8pSj1JEgB9onL7VTm6-2lsTrrBtrII",
    textColor: "text-black",
    position: "top-10 right-10 text-right",
    sublabel: "EDISI TERBATAS",
  },
];

const NEW_PRODUCTS = [
  {
    id: "vault-jacket",
    category: "Outerwear",
    name: "Vault Technical Jacket",
    price: 1899000,
    badge: "Baru",
    badgeColor: "bg-primary text-white",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKZh6CLwmY0-h4kGuUhPIxK50BIJ5Lyvry4_WxFUsQTADDC6kshdlwcuOoVpVrf6UZc4kefxPNgnmsJyaFTgjWkXrr2UfR7lXa_3lcUsFBuzuXdMPX-itQUu1ZJRRQmdrKddMwMDHk73eLeSNNZRwHfZKKulzwrtoxrGWdSuK99Y-LLgaym5PFt2L6LihQOuEwo91XRb4sAK94LZmOVYU3GbDa6hw4PlwCrjkxk5SB3HuqHHaqcJUsxWshEx8Mtat7Q_yvOxF7OW8",
  },
  {
    id: "monolith-tee",
    category: "T-shirt",
    name: "Monolith Heavy Tee",
    price: 449000,
    badge: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaOwji4S4ozQVKZzp9NLT8P4yYtECSd1W3-SEmPiuqT73sdL_sydSGu4ahaxDbGgCHH6ct8mvCaRxmiADpWCusGPBLFw3ThisbqSPcKazbadCaC_oAfkKjCe7UmzKPTTiVHIAPGwu8WeuO7c5K6lcsaPKknkha0RtVojxSWx1gmXqKuOB94Mff4Nazokb6bNXKYmatvLuN90HkEVEUFE1LfgLs5RB11OlySE3_aIXn5800OV1puh8j9P-D4LIx0AqU0LciSosaKuY",
  },
  {
    id: "cyber-pack",
    category: "Aksesoris",
    name: "Cyber Utility Pack",
    price: 799000,
    badge: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCxn2jSdmt1ZPEvb5MiSAlworkh991AKfGeXpA-9zSH3-em9F3uzt60-_eMKusEtkgHNk-wLGOdvwsAzNK9cwx00r4B_TEECIJIga0yBphA9Gb2B0th2dfy5XmKRf4bt4TNgMS3DQdsiKuljUww0nEFHsvTyqIQ67T2KTEd3hcSEPe8Ji4P4q9EvDsdBE4Ld3sZY3eoRq79E9QKWIgrPrf9wjrPbx9mojNejY5Htf2VUb9O-4r7p_FCba6BzV5VZ2xbEScoZRpzII",
  },
  {
    id: "core-cargo",
    category: "Pants",
    name: "Core Cargo Jogger",
    price: 949000,
    badge: "Habis",
    badgeColor: "bg-error text-white",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBM7W6LmEuE9SzyWaNf4oSEV6MK8IldHuCsoP8WCR5p-VhqM1dNyo1e2wzhyuaXa7oF409ygfLH-XdbpkYwdjl93rVhiLyWcLeZb9zdHRoMAD_3B874yhxDWR7Bb0fnWqm0WEoB3liC67akEyosxP57a48OMYaxL-R6uScjfWO24mCQ01rl-rLlyGpfq2MjKHWYQy4l_zMZCXZiSNKCCZM3o766-mbev5zaldT64kWrzNXCGvMU95CwICQOU9aqqkKVZlH9T27PsDI",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end px-10 pb-24 pt-24">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXLKySbB_HICXL85HZqtFx6e2KBkDEg3v1yWP93-RVEf6ARK8ciU-VLA9ldo3EAXj5fFf0dUdogT7euAYMflMD_nrEjkCxijHuWTxbmytcDidxtNZyuveT76ODypSHGj6-FJllkesnXnw_PZiGGIk5DxrLIy0bSVJaWd5dXFlGVKN9TkCphKZaPXqo-KbttwLxBKjB2cq_fkrmtS93xeuEkSqXX1GJ4qlhpqiGHGkS-b_5uf4JxvX0OaXQSTFSL2iml4kUzbSojwE"
            alt="Hero"
            className="w-full h-full object-cover filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <p className="text-white/50 font-label text-xs tracking-[0.4em] uppercase mb-6">
            Est. 2024 / Tokyo–Jakarta
          </p>
          <h1 className="text-7xl md:text-[9rem] font-headline font-black text-white leading-[0.85] tracking-tighter mb-10">
            STREETWEAR
            <br />
            UNTUK
            <br />
            GENERASI
            <br />
            BERANI
          </h1>
          <div className="flex items-center gap-6">
            <Link
              href="/koleksi"
              className="bg-white text-black px-10 py-5 font-headline font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              JELAJAHI SEKARANG
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="py-32 px-10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-secondary font-label uppercase tracking-[0.2em] text-xs">
              Kurasi Musim Ini
            </span>
            <h2 className="text-5xl font-headline font-black uppercase tracking-tighter mt-2">
              Koleksi Unggulan
            </h2>
          </div>
          <div className="h-px bg-outline-variant flex-grow mx-12 mb-2" />
          <Link
            href="/koleksi"
            className="font-headline font-bold uppercase border-b-2 border-primary pb-1 hover:opacity-70 transition-opacity whitespace-nowrap"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-[600px]">
          {FEATURED_CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href="/koleksi"
              className={`relative group overflow-hidden bg-surface-container ${cat.span}`}
            >
              <div className={`${cat.aspect} w-full overflow-hidden`}>
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              <div className={`absolute ${cat.position}`}>
                <h3 className={`text-3xl font-headline font-black uppercase ${cat.textColor}`}>
                  {cat.label}
                </h3>
                {cat.sublabel && (
                  <p className="text-xs font-body tracking-widest text-secondary mt-1">
                    {cat.sublabel}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW PRODUCTS */}
      <section className="bg-surface-container-low py-32 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-20">
            <h2 className="text-5xl md:text-6xl font-headline font-black uppercase tracking-tighter">
              Produk Terbaru
            </h2>
            <div className="flex gap-3">
              <button className="w-12 h-12 border border-outline flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-12 h-12 border border-outline flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {NEW_PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={`/produk/${product.id}`}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden bg-white mb-6 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {product.badge && (
                    <div
                      className={`absolute top-4 left-4 ${product.badgeColor} px-3 py-1 text-[10px] font-label font-bold uppercase tracking-widest`}
                    >
                      {product.badge}
                    </div>
                  )}
                </div>
                <p className="font-label text-xs text-secondary uppercase tracking-widest mb-1">
                  {product.category}
                </p>
                <h3 className="font-headline font-bold text-lg uppercase tracking-tight group-hover:underline underline-offset-4">
                  {product.name}
                </h3>
                <p className="font-body text-primary font-bold mt-2">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="py-40 px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5 relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiKWxmcFLkcpesr145UmnfkT4fU6D2qGC03gy86SIOqT873sRharF2D53auB0aChnd1tSF98yRRwmXLdTSi5VWxTCNxqvkJCtzAQDnPrYyviQQ3HmSHDjc-2pEn_-C1Lwp5EEkzNT8uHXWXe9JYuhJY4vu1c7EE2dOOGwrzoBwwma6EvNQ_9imYe5krz3R6E2e_pL6ZHZgJAXGvlGS-I11L061LZulOoTVLHRX9wwrTnBNwW4_P8pwgXyNLjD5i1HEEzrpSVU_omc"
              alt="Brand Story"
              className="w-full aspect-[4/5] object-cover grayscale"
            />
            <div className="absolute -bottom-10 -right-10 bg-primary p-12 hidden md:flex items-center justify-center">
              <span className="text-white font-headline text-5xl font-black">
                2024
              </span>
            </div>
          </div>

          <div className="md:col-start-7 md:col-span-5 flex flex-col justify-center">
            <span className="text-secondary font-label uppercase tracking-[0.4em] text-xs mb-6">
              Filosofi Kami
            </span>
            <h2 className="text-6xl font-headline font-black uppercase leading-none tracking-tighter mb-10">
              Kisah
              <br />
              Brand
            </h2>
            <p className="font-body text-xl leading-relaxed text-secondary mb-8">
              TOKORO WEAR lahir dari persimpangan antara estetika fungsional
              Tokyo dan energi liar Jakarta. Kami tidak hanya membuat pakaian;
              kami merancang seragam bagi mereka yang menolak untuk tunduk pada
              konvensi.
            </p>
            <p className="font-body text-lg leading-relaxed text-on-surface mb-12">
              Setiap jahitan adalah pernyataan. Setiap bahan dipilih untuk
              ketahanan urban.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-4 group w-fit"
            >
              <span className="font-headline font-bold uppercase tracking-widest text-lg group-hover:underline">
                BACA SELENGKAPNYA
              </span>
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="bg-black py-32 px-10 flex flex-col items-center text-center">
        <h2 className="text-white font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
          Dapatkan Akses Eksklusif
        </h2>
        <p className="text-gray-400 font-body max-w-xl mb-12 text-lg">
          Jadilah yang pertama mengetahui koleksi terbatas dan kolaborasi rahasia
          kami.
        </p>
        <form className="w-full max-w-2xl flex flex-col md:flex-row gap-0">
          <input
            type="email"
            placeholder="ALAMAT EMAIL ANDA"
            className="flex-grow bg-white/10 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-white py-6 px-8 font-headline font-bold tracking-widest"
          />
          <button
            type="submit"
            className="bg-white text-black px-12 py-6 font-headline font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
          >
            DAFTAR
          </button>
        </form>
      </section>
    </div>
  );
}
