'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
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

interface SubscriptionCardProps {
  type: 'VIP' | 'Family';
  price: number;
  capacity: number;
  cardImage: string;
  benefits: Benefit[];
  discounts: CategoryDiscount[];
  isPopular?: boolean;
  onSubscribe: () => void;
}

const SubscriptionCard = ({
  type,
  price,
  capacity,
  cardImage,
  benefits,
  discounts,
  isPopular = false,
  onSubscribe,
}: SubscriptionCardProps) => {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div
      className={`relative bg-card rounded-xl shadow-lg border-2 transition-premium hover:shadow-xl ${
        isPopular ? 'border-accent' : 'border-border'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-6 py-2 rounded-full text-sm font-bold shadow-md">
          الأكثر شعبية
        </div>
      )}

      <div className="p-6 md:p-8">
        {/* Card Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-primary font-amiri mb-2">
            بطاقة {type === 'VIP' ? 'VIP' : 'العائلة'}
          </h3>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Icon name="UsersIcon" size={20} />
            <span className="text-sm">تصلح لـ {capacity} أشخاص</span>
          </div>
        </div>

        {/* Card Image */}
        <div className="relative w-full h-48 md:h-56 mb-6 rounded-lg overflow-hidden shadow-md">
          <AppImage
            src={cardImage}
            alt={`بطاقة اشتراك ${type === 'VIP' ? 'VIP' : 'العائلة'} بتصميم احترافي باللون ${
              type === 'VIP' ? 'الذهبي' : 'الأزرق'
            } مع شعار إبداع الحرفة`}
            className="w-full h-full object-cover hover-scale"
          />
        </div>

        {/* Pricing */}
        <div className="text-center mb-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl md:text-5xl font-bold text-accent data-text">
              {price.toLocaleString('ar-SA')}
            </span>
            <span className="text-xl text-muted-foreground">ريال</span>
          </div>
          <p className="text-sm text-muted-foreground">صالحة لمدة سنة كاملة</p>
        </div>

        {/* Subscribe Button */}
        <button
          onClick={onSubscribe}
          className="w-full py-4 bg-accent text-accent-foreground rounded-lg font-bold text-lg transition-premium hover:bg-accent/90 hover:shadow-lg active-press flex items-center justify-center gap-2"
        >
          <Icon name="ShoppingCartIcon" size={24} />
          <span>اشترك الآن</span>
        </button>

        {/* Terms Toggle */}
        <button
          onClick={() => setShowTerms(!showTerms)}
          className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-premium flex items-center justify-center gap-2"
        >
          <Icon name="DocumentTextIcon" size={16} />
          <span>الشروط والأحكام</span>
          <Icon
            name="ChevronDownIcon"
            size={16}
            className={`transition-premium ${showTerms ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Terms Content */}
        {showTerms && (
          <div className="mt-4 p-4 bg-muted rounded-lg text-xs text-muted-foreground space-y-2">
            <p>• البطاقة صالحة لمدة سنة واحدة من تاريخ التفعيل</p>
            <p>• يمكن استخدام البطاقة من قبل {capacity} أشخاص فقط</p>
            <p>• الخصومات تختلف حسب الشريك والفئة</p>
            <p>• لا يمكن استرجاع قيمة الاشتراك بعد التفعيل</p>
            <p>• يجب إبراز البطاقة عند الاستفادة من الخصم</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;