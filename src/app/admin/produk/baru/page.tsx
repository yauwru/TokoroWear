import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";

export default function AdminTambahProdukPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/produk" className="p-2 hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined text-white/40">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-4xl font-headline font-black uppercase tracking-tighter">Tambah Produk</h1>
          <p className="text-white/40 text-sm mt-1">Isi form di bawah untuk menambah produk baru.</p>
        </div>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}
