import { Product } from '@/types';

export const extraProducts: Product[] = [
  // --- قسم الإلكترونيات والأجهزة الذكية ---
  {
    id: 101,
    title: "ساعة ذكية فاخرة - طراز برو 2026",
    price: 299.99,
    description: "ساعة ذكية متطورة بشاشة AMOLED فائقة الدقة، قياس نبضات القلب، مقاومة للماء، وبطارية تدوم لأسبوع كامل.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    rating: { rate: 4.8, count: 120 }
  },
  {
    id: 102,
    title: "سماعات لاسلكية عازلة للضوضاء ANC",
    price: 189.50,
    description: "استمتع بصوت نقي وعميق مع تقنية إلغاء الضوضاء النشطة، وميكروفون مدمج عالي الجودة للمكالمات.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    rating: { rate: 4.6, count: 95 }
  },
  {
    id: 103,
    title: "لوحة مفاتيح ميكانيكية لاسلكية RGB",
    price: 135.00,
    description: "مفاتيح ميكانيكية سريعة الاستجابة، إضاءة خلفية قابلة للتخصيص، وعمر بطارية طويل للاستخدام المكثف.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    rating: { rate: 4.9, count: 140 }
  },
  {
    id: 104,
    title: "كاميرا احترافية بدقة 4K للتصوير",
    price: 850.00,
    description: "التقط أجمل اللحظات وتفاصيلها بدقة مذهلة، مناسبة لصناع المحتوى والمصورين المحترفين.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    rating: { rate: 4.7, count: 64 }
  },

  // --- قسم الأزياء الرجالية والنسائية (men's clothing / women's clothing) ---
  {
    id: 105,
    title: "جاكيت جلد طبيعي فاخر بتصميم عصري",
    price: 240.00,
    description: "مصنوع من أجود أنواع الجلد الطبيعي ليمنحك إطلالة أنيقة ودافئة خلال فصل الشتاء.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    rating: { rate: 4.7, count: 110 }
  },
  {
    id: 106,
    title: "قميص كلاسيكي قطني مقلم للرجال",
    price: 65.00,
    description: "قميص مريح مصنوع من القطن الخالص بنسبة 100%، مثالي للاجتماعات والمناسبات الرسمية.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
    rating: { rate: 4.4, count: 85 }
  },
  {
    id: 107,
    title: "فستان سهرة نسائي أنيق بتصميم ملكي",
    price: 180.00,
    description: "فستان راقي بتصميم عصري يناسب الحفلات والمناسبات الخاصة ليمنحك إطلالة تخطف الأنظار.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    rating: { rate: 4.9, count: 130 }
  },
  {
    id: 108,
    title: "حقيبة يد نسائية من الجلد الفاخر",
    price: 115.00,
    description: "حقيبة عملية وعصرية بتصميم أنيق ومساحة واسعة لتنظيم جميع احتياجاتك اليومية.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
    rating: { rate: 4.8, count: 92 }
  },

  // --- قسم المجوهرات والإكسسوارات (jewelery) ---
  {
    id: 109,
    title: "سلسلة من الفضة الإسترليني مع حجر كريستال",
    price: 85.00,
    description: "قلادة أنيقة ولامعة مصممة بدقة لتضفي لمسة من الأناقة الناعمة على إطلالتك.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    rating: { rate: 4.6, count: 77 }
  },
  

  // --- قسم الأحذية ومستلزمات الرياضة والمنزل ---
  {
    id: 111,
    title: "حذاء رياضي عصري للجري والخروج",
    price: 120.00,
    description: "تصميم مريح وخفيف الوزن مصمم خصيصاً لتمارين الجري والأنشطة اليومية لتوفير أقصى راحة.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    rating: { rate: 4.9, count: 210 }
  },
  {
    id: 112,
    title: "ماكينة إسبريسو مدمجة للمنزل الاحترافي",
    price: 230.00,
    description: "حضّر قهوتك المفضلة كالمحترفين بضغط 15 بار ونظام تبخير الحليب المدمج.",
    category: "home & lifestyle",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    rating: { rate: 4.7, count: 99 }
  }
];