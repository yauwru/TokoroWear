"use client";

import React, { createContext, useContext, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "kaze-tech-shell",
      name: 'JAKET TEKNIS "KAGE" V2',
      price: 2499000,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBJM_jjEbsV3cGiZ3HfJDdiurrTWYO0mOp-89e6yY6tk90OO4o7tqQzp774ILR42I7exCIpCSnH4K8_6YFrXcHapl2OKBAzXzpWsNtXgnjyDBYE0JSYh-GreJsFZek_4em2ZmSY0y3E12A_07LiKb6Xw3_cJLijaEhrKNbhwOlVFx_fOjhObaqhtTocu_dcUlkQgREyGpXin0Nyvx3N1wXUZTzkyCqu87cReNs1LZ_JWS9DxeBJ4rGwPkxRcFbEo_nEgzxA2V4QrzY",
      color: "Onyx Black",
      size: "L",
      quantity: 1,
    },
    {
      id: "motif-tee",
      name: 'KAOS OVERSIZE "MOTIF"',
      price: 549000,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC20v4hPvOjGibwBpROBcgt5E925nPinzMIKxMydSHXbA1DK4N80Woom2ie7cpEcXa0WiMg2_WT0564wD3ZUSBwsGKZiUn4tUfkzZvIIToWkchn4yK5RWWwYOUQEEBBkgoGgZ3oTDZ4ttfwWhLv9XFbx5YdIx_Yo36CS9jXJ12BynuGWVLJnLCcKYsDJz2l9KwBC3vS8qfjRZKXTogmxIYjL9ycj5Jgy4gY_HD48gMAI8MJ8rk2Rxqz5WCXypMVTzx8hLdFLjR-iUs",
      color: "Stark White",
      size: "M",
      quantity: 2,
    },
  ]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === newItem.id && i.size === newItem.size
      );
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id && i.size === newItem.size
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (id: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size ? { ...i, quantity } : i
      )
    );
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
