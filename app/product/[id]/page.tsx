'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import { Star, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">جاري تحميل تفاصيل المنتج...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">المنتج غير موجود.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <CartDrawer />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 mb-8 transition-colors">
          <ArrowRight className="w-4 h-4" /> العودة إلى المتجر
        </Link>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* صورة المنتج */}
          <div className="bg-gray-50 rounded-2xl p-8 h-96 flex items-center justify-center overflow-hidden">
            <img src={product.image} alt={product.title} className="object-contain h-full max-h-80" />
          </div>

          {/* تفاصيل المنتج */}
          <div>
            <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-3">{product.title}</h1>
            
            <div className="flex items-center gap-2 mt-4 text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-bold text-gray-700">{product.rating.rate}</span>
              <span className="text-xs text-gray-400">({product.rating.count} تقييم)</span>
            </div>

            <p className="text-2xl font-black text-indigo-600 mt-6">${product.price}</p>
            <p className="text-gray-600 text-sm mt-4 leading-relaxed">{product.description}</p>

            <button
              onClick={() => addItem(product)}
              className="mt-8 w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" /> إضافة إلى سلة التسوق
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}