import Link from "next/link";

export default function TentangPage() {
  return (
    <div className="pt-32 pb-20 px-10 max-w-4xl mx-auto">
      <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-4 block">
        Tentang Kami
      </span>
      <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter uppercase leading-[0.85] text-primary mb-16">
        KISAH
        <br />
        BRAND
      </h1>

      <div className="space-y-12 text-lg font-body leading-relaxed text-secondary">
        <p>
          <strong className="text-primary">TOKORO WEAR</strong> lahir dari persimpangan antara
          estetika fungsional Tokyo dan energi liar Jakarta. Kami tidak hanya membuat pakaian;
          kami merancang seragam bagi mereka yang menolak untuk tunduk pada konvensi.
        </p>
        <p>
          Setiap jahitan adalah pernyataan. Setiap bahan dipilih untuk ketahanan urban.
          Dari jalanan Jakarta hingga sudut-sudut Tokyo, TOKORO WEAR hadir untuk generasi
          yang berani menentukan gaya mereka sendiri.
        </p>
        <p>
          Kami percaya bahwa pakaian bukan sekadar penutup tubuh — ia adalah ekspresi
          identitas, pernyataan sikap, dan armor bagi jiwa-jiwa yang bebas.
        </p>
      </div>

      <div className="mt-20 pt-12 border-t border-outline-variant/20">
        <Link
          href="/koleksi"
          className="inline-flex items-center gap-4 group"
        >
          <span className="font-headline font-bold uppercase tracking-widest text-lg group-hover:underline">
            JELAJAHI KOLEKSI
          </span>
          <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
}
