'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SubscriptionCard from './SubscriptionCard';
import ComparisonToggle from './ComparisonToggle';
import SavingsCalculator from './SavingsCalculator';
import Icon from '@/components/ui/AppIcon';

interface Benefit {
  id: string;
  text: string;
  icon: string;
}

interface CategoryDiscount {
  category: string;
  range: string;
  icon: string;
}

interface ComparisonFeature {
  feature: string;
  vip: boolean | string;
  family: boolean | string;
}

const SubscriptionCardsInteractive = () => {
  const router = useRouter();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const vipBenefits: Benefit[] = [
    { id: '1', text: 'خصومات حصرية تصل إلى 40% على الملابس والأزياء', icon: 'SparklesIcon' },
    { id: '2', text: 'خصومات طبية تصل إلى 30% في أفضل المراكز الصحية', icon: 'HeartIcon' },
    { id: '3', text: 'خصومات على المطاعم والمقاهي تصل إلى 25%', icon: 'BuildingStorefrontIcon' },
    { id: '4', text: 'خصومات رياضية تصل إلى 35% في النوادي الرياضية', icon: 'TrophyIcon' },
    { id: '5', text: 'خصومات على الحلويات والمخبوزات تصل إلى 30%', icon: 'CakeIcon' },
    { id: '6', text: 'أولوية في الحجوزات والمواعيد', icon: 'ClockIcon' },
    { id: '7', text: 'عروض حصرية شهرية لحاملي البطاقة', icon: 'GiftIcon' },
    { id: '8', text: 'دعم فني متاح على مدار الساعة', icon: 'ChatBubbleLeftRightIcon' },
  ];

  const familyBenefits: Benefit[] = [
    { id: '1', text: 'خصومات على الملابس تصل إلى 25%', icon: 'ShoppingBagIcon' },
    { id: '2', text: 'خصومات طبية تصل إلى 20% للعائلة', icon: 'HeartIcon' },
    { id: '3', text: 'خصومات على المطاعم تصل إلى 15%', icon: 'BuildingStorefrontIcon' },
    { id: '4', text: 'خصومات رياضية تصل إلى 25%', icon: 'TrophyIcon' },
    { id: '5', text: 'خصومات على الحلويات تصل إلى 20%', icon: 'CakeIcon' },
    { id: '6', text: 'مناسبة لجميع أفراد العائلة', icon: 'UsersIcon' },
    { id: '7', text: 'عروض عائلية خاصة', icon: 'HomeIcon' },
  ];

  const vipDiscounts: CategoryDiscount[] = [
    { category: 'الطب والصحة', range: '10% - 30%', icon: 'HeartIcon' },
    { category: 'المطاعم والمقاهي', range: '10% - 25%', icon: 'BuildingStorefrontIcon' },
    { category: 'الملابس والأزياء', range: '15% - 40%', icon: 'ShoppingBagIcon' },
    { category: 'الحلويات والمخبوزات', range: '10% - 30%', icon: 'CakeIcon' },
    { category: 'الرياضة واللياقة', range: '15% - 35%', icon: 'TrophyIcon' },
  ];

  const familyDiscounts: CategoryDiscount[] = [
    { category: 'الطب والصحة', range: '10% - 20%', icon: 'HeartIcon' },
    { category: 'المطاعم والمقاهي', range: '10% - 15%', icon: 'BuildingStorefrontIcon' },
    { category: 'الملابس والأزياء', range: '15% - 25%', icon: 'ShoppingBagIcon' },
    { category: 'الحلويات والمخبوزات', range: '10% - 20%', icon: 'CakeIcon' },
    { category: 'الرياضة واللياقة', range: '15% - 25%', icon: 'TrophyIcon' },
  ];

  const comparisonFeatures: ComparisonFeature[] = [
    { feature: 'عدد المستفيدين', vip: '6 أشخاص', family: '6 أشخاص' },
    { feature: 'مدة الصلاحية', vip: 'سنة واحدة', family: 'سنة واحدة' },
    { feature: 'خصومات الملابس', vip: 'حتى 40%', family: 'حتى 25%' },
    { feature: 'خصومات الطب', vip: 'حتى 30%', family: 'حتى 20%' },
    { feature: 'خصومات المطاعم', vip: 'حتى 25%', family: 'حتى 15%' },
    { feature: 'خصومات الرياضة', vip: 'حتى 35%', family: 'حتى 25%' },
    { feature: 'خصومات الحلويات', vip: 'حتى 30%', family: 'حتى 20%' },
    { feature: 'أولوية الحجوزات', vip: true, family: false },
    { feature: 'عروض حصرية شهرية', vip: true, family: false },
    { feature: 'دعم فني 24/7', vip: true, family: true },
  ];

  const handleSubscribe = (cardType: 'VIP' | 'Family') => {
    router.push(`/subscription-registration?type=${cardType}`);
  };

  return (
    <div className="space-y-8">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-success text-success-foreground px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-bounce">
          <Icon name="CheckCircleIcon" size={24} />
          <span className="font-medium">جاري تحويلك لإتمام الاشتراك...</span>
        </div>
      )}

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-amiri mb-4">
          اختر بطاقة الاشتراك المناسبة لك
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          استمتع بخصومات حصرية على مدار العام في أفضل الشركاء التجاريين
        </p>
      </div>

      {/* Subscription Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <SubscriptionCard
          type="VIP"
          price={1500}
          capacity={6}
          cardImage="/assets/images/Copy_of_Black_and_Gold_Classy_Business_Card_1_-1769730611123.png"
          benefits={vipBenefits}
          discounts={vipDiscounts}
          isPopular={true}
          onSubscribe={() => handleSubscribe('VIP')}
        />
        <SubscriptionCard
          type="Family"
          price={800}
          capacity={6}
          cardImage="https://cmgesbyqfxkmwckadqpy.supabase.co/storage/v1/object/sign/cards/Copy%20of%20Black%20and%20Gold%20Classy%20Business%20Card%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNWJhNmJlNC00YzUzLTQwZTItOGI4OC1mYjg1OWNlNzM1YTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjYXJkcy9Db3B5IG9mIEJsYWNrIGFuZCBHb2xkIENsYXNzeSBCdXNpbmVzcyBDYXJkICgyKS5wbmciLCJpYXQiOjE3Njk3MjY4MzgsImV4cCI6MTgwMTI2MjgzOH0.XgpPwAgAvHL2ORitbHRazwhAMAB_TyVQCd9IiJ36-04"
          benefits={familyBenefits}
          discounts={familyDiscounts}
          onSubscribe={() => handleSubscribe('Family')}
        />
      </div>

      {/* Savings Calculator */}
      <SavingsCalculator />

      {/* Comparison Table */}
      <ComparisonToggle features={comparisonFeatures} />

      {/* FAQ Section */}
      <div className="bg-card rounded-xl shadow-lg border border-border p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-primary font-amiri mb-6 flex items-center gap-3">
          <Icon name="QuestionMarkCircleIcon" size={28} />
          <span>الأسئلة الشائعة</span>
        </h3>
        <div className="space-y-4">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer p-4 bg-muted rounded-lg hover:bg-muted/80 transition-premium">
              <span className="font-medium text-foreground">كيف يمكنني تفعيل البطاقة؟</span>
              <Icon
                name="ChevronDownIcon"
                size={20}
                className="group-open:rotate-180 transition-premium"
              />
            </summary>
            <div className="p-4 text-sm text-muted-foreground">
              بعد إتمام عملية الشراء، ستصلك البطاقة عبر البريد الإلكتروني ويمكنك تفعيلها مباشرة من
              لوحة التحكم الخاصة بك.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer p-4 bg-muted rounded-lg hover:bg-muted/80 transition-premium">
              <span className="font-medium text-foreground">
                هل يمكن استخدام البطاقة في جميع الفروع؟
              </span>
              <Icon
                name="ChevronDownIcon"
                size={20}
                className="group-open:rotate-180 transition-premium"
              />
            </summary>
            <div className="p-4 text-sm text-muted-foreground">
              نعم، يمكنك استخدام البطاقة في جميع فروع الشركاء المشاركين في البرنامج على مستوى
              المملكة.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer p-4 bg-muted rounded-lg hover:bg-muted/80 transition-premium">
              <span className="font-medium text-foreground">ما هي مدة صلاحية البطاقة؟</span>
              <Icon
                name="ChevronDownIcon"
                size={20}
                className="group-open:rotate-180 transition-premium"
              />
            </summary>
            <div className="p-4 text-sm text-muted-foreground">
              البطاقة صالحة لمدة سنة كاملة من تاريخ التفعيل، ويمكنك تجديدها بعد انتهاء المدة.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer p-4 bg-muted rounded-lg hover:bg-muted/80 transition-premium">
              <span className="font-medium text-foreground">
                هل يمكن استرجاع قيمة الاشتراك؟
              </span>
              <Icon
                name="ChevronDownIcon"
                size={20}
                className="group-open:rotate-180 transition-premium"
              />
            </summary>
            <div className="p-4 text-sm text-muted-foreground">
              لا يمكن استرجاع قيمة الاشتراك بعد تفعيل البطاقة، ولكن يمكنك نقل البطاقة لشخص آخر
              قبل التفعيل.
            </div>
          </details>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg p-8 md:p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground font-amiri mb-4">
          ابدأ التوفير اليوم
        </h3>
        <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
          انضم إلى آلاف العملاء الذين يوفرون المال مع بطاقات الاشتراك الخاصة بنا
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleSubscribe('VIP')}
            className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-bold text-lg transition-premium hover:bg-accent/90 hover:shadow-lg active-press flex items-center justify-center gap-2"
          >
            <Icon name="StarIcon" size={24} />
            <span>اشترك في VIP</span>
          </button>
          <button
            onClick={() => handleSubscribe('Family')}
            className="px-8 py-4 bg-primary-foreground text-primary rounded-lg font-bold text-lg transition-premium hover:bg-primary-foreground/90 hover:shadow-lg active-press flex items-center justify-center gap-2"
          >
            <Icon name="UsersIcon" size={24} />
            <span>اشترك في العائلة</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCardsInteractive;