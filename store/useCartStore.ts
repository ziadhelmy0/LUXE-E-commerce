import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  wishlist: Product[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      wishlist: [],
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      addItem: (product) =>
        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === product.id);
          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += 1;
            return { items: newItems, isOpen: true };
          }
          return { items: [...state.items, { ...product, quantity: 1 }], isOpen: true };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.some((item) => item.id === product.id);
          if (exists) {
            return { wishlist: state.wishlist.filter((item) => item.id !== product.id) };
          }
          return { wishlist: [...state.wishlist, product] };
        }),
    }),
    { name: 'cart-storage' }
  )
);