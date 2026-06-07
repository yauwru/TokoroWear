import { getProducts, getPaymentMethods, getShippingMethods, getOrders } from "@/lib/store";
import Link from "next/link";

export default async function AdminDashboard() {
  const products = getProducts();
  const payments = getPaymentMethods();
  const shipping = getShippingMethods();
  const orders = getOrders();

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.isActive).length;
  const lowStockProducts = products.filter((p) =>
    p.sizes.every((s) => s.stock <= 2)
  ).length;
  const outOfStock = products.filter((p) =>
    p.sizes.every((s) => s.stock === 0)
  ).length;
  const activePayments = payments.filter((p) => p.isActive).length;
  const activeShipping = shipping.filter((s) => s.isActive).length;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "menunggu_pembayaran").length;
  const revenue = orders
    .filter((o) => o.status === "selesai")
    .reduce((sum, o) => sum + o.total, 0);

  const recentOrders = orders.slice(0, 5);

  const STATUS_LABELS: Record<string, string> = {
    menunggu_pembayaran: "Menunggu Bayar",
    dikonfirmasi: "Dikonfirmasi",
    diproses: "Diproses",
    dikirim: "Dikirim",
    selesai: "Selesai",
    dibatalkan: "Dibatalkan",
  };
  const STATUS_COLORS: Record<string, string> = {
    menunggu_pembayaran: "text-yellow-400",
    dikonfirmasi: "text-blue-400",
    diproses: "text-purple-400",
    dikirim: "text-cyan-400",
    selesai: "text-green-400",
    dibatalkan: "text-red-400",
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-headline font-black uppercase tracking-tighter">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Selamat datang di panel admin TOKORO WEAR.</p>
      </div>

      <div className="border border-white/10 bg-white/3 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Total Revenue (Pesanan Selesai)</p>
          <p className="text-5xl font-headline font-black text-white">
            Rp {revenue.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="text-3xl font-headline font-black text-white">{totalOrders}</p>
            <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Total Pesanan</p>
          </div>
          {pendingOrders > 0 && (
            <div>
              <p className="text-3xl font-headline font-black text-yellow-400">{pendingOrders}</p>
              <p className="text-[10px] text-yellow-400/50 uppercase tracking-widest mt-1">Perlu Konfirmasi</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Total Produk", value: totalProducts, icon: "inventory_2", href: "/admin/produk" },
          { label: "Produk Aktif", value: activeProducts, icon: "check_circle", href: "/admin/produk" },
          { label: "Stok Menipis", value: lowStockProducts, icon: "warning", href: "/admin/produk", alert: lowStockProducts > 0 },
          { label: "Stok Habis", value: outOfStock, icon: "remove_shopping_cart", href: "/admin/produk", alert: outOfStock > 0 },
          { label: "Metode Bayar Aktif", value: activePayments, icon: "payment", href: "/admin/pembayaran" },
          { label: "Metode Kirim Aktif", value: activeShipping, icon: "local_shipping", href: "/admin/pengiriman" },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`p-6 border transition-all hover:border-white/20 group ${
              stat.alert ? "border-red-500/30 bg-red-500/5" : "border-white/5 bg-white/3"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`material-symbols-outlined text-2xl ${stat.alert ? "text-red-400" : "text-white/30"}`}>
                {stat.icon}
              </span>
              <span className={`text-4xl font-headline font-black ${stat.alert ? "text-red-400" : "text-white"}`}>
                {stat.value}
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Aksi Cepat</h2>
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/admin/produk/baru"
            className="flex items-center gap-2 bg-white text-black px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Tambah Produk
          </Link>
          <Link
            href="/admin/pesanan"
            className="flex items-center gap-2 border border-white/10 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:border-white/30 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
            Kelola Pesanan
          </Link>
          <Link
            href="/admin/laporan"
            className="flex items-center gap-2 border border-white/10 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:border-white/30 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">bar_chart</span>
            Lihat Laporan
          </Link>
        </div>
      </div>

      {recentOrders.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">Pesanan Terbaru</h2>
            <Link href="/admin/pesanan" className="text-[10px] text-white/30 hover:text-white uppercase tracking-widest transition-colors">
              Lihat Semua &rarr;
            </Link>
          </div>
          <div className="border border-white/5">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href="/admin/pesanan"
                className="flex items-center justify-between px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
              >
                <div>
                  <p className="font-bold text-sm uppercase tracking-tight">{order.id}</p>
                  <p className="text-xs text-white/40 mt-0.5">{order.customerName} &middot; {order.items.length} item</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">Rp {order.total.toLocaleString("id-ID")}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${STATUS_COLORS[order.status] || "text-white/40"}`}>
                    {STATUS_LABELS[order.status] || order.status}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
