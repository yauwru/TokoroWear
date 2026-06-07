import { getOrders, getProducts } from "@/lib/store";

export default function LaporanPage() {
  const orders = getOrders();
  const products = getProducts();

  const selesai = orders.filter((o) => o.status === "selesai");
  const totalRevenue = selesai.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const avgOrder = selesai.length > 0 ? Math.round(totalRevenue / selesai.length) : 0;

  // Produk terlaris
  const salesMap: Record<string, { name: string; qty: number; revenue: number }> = {};
  for (const order of orders) {
    for (const item of order.items) {
      if (!salesMap[item.productId]) {
        salesMap[item.productId] = { name: item.productName, qty: 0, revenue: 0 };
      }
      salesMap[item.productId].qty += item.quantity;
      salesMap[item.productId].revenue += item.price * item.quantity;
    }
  }
  const topProducts = Object.values(salesMap)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
  const maxRevenue = topProducts[0]?.revenue || 1;

  // Status breakdown
  const statusCounts: Record<string, number> = {};
  for (const o of orders) {
    statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
  }

  const STATUS_LABELS: Record<string, string> = {
    menunggu_pembayaran: "Menunggu Bayar",
    dikonfirmasi: "Dikonfirmasi",
    diproses: "Diproses",
    dikirim: "Dikirim",
    selesai: "Selesai",
    dibatalkan: "Dibatalkan",
  };

  // Stok menipis
  const lowStock = products.filter((p) =>
    p.sizes.some((s) => s.stock > 0 && s.stock <= 3)
  );
  const outOfStock = products.filter((p) =>
    p.sizes.every((s) => s.stock === 0)
  );

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-headline font-black uppercase tracking-tighter">Laporan</h1>
        <p className="text-white/40 text-sm mt-1">Ringkasan performa toko</p>
      </div>

      {/* Revenue stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: `Rp ${totalRevenue.toLocaleString("id-ID")}`, icon: "payments" },
          { label: "Total Pesanan", value: totalOrders.toString(), icon: "receipt_long" },
          { label: "Pesanan Selesai", value: selesai.length.toString(), icon: "check_circle" },
          { label: "Rata-rata Pesanan", value: `Rp ${avgOrder.toLocaleString("id-ID")}`, icon: "trending_up" },
        ].map((stat) => (
          <div key={stat.label} className="border border-white/5 bg-white/3 p-6">
            <span className="material-symbols-outlined text-white/20 text-2xl mb-3 block">{stat.icon}</span>
            <p className="text-2xl font-headline font-black text-white">{stat.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Produk terlaris */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Produk Terlaris</h2>
          <div className="space-y-3">
            {topProducts.length === 0 ? (
              <p className="text-white/20 text-sm">Belum ada data penjualan</p>
            ) : (
              topProducts.map((p, i) => (
                <div key={p.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-white/80 uppercase">{i + 1}. {p.name}</span>
                    <span className="text-white/40">{p.qty} terjual · Rp {p.revenue.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 w-full">
                    <div
                      className="h-full bg-white/40"
                      style={{ width: `${(p.revenue / maxRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Status pesanan */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Status Pesanan</h2>
          <div className="space-y-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex justify-between items-center border border-white/5 px-4 py-3">
                <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                  {STATUS_LABELS[status] || status}
                </span>
                <span className="font-headline font-black text-white">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stok inventory */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Inventaris Produk</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-white/5 bg-white/3 p-6">
            <p className="text-3xl font-headline font-black text-white">{products.length}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mt-1">Total Produk</p>
          </div>
          <div className={`border p-6 ${lowStock.length > 0 ? "border-yellow-500/20 bg-yellow-500/5" : "border-white/5 bg-white/3"}`}>
            <p className={`text-3xl font-headline font-black ${lowStock.length > 0 ? "text-yellow-400" : "text-white"}`}>
              {lowStock.length}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mt-1">Stok Menipis (≤3)</p>
          </div>
          <div className={`border p-6 ${outOfStock.length > 0 ? "border-red-500/20 bg-red-500/5" : "border-white/5 bg-white/3"}`}>
            <p className={`text-3xl font-headline font-black ${outOfStock.length > 0 ? "text-red-400" : "text-white"}`}>
              {outOfStock.length}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mt-1">Stok Habis</p>
          </div>
        </div>

        {lowStock.length > 0 && (
          <div className="mt-4 border border-yellow-500/20 bg-yellow-500/5 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400/70 mb-3">
              Perlu Restock
            </p>
            {lowStock.map((p) => (
              <div key={p.id} className="flex justify-between text-sm py-2 border-b border-yellow-500/10 last:border-0">
                <span className="font-bold text-white/80 uppercase text-xs">{p.name}</span>
                <span className="text-yellow-400 text-xs">
                  {p.sizes.filter((s) => s.stock > 0 && s.stock <= 3).map((s) => `${s.label}:${s.stock}`).join(" · ")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
