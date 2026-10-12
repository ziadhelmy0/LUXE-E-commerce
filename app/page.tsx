'use client';
import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { extraProducts } from '@/data/extraProducts';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const addItem = useCartStore((state) => state.addItem);
  const wishlist = useCartStore((state) => state.wishlist);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((apiProducts: Product[]) => {
        const combined = [...apiProducts, ...extraProducts];
        setProducts(combined);
        setFilteredProducts(combined);

        const extraCategories = Array.from(new Set(extraProducts.map((p) => p.category)));
        fetch('https://fakestoreapi.com/products/categories')
          .then((res) => res.json())
          .then((apiCategories: string[]) => {
            const allCategories = Array.from(new Set([...apiCategories, ...extraCategories]));
            setCategories(allCategories);
          });

        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setProducts(extraProducts);
        setFilteredProducts(extraProducts);
        setLoading(false);
      });
  }, []);

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <CartDrawer />

      {/* Hero Banner الفاخر */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-950 text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-indigo-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/20 backdrop-blur-xl text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>تشكيلة حصرية لعام 2026</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight sm:leading-none bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
            فخامة التصميم وسلاسة التسوق الرقمي
          </h1>
          <p className="text-gray-300 mt-6 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            استمتع بتجربة اقتناء استثنائية تجمع بين المنتجات العالمية الأعلى تقييماً مع توصيل سريع وضمان كامل.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#shop"
              className="group bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/25 flex items-center gap-2 active:scale-95"
            >
              استكشف المتجر
              <ArrowRight className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <main id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-gray-900">الكتالوج المميز</h2>
            <p className="text-gray-500 text-sm mt-1.5 font-medium">
              يعرض {filteredProducts.length} منتج جودة عالية
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
                selectedCategory === 'all'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200/80 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              الكل
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all duration-200 active:scale-95 ${
                  selectedCategory === cat
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200/80 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white/60 h-88 rounded-3xl animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isFavorite = wishlist.some((item) => item.id === product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl p-4 border border-gray-100/80 flex flex-col justify-between hover:shadow-2xl hover:shadow-gray-200/60 hover:-translate-y-1 transition-all duration-300 relative"
                >
                  {/* Heart Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-6 left-6 z-10 p-2.5 rounded-2xl backdrop-blur-xl transition-all duration-200 active:scale-90 ${
                      isFavorite
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                        : 'bg-white/80 text-gray-400 border border-gray-100 hover:text-rose-500 hover:bg-rose-50'
                    }`}
                    title={isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>

                  <div>
                    <Link href={`/product/${product.id}`}>
                      <div className="relative h-56 w-full mb-4 bg-gradient-to-b from-gray-50 to-gray-100/50 rounded-2xl overflow-hidden flex items-center justify-center p-6 cursor-pointer border border-gray-50">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </div>
                    </Link>

                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                        {product.category}
                      </span>
                      {product.rating && (
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{product.rating.rate}</span>
                        </div>
                      )}
                    </div>

                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                  </div>

                  <div className="mt-5 flex items-center justify-between pt-3 border-t border-gray-100/80">
                    <div>
                      <span className="text-xs text-gray-400 block font-medium">السعر</span>
                      <span className="text-lg font-black text-gray-900">${product.price.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => addItem(product)}
                      className="bg-gray-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-600 transition-all shadow-md shadow-gray-900/10 flex items-center gap-1.5 active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      إضافة
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}