'use client';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import { ShieldCheck, Truck, Headphones, Award } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <CartDrawer />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">نحن نصنع تجربة تسوق استثنائية</h1>
          <p className="text-gray-300 mt-4 text-lg">
            منصتنا الرائدة تجمع بين جودة المنتجات العالمية وسلاسة التقنية الحديثة لنلبي تطلعاتك بكل ثقة.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="text-indigo-600 font-bold text-sm tracking-wider uppercase">قصتنا</span>
            <h2 className="text-3xl font-black mt-2 text-gray-900">رؤية مبتكرة لعالم التسوق الإلكتروني</h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              تأسست منصة LUXE بهدف إعادة صياغة مفهوم التجارة الإلكترونية من خلال توفير تجربة مستخدم سلسة، أمان عالي في المعاملات، وتشكيلة مختارة بعناية من أفضل المنتجات العالمية والمحلية التي تناسب نمط حياتك العصري.
            </p>
            <div className="mt-6 flex gap-4">
              <Link href="/products" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-colors shadow-md">
                استعرض المنتجات
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-tr from-indigo-100 to-gray-100 rounded-3xl p-8 border border-gray-200/60 shadow-xl flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl font-black text-indigo-600 block">2026</span>
              <span className="text-gray-500 font-semibold mt-2 block">عام الانطلاق والمعايير الجديدة</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <ShieldCheck className="w-10 h-10 text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg">دفع آمن 100%</h3>
            <p className="text-gray-500 text-sm mt-1">حماية كاملة لبياناتك ومعاملاتك المالية بأحدث تقنيات التشفير.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <Truck className="w-10 h-10 text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg">شحن سريع</h3>
            <p className="text-gray-500 text-sm mt-1">توصيل سريع ومضمون حتى باب منزلك في أسرع وقت ممكن.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <Headphones className="w-10 h-10 text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg">دعم فني متواصل</h3>
            <p className="text-gray-500 text-sm mt-1">فريق خدمة عملاء جاهز للإجابة على استفساراتك طوال أيام الأسبوع.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <Award className="w-10 h-10 text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg">جودة مضمونة</h3>
            <p className="text-gray-500 text-sm mt-1">منتجات أصلية ومختارة بعناية فائقة لتلبي أعلى معايير الجودة.</p>
          </div>
        </div>
      </main>
    </div>
  );
}