"use client";

import { useEffect, useState } from "react";
import type { Order, OrderStatus } from "@/lib/store";

const STATUS_LABELS: Record<OrderStatus, string> = {
  menunggu_pembayaran: "Menunggu Bayar",
  dikonfirmasi: "Dikonfirmasi",
  diproses: "Diproses",
  dikirim: "Dikirim",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  menunggu_pembayaran: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  dikonfirmasi: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  diproses: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  dikirim: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  selesai: "bg-green-500/10 text-green-400 border-green-500/20",
  dibatalkan: "bg-red-500/10 text-red-400 border-red-500/20",
};

const ALL_STATUSES: OrderStatus[] = [
  "menunggu_pembayaran",
  "dikonfirmasi",
  "diproses",
  "dikirim",
  "selesai",
  "dibatalkan",
];

export default function PesananPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "semua">("semua");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  const filtered = filterStatus === "semua"
    ? orders
    : orders.filter((o) => o.status === filterStatus);

  async function updateStatus(orderId: string, status: OrderStatus) {
    setUpdating(true);
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: orderId, status }),
    });
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => prev ? { ...prev, status } : null);
    }
    setUpdating(false);
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-headline font-black uppercase tracking-tighter">Pesanan</h1>
          <p className="text-white/40 text-sm mt-1">{orders.length} total pesanan</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterStatus("semua")}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${
            filterStatus === "semua"
              ? "bg-white text-black border-white"
              : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"
          }`}
        >
          Semua ({orders.length})
        </button>
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${
              filterStatus === s
                ? "bg-white text-black border-white"
                : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"
            }`}
          >
            {STATUS_LABELS[s]} ({orders.filter((o) => o.status === s).length})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center text-white/30 text-sm uppercase tracking-widest">
          Memuat pesanan...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-white/30 text-sm uppercase tracking-widest">
          Tidak ada pesanan
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filtered.map((order) => (
            <button
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="text-left w-full border border-white/5 bg-white/3 hover:border-white/15 hover:bg-white/5 transition-all p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-headline font-black text-sm tracking-tight">{order.id}</span>
                    <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest border ${STATUS_COLORS[order.status]}`}>
                      {STATUS_LABELS[order.status]}
                    </span>
                  </div>
                  <p className="text-white font-bold text-sm">{order.customerName}</p>
                  <p className="text-white/40 text-xs mt-0.5">{order.customerPhone} · {order.items.length} item</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-headline font-black text-white">
                    Rp {order.total.toLocaleString("id-ID")}
                  </p>
                  <p className="text-white/30 text-[10px] mt-1">{formatDate(order.createdAt)}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 backdrop-blur-sm">
          <div className="h-full w-full max-w-xl bg-[#111] border-l border-white/10 overflow-y-auto p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline font-black text-xl uppercase">{selectedOrder.id}</h2>
                <p className="text-white/40 text-xs mt-1">{formatDate(selectedOrder.createdAt)}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-white/30 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Status update */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-3">Update Status</p>
              <div className="grid grid-cols-2 gap-2">
                {ALL_STATUSES.map((s) => (
                  <button
                    key={s}
                    disabled={updating || selectedOrder.status === s}
                    onClick={() => updateStatus(selectedOrder.id, s)}
                    className={`py-2 px-3 text-[9px] font-black uppercase tracking-widest border transition-all disabled:opacity-50 ${
                      selectedOrder.status === s
                        ? STATUS_COLORS[s] + " opacity-100"
                        : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-3">Pelanggan</p>
              <div className="space-y-1 text-sm">
                <p className="font-bold">{selectedOrder.customerName}</p>
                <p className="text-white/60">{selectedOrder.customerPhone}</p>
                <p className="text-white/60">{selectedOrder.customerEmail}</p>
                <p className="text-white/60 mt-2">{selectedOrder.address}</p>
              </div>
            </div>

            {/* Items */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-3">Item Pesanan</p>
              <div className="space-y-3">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-start text-sm border border-white/5 p-3">
                    <div>
                      <p className="font-bold uppercase text-xs">{item.productName}</p>
                      <p className="text-white/40 text-xs">{item.color} · {item.size} · {item.quantity}x</p>
                    </div>
                    <p className="font-bold text-xs">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="border border-white/5 p-4 space-y-2 text-sm">
              <div className="flex justify-between text-white/50">
                <span>Subtotal</span>
                <span>Rp {selectedOrder.subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>Ongkir ({selectedOrder.shippingMethod})</span>
                <span>Rp {selectedOrder.shippingCost.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>PPN 11%</span>
                <span>Rp {selectedOrder.tax.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between font-black text-white pt-2 border-t border-white/10 text-base">
                <span>TOTAL</span>
                <span>Rp {selectedOrder.total.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="border border-white/5 p-3">
                <p className="text-white/30 uppercase tracking-widest text-[9px] mb-1">Pembayaran</p>
                <p className="font-bold">{selectedOrder.paymentMethod}</p>
              </div>
              <div className="border border-white/5 p-3">
                <p className="text-white/30 uppercase tracking-widest text-[9px] mb-1">Pengiriman</p>
                <p className="font-bold">{selectedOrder.shippingMethod}</p>
              </div>
            </div>

            {selectedOrder.note && (
              <div className="border border-white/5 p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Catatan</p>
                <p className="text-sm text-white/70">{selectedOrder.note}</p>
              </div>
            )}

            <a
              href={`https://wa.me/${selectedOrder.customerPhone.replace(/^0/, "62")}?text=${encodeURIComponent(`Halo ${selectedOrder.customerName}, pesanan Anda (${selectedOrder.id}) sedang kami proses. Total: Rp ${selectedOrder.total.toLocaleString("id-ID")}. Terima kasih! - TOKORO WEAR`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-500 transition-colors text-white text-xs font-black uppercase tracking-widest"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
