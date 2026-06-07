import { getPaymentMethods } from "@/lib/store";
import ToggleSwitch from "@/components/admin/ToggleSwitch";

export const dynamic = "force-dynamic";

export default async function AdminPembayaranPage() {
  const methods = getPaymentMethods();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-headline font-black uppercase tracking-tighter">Metode Pembayaran</h1>
        <p className="text-white/40 text-sm mt-1">
          Aktifkan atau nonaktifkan metode pembayaran yang tersedia di toko.
        </p>
      </div>

      <div className="space-y-2 max-w-2xl">
        {methods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between px-6 py-5 border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-white/30 text-2xl">{method.icon}</span>
              <div>
                <p className="font-bold text-sm uppercase tracking-tight">{method.label}</p>
                <p className="text-xs text-white/30 mt-0.5">{method.description}</p>
                {method.fee > 0 && (
                  <p className="text-xs text-yellow-400/70 mt-0.5">
                    + Biaya: Rp {method.fee.toLocaleString("id-ID")}
                  </p>
                )}
              </div>
            </div>
            <ToggleSwitch
              id={method.id}
              isActive={method.isActive}
              endpoint="/api/admin/payment-methods"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 border border-white/5 bg-white/2 max-w-2xl">
        <p className="text-xs text-white/30 leading-relaxed">
          <span className="text-white/50 font-bold">Catatan:</span> Untuk integrasi payment gateway aktif
          (Midtrans / Xendit), hubungi developer untuk konfigurasi API key. Toggle ini hanya
          mengontrol tampilan metode di halaman checkout.
        </p>
      </div>
    </div>
  );
}
