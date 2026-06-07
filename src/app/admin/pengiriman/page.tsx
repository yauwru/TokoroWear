import { getShippingMethods } from "@/lib/store";
import ToggleSwitch from "@/components/admin/ToggleSwitch";

export const dynamic = "force-dynamic";

// Group by courier
function groupByCourier(methods: Awaited<ReturnType<typeof getShippingMethods>>) {
  return methods.reduce((acc, m) => {
    if (!acc[m.courier]) acc[m.courier] = [];
    acc[m.courier].push(m);
    return acc;
  }, {} as Record<string, typeof methods>);
}

export default async function AdminPengirimanPage() {
  const methods = getShippingMethods();
  const grouped = groupByCourier(methods);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-headline font-black uppercase tracking-tighter">Metode Pengiriman</h1>
        <p className="text-white/40 text-sm mt-1">
          Aktifkan kurir dan layanan pengiriman yang tersedia.
        </p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {Object.entries(grouped).map(([courier, courierMethods]) => (
          <div key={courier}>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/25 mb-2 px-1">
              {courier}
            </h2>
            <div className="border border-white/5">
              {courierMethods.map((method, i) => (
                <div
                  key={method.id}
                  className={`flex items-center justify-between px-6 py-5 hover:bg-white/2 transition-colors ${
                    i < courierMethods.length - 1 ? "border-b border-white/5" : ""
                  }`}
                >
                  <div>
                    <p className="font-bold text-sm uppercase tracking-tight">{method.label}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-white/30">{method.estimatedDays}</span>
                      <span className="text-white/10">·</span>
                      <span className="text-xs text-white/30">
                        Rp {method.flatRate.toLocaleString("id-ID")} flat
                      </span>
                    </div>
                    <p className="text-xs text-white/20 mt-0.5">{method.description}</p>
                  </div>
                  <ToggleSwitch
                    id={method.id}
                    isActive={method.isActive}
                    endpoint="/api/admin/shipping-methods"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 border border-white/5 bg-white/2 max-w-2xl">
        <p className="text-xs text-white/30 leading-relaxed">
          <span className="text-white/50 font-bold">Catatan:</span> Tarif di atas adalah tarif flat default.
          Untuk kalkulasi ongkir real-time berdasarkan berat dan lokasi, integrasi RajaOngkir API
          diperlukan (tersedia di phase berikutnya).
        </p>
      </div>
    </div>
  );
}
