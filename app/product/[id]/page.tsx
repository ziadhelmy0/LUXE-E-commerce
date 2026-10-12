'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { extraProducts } from '@/data/extraProducts';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import {
  ShoppingBag,
  Heart,
  Star,
  ShieldCheck,
  Truck,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

function ProductDetailContent() {
  const params = useParams<{ id: string }>();
  const productId = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const addItem = useCartStore((state) => state.addItem);
  const wishlist = useCartStore((state) => state.wishlist);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      setLoading(true);
      setProduct(null);

      try {
        const foundExtra = extraProducts.find(
          (item) => item.id.toString() === productId
        );

        if (foundExtra) {
          if (!cancelled) {
            setProduct(foundExtra);
          }
          return;
        }

        const response = await fetch(
          `https://fakestoreapi.com/products/${encodeURIComponent(productId)}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }

        const data: Product = await response.json();

        if (!cancelled) {
          setProduct(data);
        }
      } catch (error) {
        console.error('Error loading product:', error);

        if (!cancelled) {
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"
          role="status"
          aria-label="Loading product"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          المنتج غير موجود
        </h1>

        <Link
          href="/"
          className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold"
        >
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  const isFavorite = wishlist.some((item) => item.id === product.id);

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans">
      <Navbar />
      <CartDrawer />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          العودة للقائمة
        </Link>

        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-100 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* صورة المنتج */}
          <div className="bg-gradient-to-b from-gray-50 to-gray-100/50 rounded-2xl p-8 flex items-center justify-center h-96 border border-gray-50 relative">
            <img
              src={product.image}
              alt={product.title}
              className="object-contain h-full w-full max-h-80"
            />

            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label={
                isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'
              }
              className={`absolute top-6 left-6 p-3 rounded-2xl backdrop-blur-xl transition-all ${
                isFavorite
                  ? 'bg-rose-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-400 hover:text-rose-500'
              }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? 'fill-current' : ''
                }`}
              />
            </button>
          </div>

          {/* تفاصيل المنتج */}
          <div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md uppercase tracking-wider">
              {product.category}
            </span>

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-3 leading-tight">
              {product.title}
            </h1>

            {product.rating && (
              <div className="flex items-center gap-2 mt-3 text-sm font-bold text-amber-500">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{product.rating.rate}</span>
                </div>

                <span className="text-gray-400 font-normal">
                  ({product.rating.count} تقييم عميل)
                </span>
              </div>
            )}

            <div className="text-3xl font-black text-gray-900 mt-6">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-gray-600 text-sm mt-4 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4">
              <button
                type="button"
                onClick={() => addItem(product)}
                className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-gray-900/10 flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                إضافة إلى سلة التسوق
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100 text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>شحن سريع ومجاني للطلبات الكبرى</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>ضمان استرجاع الأموال خلال 14 يوماً</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"
            role="status"
            aria-label="Loading product"
          />
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}