import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface RenewalNotificationProps {
  daysUntilExpiry: number;
  expiryDate: string;
}

const RenewalNotification = ({ daysUntilExpiry, expiryDate }: RenewalNotificationProps) => {
  if (daysUntilExpiry > 30) {
    return null;
  }

  const isUrgent = daysUntilExpiry <= 7;
  const bgColor = isUrgent ? 'from-error/10 to-error/5' : 'from-warning/10 to-warning/5';
  const borderColor = isUrgent ? 'border-error/20' : 'border-warning/20';
  const iconColor = isUrgent ? 'text-error' : 'text-warning';
  const textColor = isUrgent ? 'text-error' : 'text-warning';

  return (
    <div className={`bg-gradient-to-br ${bgColor} border ${borderColor} rounded-lg p-6`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-full bg-white/50 flex items-center justify-center flex-shrink-0 ${iconColor}`}>
          <Icon name="ExclamationTriangleIcon" size={24} />
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-bold font-amiri mb-2 ${textColor}`}>
            {isUrgent ? 'تنبيه: اشتراكك على وشك الانتهاء!' : 'تذكير: قرب انتهاء الاشتراك'}
          </h3>
          <p className="text-foreground mb-4">
            {isUrgent
              ? `اشتراكك سينتهي خلال ${daysUntilExpiry} أيام فقط (${expiryDate}). جدد الآن لتجنب انقطاع الخدمة!`
              : `اشتراكك سينتهي خلال ${daysUntilExpiry} يوم (${expiryDate}). جدد مبكراً للاستمرار في الاستفادة من الخصومات.`}
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-premium font-medium shadow-sm">
              <Icon name="ArrowPathIcon" size={20} />
              تجديد الاشتراك الآن
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-md bg-card text-foreground hover:bg-muted transition-premium font-medium border border-border">
              <Icon name="ChatBubbleLeftRightIcon" size={20} />
              تواصل معنا
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewalNotification;