'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PartnersMapProps {
  centerLat?: number;
  centerLng?: number;
}

const PartnersMap = ({ centerLat = 24.7136, centerLng = 46.6753 }: PartnersMapProps) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center gap-3">
        <Icon name="MapIcon" size={24} />
        <h3 className="text-lg font-bold font-amiri">مواقع الشركاء</h3>
      </div>

      <div className="relative w-full h-96 bg-muted">
        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Icon name="MapIcon" size={48} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">جاري تحميل الخريطة...</p>
            </div>
          </div>
        )}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="مواقع شركاء إبداع الحرفة"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${centerLat},${centerLng}&z=12&output=embed`}
          onLoad={() => setIsMapLoaded(true)}
          className="w-full h-full"
        />
      </div>

      <div className="p-4 bg-muted/50">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="InformationCircleIcon" size={16} />
          <span>انقر على العلامات لعرض تفاصيل الشريك</span>
        </div>
      </div>
    </div>
  );
};

export default PartnersMap;