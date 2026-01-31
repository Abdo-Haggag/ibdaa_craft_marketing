import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-accent via-accent/90 to-accent text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Icon name="SparklesIcon" size={64} className="mx-auto mb-6 opacity-90" />
          
          <h2 className="text-5xl font-bold font-amiri mb-6 leading-tight">
            ابدأ التوفير اليوم!
          </h2>
          
          <p className="text-2xl mb-8 opacity-90 leading-relaxed">
            انضم إلى آلاف العملاء الذين يوفرون مئات الريالات شهرياً مع بطاقات الاشتراك الخاصة بنا
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/subscription-cards"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-accent rounded-xl font-bold text-xl transition-premium hover:bg-white/90 hover:shadow-2xl active-press"
            >
              <Icon name="CreditCardIcon" size={28} />
              <span>اشترك الآن</span>
            </Link>

            <Link
              href="/contact-us"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 text-white rounded-xl font-bold text-xl transition-premium hover:bg-white/20 backdrop-blur-sm"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={28} />
              <span>تواصل معنا</span>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-4xl font-bold mb-2 data-text">24/7</p>
              <p className="text-sm opacity-80">دعم فني</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2 data-text">100%</p>
              <p className="text-sm opacity-80">ضمان الجودة</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2 data-text">40%</p>
              <p className="text-sm opacity-80">خصم حصري</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;