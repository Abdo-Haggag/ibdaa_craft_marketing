import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface MembershipDetailsCardProps {
  subscriptionType: string;
  activationDate: string;
  expiryDate: string;
  cardImageUrl?: string;
  totalSavings: number;
  discountsUsed: number;
}

const MembershipDetailsCard = ({
  subscriptionType,
  activationDate,
  expiryDate,
  cardImageUrl,
  totalSavings,
  discountsUsed,
}: MembershipDetailsCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Map membership types to display names and prices
  const getSubscriptionDisplay = (type: string) => {
    switch (type.toLowerCase()) {
      case 'individual':
        return { name: 'VIP', price: 1500 };
      case 'family':
        return { name: 'عائلية', price: 800 };
      case 'corporate':
        return { name: 'مؤسسية', price: 2000 };
      default:
        return { name: 'VIP', price: 1500 };
    }
  };
  
  const subscriptionDisplay = getSubscriptionDisplay(subscriptionType);

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6">
      <h2 className="text-xl font-bold text-foreground font-amiri mb-6 flex items-center gap-2">
        <Icon name="DocumentTextIcon" size={24} className="text-primary" />
        تفاصيل العضوية
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gradient-to-br from-primary to-secondary">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon name="StarIcon" size={20} className="text-white" />
              </div>
              <span className="text-white/80 text-sm">نوع الاشتراك</span>
            </div>
            <p className="text-white text-2xl font-bold font-amiri">
              {subscriptionDisplay.name}
            </p>
            <p className="text-white/70 text-sm mt-1">{subscriptionDisplay.price} ريال سعودي</p>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-accent to-amber-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon name="CreditCardIcon" size={20} className="text-white" />
              </div>
              <span className="text-white/80 text-sm">بطاقة العضوية</span>
            </div>
            {cardImageUrl && !imageError ? (
              <div className="mt-2 rounded-lg overflow-hidden border-2 border-white/30 bg-white">
                <img
                  src={cardImageUrl}
                  alt="بطاقة العضوية"
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    console.error('Failed to load card image:', cardImageUrl);
                    setImageError(true);
                  }}
                  onLoad={() => console.log('Card image loaded successfully:', cardImageUrl)}
                />
              </div>
            ) : (
              <p className="text-white/70 text-sm mt-1">
                {imageError ? 'فشل تحميل صورة البطاقة' : 'لا توجد صورة للبطاقة'}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-border bg-muted">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="CalendarIcon" size={20} className="text-primary" />
              <span className="text-muted-foreground text-sm">تاريخ التفعيل</span>
            </div>
            <p className="text-foreground font-bold text-lg">{activationDate}</p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-muted">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="ClockIcon" size={20} className="text-primary" />
              <span className="text-muted-foreground text-sm">تاريخ الانتهاء</span>
            </div>
            <p className="text-foreground font-bold text-lg">{expiryDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipDetailsCard;