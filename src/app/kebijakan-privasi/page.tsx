export default function KebijakanPrivasiPage() {
  return (
    <div className="pt-32 pb-20 px-10 max-w-3xl mx-auto">
      <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-4 block">
        Legal
      </span>
      <h1 className="text-5xl font-headline font-black tracking-tighter uppercase leading-[0.85] text-primary mb-16">
        Kebijakan
        <br />
        Privasi
      </h1>

      <div className="space-y-10 font-body text-secondary leading-relaxed">
        <section>
          <h2 className="font-headline font-bold uppercase tracking-tight text-primary text-xl mb-4">
            1. Informasi yang Kami Kumpulkan
          </h2>
          <p>
            Kami mengumpulkan informasi yang Anda berikan saat melakukan pembelian atau
            mendaftar newsletter, termasuk nama, alamat email, nomor telepon, dan alamat pengiriman.
          </p>
        </section>

        <section>
          <h2 className="font-headline font-bold uppercase tracking-tight text-primary text-xl mb-4">
            2. Penggunaan Informasi
          </h2>
          <p>
            Informasi Anda digunakan untuk memproses pesanan, mengirimkan konfirmasi, dan
            mengirimkan informasi koleksi terbaru jika Anda telah berlangganan newsletter.
          </p>
        </section>

        <section>
          <h2 className="font-headline font-bold uppercase tracking-tight text-primary text-xl mb-4">
            3. Keamanan Data
          </h2>
          <p>
            Kami berkomitmen untuk menjaga keamanan data pribadi Anda. Data Anda tidak akan
            dijual atau dibagikan kepada pihak ketiga tanpa persetujuan Anda.
          </p>
        </section>

        <section>
          <h2 className="font-headline font-bold uppercase tracking-tight text-primary text-xl mb-4">
            4. Cookie
          </h2>
          <p>
            Website kami menggunakan cookie untuk meningkatkan pengalaman berbelanja Anda.
            Anda dapat menonaktifkan cookie melalui pengaturan browser.
          </p>
        </section>

        <section>
          <h2 className="font-headline font-bold uppercase tracking-tight text-primary text-xl mb-4">
            5. Kontak
          </h2>
          <p>
            Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, hubungi kami di{" "}
            <a href="mailto:tokorowear@gmail.com" className="text-primary hover:underline">
              tokorowear@gmail.com
            </a>
          </p>
        </section>
      </div>

      <p className="mt-16 text-xs text-secondary uppercase tracking-widest">
        Terakhir diperbarui: Juni 2024
      </p>
    </div>
  );
}
