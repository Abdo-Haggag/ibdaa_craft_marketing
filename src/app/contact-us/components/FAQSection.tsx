'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const faqs: FAQ[] = [
    {
      question: 'كيف يمكنني الاشتراك في بطاقات الخصم؟',
      answer:
        'يمكنك الاشتراك بسهولة من خلال صفحة بطاقات الاشتراك على موقعنا. اختر البطاقة المناسبة لك (VIP أو عائلية) وأكمل عملية الدفع الآمنة. ستحصل على بطاقتك فوراً بعد إتمام الدفع.',
    },
    {
      question: 'ما هي مدة صلاحية البطاقة؟',
      answer:
        'جميع بطاقات الاشتراك صالحة لمدة سنة كاملة من تاريخ الشراء. يمكنك استخدام البطاقة في أي وقت خلال هذه الفترة للحصول على الخصومات من شركائنا.',
    },
    {
      question: 'هل يمكنني استرداد قيمة الاشتراك؟',
      answer:
        'نعم، نوفر سياسة استرداد مرنة خلال 14 يوماً من تاريخ الشراء إذا لم تستخدم البطاقة. يرجى التواصل مع فريق الدعم لإتمام عملية الاسترداد.',
    },
    {
      question: 'كم عدد الأشخاص الذين يمكنهم استخدام البطاقة؟',
      answer:
        'بطاقة VIP تسمح لـ 6 أشخاص بالاستفادة من الخصومات، وكذلك البطاقة العائلية. يمكنك إضافة أفراد عائلتك أو أصدقائك للاستفادة من المزايا.',
    },
    {
      question: 'كيف أعرف الشركاء المشاركين في البرنامج؟',
      answer:
        'يمكنك الاطلاع على قائمة شاملة بجميع الشركاء المشاركين من خلال صفحة شبكة الشركاء على موقعنا. القائمة تتضمن تفاصيل الخصومات المتاحة لكل شريك.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg p-8 border border-border">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-border rounded-lg p-4">
              <div className="h-6 bg-muted rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-8 border border-border shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent">
          <Icon name="QuestionMarkCircleIcon" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-foreground font-amiri">
          الأسئلة الشائعة
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden transition-premium"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 text-right hover:bg-muted transition-premium"
            >
              <span className="font-medium text-foreground pr-2">{faq.question}</span>
              <Icon
                name="ChevronDownIcon"
                size={20}
                className={`text-primary flex-shrink-0 transition-premium ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openIndex === index && (
              <div className="px-4 pb-4 text-muted-foreground border-t border-border pt-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">لم تجد إجابة لسؤالك؟</span> لا تتردد في
          التواصل معنا مباشرة عبر نموذج الاتصال أو الهاتف.
        </p>
      </div>
    </div>
  );
};

export default FAQSection;