"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductActions({ productId }: { productId: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Hapus produk ini? Tindakan tidak bisa dibatalkan.")) return;
    setDeleting(true);
    await fetch(`/api/admin/products/${productId}`, { method: "DELETE" });
    router.refresh();
    setDeleting(false);
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/produk/${productId}/edit`}
        className="p-2 hover:bg-white/10 transition-colors"
        title="Edit"
      >
        <span className="material-symbols-outlined text-[16px] text-white/50 hover:text-white">edit</span>
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="p-2 hover:bg-red-500/10 transition-colors disabled:opacity-30"
        title="Hapus"
      >
        <span className="material-symbols-outlined text-[16px] text-white/30 hover:text-red-400">delete</span>
      </button>
    </div>
  );
}
