'use client';
import Link from 'next/link';
import { ShoppingBag, Search, Heart, Info, PhoneCall } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  const { items, wishlist, setIsOpen } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-widest text-gray-900 group">
          LUXE<span className="text-indigo-600 inline-block group-hover:translate-x-1 transition-transform">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-gray-600 tracking-wide">
          <Link href="/" className="hover:text-indigo-600 transition-colors">الرئيسية</Link>
          <Link href="/products" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" /> المنتجات
          </Link>
          <Link href="/wishlist" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5 relative">
            <Heart className="w-3.5 h-3.5 text-rose-500" /> المفضلة
            {wishlist.length > 0 && (
              <span className="bg-rose-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link href="/about" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" /> من نحن
          </Link>
          <Link href="/contact" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5" /> اتصل بنا
          </Link>
        </nav>

        <button
          onClick={() => setIsOpen(true)}
          className="relative p-2.5 rounded-2xl bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-gray-100 active:scale-95"
        >
          <ShoppingBag className="w-5 h-5 text-gray-800" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md shadow-indigo-600/30">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}