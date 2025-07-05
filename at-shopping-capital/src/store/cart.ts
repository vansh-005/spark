import { create } from "zustand";
import { products } from "../data/products";

interface CartState {
  items: { id: number; qty: number }[];
  add: (id: number) => void;
}

export const useCart = create<CartState>((set) => ({
  items: [],
  add: (id) =>
    set((s) => {
      const idx = s.items.findIndex((i) => i.id === id);
      if (idx > -1) s.items[idx].qty += 1;
      else s.items.push({ id, qty: 1 });
      return { items: [...s.items] };
    })
}));

export const cartTotal = (ids: { id: number; qty: number }[]) =>
  ids.reduce((t, i) => t + products.find((p) => p.id === i.id)!.price * i.qty, 0);
