import { getProducts, getPaymentMethods, getShippingMethods } from "@/lib/store";
import Link from "next/link";

export default async function AdminDashboard() {
  const products = getProducts();
  const payments = getPaymentMethods();
  const shipping = getShippingMethods();

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

  const stats = [
    { label: "Total Produk", value: totalProducts, icon: "inventory_2", href: "/admin/produk" },
    { label: "Produk Aktif", value: activeProducts, icon: "check_circle", href: "/admin/produk" },
    { label: "Stok Menipis", value: lowStockProducts, icon: "warning", href: "/admin/produk", alert: lowStockProducts > 0 },
    { label: "Stok Habis", value: outOfStock, icon: "remove_shopping_cart", href: "/admin/produk", alert: outOfStock > 0 },
    { label: "Metode Bayar Aktif", value: activePayments, icon: "payment", href: "/admin/pembayaran" },
    { label: "Metode Kirim Aktif", value: activeShipping, icon: "local_shipping", href: "/admin/pengiriman" },
  ];

  const lowStockList = products.filter((p) =>
    p.sizes.some((s) => s.stock > 0 && s.stock <= 3)
  ).slice(0, 5);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-headline font-black uppercase tracking-tighter">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Selamat datang di panel admin TOKORO WEAR.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
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

      {/* Quick Actions */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Aksi Cepat</h2>
        <div className="flex gap-3">
          <Link
            href="/admin/produk/baru"
            className="flex items-center gap-2 bg-white text-black px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Tambah Produk
          </Link>
          <Link
            href="/admin/pembayaran"
            className="flex items-center gap-2 border border-white/10 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:border-white/30 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">payment</span>
            Kelola Pembayaran
          </Link>
          <Link
            href="/admin/pengiriman"
            className="flex items-center gap-2 border border-white/10 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:border-white/30 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            Kelola Pengiriman
          </Link>
        </div>
      </div>

      {/* Low Stock Warning */}
      {lowStockList.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/70 mb-4">
            Peringatan Stok Menipis
          </h2>
          <div className="border border-red-500/20 bg-red-500/5">
            {lowStockList.map((product) => {
              const lowSizes = product.sizes.filter((s) => s.stock > 0 && s.stock <= 3);
              return (
                <Link
                  key={product.id}
                  href={`/admin/produk/${product.id}/edit`}
                  className="flex items-center justify-between px-6 py-4 border-b border-red-500/10 last:border-0 hover:bg-red-500/5 transition-colors"
                >
                  <div>
                    <p className="font-bold text-sm uppercase tracking-tight">{product.name}</p>
                    <p className="text-xs text-red-400 mt-0.5">
                      {lowSizes.map((s) => `${s.label}: ${s.stock} pcs`).join(" · ")}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-white/20 text-sm">chevron_right</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
