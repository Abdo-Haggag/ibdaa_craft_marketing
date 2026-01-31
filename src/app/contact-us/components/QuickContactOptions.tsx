'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface QuickOption {
  icon: string;
  title: string;
  description: string;
  action: string;
  link: string;
  color: string;
}

const QuickContactOptions = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const quickOptions: QuickOption[] = [
    {
      icon: 'PhoneIcon',
      title: 'اتصل بنا مباشرة',
      description: 'تحدث مع فريقنا الآن',
      action: 'اتصال',
      link: 'tel:+966590317360',
      color: 'bg-success/10 text-success border-success/20',
    },
    {
      icon: 'EnvelopeIcon',
      title: 'راسلنا عبر البريد',
      description: 'سنرد خلال 24 ساعة',
      action: 'إرسال',
      link: 'mailto:info@ibdaacraft.sa',
      color: 'bg-primary/10 text-primary border-primary/20',
    },
    {
      icon: 'ChatBubbleLeftRightIcon',
      title: 'الدردشة المباشرة',
      description: 'دعم فوري عبر الإنترنت',
      action: 'بدء المحادثة',
      link: 'https://wa.me/966590317360',
      color: 'bg-accent/10 text-accent border-accent/20',
    },
  ];

  if (!isHydrated) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-lg p-6 border border-border animate-pulse">
            <div className="w-12 h-12 bg-muted rounded-full mb-4"></div>
            <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-full mb-4"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {quickOptions.map((option, index) => (
        <a
          key={index}
          href={option.link}
          className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-premium group"
        >
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-full ${option.color} border mb-4 group-hover:scale-110 transition-premium`}
          >
            <Icon name={option.icon as any} size={28} />
          </div>

          <h3 className="text-lg font-bold text-foreground font-amiri mb-2">
            {option.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-4">
            {option.description}
          </p>

          <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-premium">
            <span>{option.action}</span>
            <Icon name="ArrowLeftIcon" size={16} />
          </div>
        </a>
      ))}
    </div>
  );
};

export default QuickContactOptions;