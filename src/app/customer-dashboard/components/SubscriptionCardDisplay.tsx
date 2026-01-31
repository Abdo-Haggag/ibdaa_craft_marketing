'use client';

import React, { useState, useEffect } from 'react';

import Icon from '@/components/ui/AppIcon';

interface SubscriptionCardDisplayProps {
  cardType: string;
  cardNumber: string;
  memberCount: number;
  validUntil: string;
  cardImageUrl: string | null;
}

const SubscriptionCardDisplay = ({
  cardType,
  cardNumber,
  memberCount,
  validUntil,
  cardImageUrl,
}: SubscriptionCardDisplayProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-1/2 mb-4"></div>
          <div className="h-48 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const cardGradient =
    cardType === 'VIP' ?'bg-gradient-to-br from-primary via-secondary to-accent' :'bg-gradient-to-br from-accent via-amber-600 to-amber-800';

  const shouldShowImage = cardImageUrl && !imageError;

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6">
      <h2 className="text-xl font-bold text-foreground font-amiri mb-4 flex items-center gap-2">
        <Icon name="CreditCardIcon" size={24} className="text-primary" />
        بطاقة العضوية
      </h2>

      <div className="relative">
        {shouldShowImage ? (
          <div className="relative w-full aspect-[1.586/1] rounded-xl overflow-hidden shadow-lg">
            <img
              src={cardImageUrl}
              alt={`بطاقة عضوية ${cardType}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Failed to load card image:', cardImageUrl);
                setImageError(true);
              }}
              onLoad={() => console.log('Card image loaded successfully:', cardImageUrl)}
            />
          </div>
        ) : (
          <div
            className={`relative w-full aspect-[1.586/1] rounded-xl overflow-hidden shadow-lg ${cardGradient} p-6 text-white`}
          >
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm opacity-80 mb-1">نوع البطاقة</p>
                  <p className="text-2xl font-bold font-amiri">{cardType}</p>
                </div>
                <Icon name="SparklesIcon" size={32} className="opacity-80" />
              </div>

              <div>
                <p className="text-sm opacity-80 mb-2">رقم البطاقة</p>
                <p className="text-lg font-mono tracking-wider mb-4">{cardNumber}</p>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-80 mb-1">عدد الأفراد</p>
                    <p className="text-lg font-bold">{memberCount}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-xs opacity-80 mb-1">صالحة حتى</p>
                    <p className="text-lg font-bold">{validUntil}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCardDisplay;