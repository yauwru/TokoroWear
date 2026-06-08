const FAQS = [
  {
    q: "Bagaimana cara memesan produk?",
    a: "Pilih produk yang Anda inginkan, tambahkan ke keranjang, lalu klik checkout. Anda akan diarahkan ke WhatsApp untuk menyelesaikan pesanan.",
  },
  {
    q: "Berapa lama pengiriman?",
    a: "Estimasi pengiriman 2–5 hari kerja untuk wilayah Jabodetabek, dan 3–7 hari kerja untuk luar Jabodetabek.",
  },
  {
    q: "Apakah bisa retur atau tukar ukuran?",
    a: "Ya, kami menerima retur dalam 7 hari setelah barang diterima, selama produk belum digunakan dan masih dalam kondisi asli.",
  },
  {
    q: "Metode pembayaran apa yang tersedia?",
    a: "Kami menerima transfer bank, e-wallet (GoPay, OVO, Dana), dan COD untuk wilayah tertentu. Detail akan dikonfirmasi via WhatsApp.",
  },
  {
    q: "Bagaimana cara melacak pesanan?",
    a: "Setelah pesanan dikonfirmasi, kami akan mengirimkan nomor resi via WhatsApp untuk Anda lacak.",
  },
  {
    q: "Apakah produk tersedia di toko fisik?",
    a: "Saat ini kami beroperasi secara online. Ikuti newsletter kami untuk update event pop-up store.",
  },
];

export default function BantuanPage() {
  return (
    <div className="pt-32 pb-20 px-10 max-w-3xl mx-auto">
      <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-4 block">
        Pusat Bantuan
      </span>
      <h1 className="text-6xl font-headline font-black tracking-tighter uppercase leading-[0.85] text-primary mb-16">
        FAQ
      </h1>

      <div className="space-y-0">
        {FAQS.map((faq, i) => (
          <div key={i} className="border-b border-outline-variant/20 py-8">
            <h3 className="font-headline font-bold uppercase tracking-tight text-lg mb-3">
              {faq.q}
            </h3>
            <p className="font-body text-secondary leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-surface-container-low">
        <p className="font-body text-secondary mb-4">Masih ada pertanyaan?</p>
        <a
          href="https://wa.me/79149496407"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 font-headline font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">chat</span>
          Hubungi via WhatsApp
        </a>
      </div>
    </div>
  );
}
