import { getProducts } from "@/lib/store";
import Link from "next/link";
import ProductActions from "@/components/admin/ProductActions";

export const dynamic = "force-dynamic";

const BADGE_COLORS: Record<string, string> = {
  Baru: "bg-green-500/20 text-green-400",
  Habis: "bg-red-500/20 text-red-400",
  "Stok Terbatas": "bg-yellow-500/20 text-yellow-400",
  "Premium Release": "bg-blue-500/20 text-blue-400",
};

export default async function AdminProdukPage() {
  const products = getProducts();

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-headline font-black uppercase tracking-tighter">Produk</h1>
          <p className="text-white/40 text-sm mt-1">{products.length} produk terdaftar</p>
        </div>
        <Link
          href="/admin/produk/baru"
          className="flex items-center gap-2 bg-white text-black px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          Tambah Produk
        </Link>
      </div>

      <div className="border border-white/5">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-6 py-3 border-b border-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
          <div className="col-span-1">Foto</div>
          <div className="col-span-3">Nama</div>
          <div className="col-span-2">Kategori</div>
          <div className="col-span-2">Harga</div>
          <div className="col-span-2">Stok</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Aksi</div>
        </div>

        {products.map((product) => {
          const totalStock = product.sizes.reduce((sum, s) => sum + s.stock, 0);
          const isLow = totalStock > 0 && totalStock <= 5;
          const isOut = totalStock === 0;

          return (
            <div
              key={product.id}
              className="grid grid-cols-12 px-6 py-4 border-b border-white/5 items-center hover:bg-white/2 transition-colors"
            >
              {/* Image */}
              <div className="col-span-1">
                <div className="w-10 h-10 bg-white/5 overflow-hidden flex-shrink-0">
                  {product.images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  )}
                </div>
              </div>

              {/* Name */}
              <div className="col-span-3 pr-4">
                <p className="font-bold text-sm uppercase tracking-tight leading-tight">{product.name}</p>
                {product.badge && (
                  <span className={`inline-block mt-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${BADGE_COLORS[product.badge] ?? "bg-white/10"}`}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Category */}
              <div className="col-span-2">
                <span className="text-xs text-white/50 uppercase tracking-wide">{product.category}</span>
              </div>

              {/* Price */}
              <div className="col-span-2">
                <p className="text-sm font-bold">Rp {product.price.toLocaleString("id-ID")}</p>
                {product.originalPrice && (
                  <p className="text-xs text-white/30 line-through">
                    Rp {product.originalPrice.toLocaleString("id-ID")}
                  </p>
                )}
              </div>

              {/* Stock */}
              <div className="col-span-2">
                <span className={`text-sm font-bold ${isOut ? "text-red-400" : isLow ? "text-yellow-400" : "text-white"}`}>
                  {totalStock} pcs
                </span>
                <p className="text-[10px] text-white/30 mt-0.5">
                  {product.sizes.map((s) => `${s.label}:${s.stock}`).join(" ")}
                </p>
              </div>

              {/* Status */}
              <div className="col-span-1">
                <span className={`inline-block w-2 h-2 rounded-full ${product.isActive ? "bg-green-400" : "bg-white/20"}`} />
              </div>

              {/* Actions */}
              <div className="col-span-1 flex justify-end">
                <ProductActions productId={product.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
