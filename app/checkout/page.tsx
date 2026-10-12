'use client';
import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import { CheckCircle2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cod',
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 15.0 : 0;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    // توليد رقم طلب مرجعي فريد وتثبيته
    const generatedOrderId = 'LUXE-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedOrderId);
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100/80">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h1 className="text-2xl font-black text-gray-900">تم استلام طلبك بنجاح!</h1>
            <p className="text-gray-500 text-sm mt-2">شكراً لتسوقك معنا. رقم الطلب المرجعي الخاص بك هو:</p>
            
            <div className="my-6 bg-indigo-50/60 border border-indigo-100 py-3 px-6 rounded-2xl inline-block">
              <span className="text-lg font-black text-indigo-600 tracking-wider">{orderId}</span>
            </div>

            <p className="text-xs text-gray-400 mb-8">تم إرسال تفاصيل الشحنة والفاتورة إلى بريدك الإلكتروني.</p>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white w-full py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
            >
              العودة إلى الرئيسية <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans">
      <Navbar />
      <CartDrawer />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-black tracking-tight mb-8 text-gray-900">إتمام عملية الشراء والدفع</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">سلة التسوق فارغة، أضف منتجات أولاً.</p>
            <Link href="/" className="mt-4 inline-block text-indigo-600 font-bold hover:underline">
              الذهاب للتسوق
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* نموذج البيانات */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100/80 shadow-xl space-y-5">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">معلومات الشحن والاستلام</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">الاسم الكامل</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-colors"
                    placeholder="محمد أحمد"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-colors"
                    placeholder="example@domain.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">رقم الهاتف</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-colors"
                    placeholder="+20 123 456 789"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">المدينة</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-colors"
                    placeholder="القاهرة"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">العنوان بالتفصيل</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-gray-50/50 border border-gray-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-colors"
                  placeholder="الشارع، رقم المبنى، الشقة"
                />
              </div>

              <div className="pt-3 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-3">طريقة الدفع المفضلة</h3>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`border p-4 rounded-2xl cursor-pointer flex items-center gap-3 transition-all ${formData.paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-200/80'}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-bold text-gray-800">الدفع عند الاستلام</span>
                  </label>
                  <label className={`border p-4 rounded-2xl cursor-pointer flex items-center gap-3 transition-all ${formData.paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-200/80'}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-bold text-gray-800">بطاقة ائتمانية (تجريبي)</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-gray-900/10 active:scale-95"
              >
                تأكيد الدفع وإتمام الطلب (${total.toFixed(2)})
              </button>
            </form>

            {/* ملخص الطلب */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100/80 shadow-xl h-fit">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">ملخص المنتجات</h2>
              <div className="space-y-4 max-h-72 overflow-y-auto mb-6 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 border-b border-gray-50 pb-3">
                    <img src={item.image} alt={item.title} className="w-12 h-12 object-contain bg-gray-50 rounded-xl p-1.5 border border-gray-100/80" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-gray-800 truncate">{item.title}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">الكمية: {item.quantity}</p>
                    </div>
                    <span className="font-black text-xs text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 pt-2 text-xs font-medium text-gray-500 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span className="font-bold text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>رسوم الشحن</span>
                  <span className="font-bold text-gray-800">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-black text-base pt-3 text-gray-900 border-t border-gray-100">
                  <span>الإجمالي الكلي</span>
                  <span className="text-indigo-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>عملية شراء آمنة ومحمية بالكامل</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}