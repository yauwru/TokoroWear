import { getProductById } from "@/lib/store";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";

export default async function AdminEditProdukPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/produk" className="p-2 hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined text-white/40">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-4xl font-headline font-black uppercase tracking-tighter">Edit Produk</h1>
          <p className="text-white/40 text-sm mt-1">{product.name}</p>
        </div>
      </div>
      <ProductForm mode="edit" productId={id} initialData={product} />
    </div>
  );
}
