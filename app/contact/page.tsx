'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <CartDrawer />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-black tracking-tight">تواصل معنا</h1>
          <p className="text-gray-500 text-sm mt-2">نحن هنا دائماً لمساعدتك والإجابة على أي استفسار لديك.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* معلومات التواصل */}
          <div className="bg-gray-900 text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl">
            <div>
              <h2 className="text-xl font-bold mb-6">معلومات الاتصال</h2>
              <div className="space-y-6 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-indigo-400" />
                  <span>support@luxe-store.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-indigo-400" />
                  <span>+20 123 456 7890</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                  <span>القاهرة، جمهورية مصر العربية</span>
                </div>
              </div>
            </div>
            <div className="mt-12 text-xs text-gray-500">
              ساعات العمل: الأحد - الخميس (9 صباحاً حتى 6 مساءً)
            </div>
          </div>

          {/* نموذج الإرسال */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold">تم إرسال رسالتك بنجاح!</h3>
                <p className="text-gray-500 text-xs mt-1">سنقوم بالرد عليك في أقرب وقت ممكن.</p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
                  className="mt-6 bg-gray-900 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">الاسم الكامل</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600"
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
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600"
                    placeholder="example@domain.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">الرسالة</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-600 transition-colors shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" /> إرسال الرسالة
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}