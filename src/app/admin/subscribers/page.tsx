"use client";

import { useEffect, useState } from "react";
import type { Subscriber } from "@/lib/store";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/subscribers")
      .then((r) => r.json())
      .then((data) => {
        setSubscribers(data);
        setLoading(false);
      });
  }, []);

  async function handleDelete(email: string) {
    if (!confirm(`Hapus subscriber ${email}?`)) return;
    await fetch("/api/subscribers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSubscribers((prev) => prev.filter((s) => s.email !== email));
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function exportCSV() {
    const header = "Email,Nama,Tanggal Daftar\n";
    const rows = subscribers
      .map((s) => `${s.email},${s.name ?? ""},${formatDate(s.subscribedAt)}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers-tokorowear.csv";
    a.click();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-headline font-black uppercase tracking-tighter">
            Subscribers
          </h1>
          <p className="text-white/40 text-sm mt-1">
            {subscribers.length} pelanggan email marketing
          </p>
        </div>
        {subscribers.length > 0 && (
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 border border-white/10 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:border-white/30 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export CSV
          </button>
        )}
      </div>

      {loading ? (
        <div className="py-20 text-center text-white/30 text-sm uppercase tracking-widest">
          Memuat...
        </div>
      ) : subscribers.length === 0 ? (
        <div className="py-20 text-center border border-white/5 space-y-4">
          <span className="material-symbols-outlined text-4xl text-white/20">mail</span>
          <p className="text-white/30 text-sm uppercase tracking-widest">
            Belum ada subscriber
          </p>
          <p className="text-white/20 text-xs">
            Pelanggan yang daftar newsletter via Google akan muncul di sini
          </p>
        </div>
      ) : (
        <div className="border border-white/5">
          <div className="grid grid-cols-4 px-6 py-3 border-b border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            <span className="col-span-2">Email / Nama</span>
            <span>Tanggal Daftar</span>
            <span className="text-right">Aksi</span>
          </div>
          {subscribers.map((s) => (
            <div
              key={s.email}
              className="grid grid-cols-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors items-center"
            >
              <div className="col-span-2">
                <p className="text-sm font-bold text-white">{s.email}</p>
                {s.name && (
                  <p className="text-xs text-white/40 mt-0.5">{s.name}</p>
                )}
              </div>
              <p className="text-xs text-white/40">{formatDate(s.subscribedAt)}</p>
              <div className="text-right">
                <button
                  onClick={() => handleDelete(s.email)}
                  className="text-red-400/50 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
