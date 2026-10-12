'use client';
import { useCartStore } from '@/store/useCartStore';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600" /> سلة التسوق
            </h2>
            <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 text-gray-400">سلة التسوق فارغة حالياً</div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-contain bg-white rounded-lg p-2" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-800 truncate">{item.title}</h4>
                    <p className="text-indigo-600 font-bold text-sm mt-1">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 bg-white border rounded flex items-center justify-center font-bold text-sm"
                      >-</button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-white border rounded flex items-center justify-center font-bold text-sm"
                      >+</button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between mb-4 font-bold text-lg">
                <span>المجموع الكلي:</span>
                <span className="text-indigo-600">${total.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-indigo-600 transition-colors shadow-md"
              >
                متابعة إتمام الشراء
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}