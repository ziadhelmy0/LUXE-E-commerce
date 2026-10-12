'use client';
import { useCartStore } from '@/store/useCartStore';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addItem } = useCartStore();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <CartDrawer />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
            <Heart className="w-8 h-8 text-rose-500 fill-current" /> المنتجات المفضلة
          </h1>
          <p className="text-gray-500 text-sm mt-1">المنتجات التي قمت بحفظها للرجوع إليها لاحقاً.</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">قائمة المفضلة فارغة حالياً.</p>
            <Link href="/" className="mt-4 inline-block text-indigo-600 font-bold hover:underline">تصفح المنتجات</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative group"
              >
                {/* زرار حذف من المفضلة */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-6 left-6 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full text-rose-500 hover:bg-rose-50 transition-colors shadow-sm"
                  title="إزالة من المفضلة"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>

                <div>
                  <Link href={`/product/${product.id}`}>
                    <div className="relative h-52 w-full mb-4 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-4 cursor-pointer">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="object-contain h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">
                    {product.category}
                  </span>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-bold text-gray-800 line-clamp-1 mt-1 hover:text-indigo-600 transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                </div>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-50">
                  <span className="text-lg font-black text-gray-900">${product.price}</span>
                  <button
                    onClick={() => addItem(product)}
                    className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-md flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" /> إضافة للسلة
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}