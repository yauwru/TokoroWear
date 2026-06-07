"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  isActive: boolean;
  endpoint: string;
};

export default function ToggleSwitch({ id, isActive, endpoint }: Props) {
  const [active, setActive] = useState(isActive);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function toggle() {
    const newState = !active;
    setActive(newState);

    await fetch(`${endpoint}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: newState }),
    });

    startTransition(() => router.refresh());
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      title={active ? "Nonaktifkan" : "Aktifkan"}
      className={`relative w-12 h-6 transition-colors disabled:opacity-50 flex-shrink-0 ${
        active ? "bg-green-500" : "bg-white/10"
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white transition-all ${
          active ? "left-7" : "left-1"
        }`}
      />
    </button>
  );
}
