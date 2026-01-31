import React from 'react';
import Icon from '@/components/ui/AppIcon';

const LocationMap = () => {
  const latitude = 24.7136;
  const longitude = 46.6753;

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
            <Icon name="MapPinIcon" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground font-amiri">
              موقعنا على الخريطة
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              شارع الملك فهد، الرياض، المملكة العربية السعودية
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full h-96 bg-muted">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="موقع إبداع الحرفة للتسويق"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`}
          className="border-0"
        />
      </div>

      <div className="p-6 bg-muted/30">
        <div className="flex items-start gap-3">
          <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-1" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">كيفية الوصول إلينا:</p>
            <p>
              يمكنك زيارتنا في مقرنا الرئيسي خلال ساعات العمل الرسمية من السبت إلى الخميس،
              من الساعة 9:00 صباحاً حتى 6:00 مساءً. نحن في خدمتك دائماً.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;