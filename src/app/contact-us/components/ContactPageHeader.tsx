import React from 'react';
import Icon from '@/components/ui/AppIcon';

const ContactPageHeader = () => {
  return (
    <div className="bg-gradient-to-br from-primary via-secondary to-primary text-white py-16 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm">
            <Icon name="ChatBubbleLeftRightIcon" size={40} />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold font-amiri mb-4">
          تواصل معنا
        </h1>

        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          نحن هنا للإجابة على استفساراتك ومساعدتك في الحصول على أفضل تجربة مع خدماتنا.
          تواصل معنا عبر أي من القنوات المتاحة.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          <div className="flex items-center gap-2 text-white/90">
            <Icon name="ClockIcon" size={20} />
            <span className="text-sm">استجابة سريعة</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Icon name="UserGroupIcon" size={20} />
            <span className="text-sm">فريق محترف</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Icon name="CheckBadgeIcon" size={20} />
            <span className="text-sm">دعم متواصل</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPageHeader;