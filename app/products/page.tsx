'use client';
import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import { Search, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // فلترة وترتيب المنتجات
  let filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (sortBy === 'low-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'high-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <CartDrawer />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight">كتالوج المنتجات الموسع</h1>
            <p className="text-gray-500 text-sm mt-1">تصفح تشكيلة واسعة من المنتجات المتاحة بأسعار تنافسية.</p>
          </div>

          {/* خيارات البحث والترتيب */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث في المنتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm focus:outline-none focus:border-indigo-600 transition-colors"
              />
            </div>

            <div className="relative w-full sm:w-48">
              <SlidersHorizontal className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm focus:outline-none focus:border-indigo-600 transition-colors appearance-none cursor-pointer"
              >
                <option value="default">الترتيب الافتراضي</option>
                <option value="low-high">السعر: من الأرخص للأغلى</option>
                <option value="high-low">السعر: من الأغلى للأرخص</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white h-80 rounded-2xl animate-pulse shadow-sm" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm text-gray-400">
            لا توجد منتجات مطابقة لبحثك.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
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
                    <ShoppingBag className="w-4 h-4" /> إضافة
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