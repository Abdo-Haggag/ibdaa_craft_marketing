import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface PartnerCardProps {
  partner: {
    id: string;
    name: string;
    category: string;
    logo: string;
    logoAlt: string;
    discount: string;
    address: string;
    phone: string;
    specialTerms?: string;
    isFeatured?: boolean;
    googleMapsLocation?: string;
  };
}

const PartnerCard = ({ partner }: PartnerCardProps) => {
  return (
    <div
      className={`bg-card rounded-lg shadow-sm border transition-premium hover:shadow-md ${
        partner.isFeatured
          ? 'border-accent shadow-accent/20'
          : 'border-border hover:border-primary/30'
      }`}
    >
      {partner.isFeatured && (
        <div className="bg-accent text-accent-foreground px-4 py-2 rounded-t-lg flex items-center gap-2">
          <Icon name="StarIcon" size={16} variant="solid" />
          <span className="text-sm font-medium">شريك مميز</span>
        </div>
      )}

      <div className="p-6">
        {/* Logo and Name */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <AppImage
              src={partner.logo}
              alt={partner.logoAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground font-amiri mb-1">
              {partner.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="TagIcon" size={16} />
              <span>{partner.category}</span>
            </div>
          </div>
        </div>

        {/* Discount Badge */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">نسبة الخصم</span>
            <span className="text-2xl font-bold text-accent font-amiri">
              {partner.discount}
            </span>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3 mb-3">
          <Icon name="MapPinIcon" size={20} className="text-primary flex-shrink-0 mt-1" />
          <p className="text-sm text-foreground">{partner.address}</p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 mb-4">
          <Icon name="PhoneIcon" size={20} className="text-primary flex-shrink-0" />
          <a
            href={`tel:${partner.phone}`}
            className="text-sm text-foreground hover:text-primary transition-premium"
            dir="ltr"
          >
            {partner.phone}
          </a>
        </div>

        {/* Special Terms */}
        {partner.specialTerms && (
          <div className="bg-muted rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2">
              <Icon name="InformationCircleIcon" size={16} className="text-accent flex-shrink-0 mt-1" />
              <p className="text-xs text-muted-foreground">{partner.specialTerms}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <a
            href={`tel:${partner.phone}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-primary text-primary-foreground font-medium transition-premium hover:bg-primary/90 active-press"
          >
            <Icon name="PhoneIcon" size={20} />
            <span className="text-sm">اتصل</span>
          </a>
          {partner.googleMapsLocation ? (
            <a
              href={partner.googleMapsLocation}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-3 rounded-md border border-border bg-background text-foreground transition-premium hover:bg-muted active-press"
              aria-label="فتح الموقع في خرائط جوجل"
            >
              <Icon name="MapPinIcon" size={20} />
            </a>
          ) : (
            <button
              disabled
              className="flex items-center justify-center px-4 py-3 rounded-md border border-border bg-muted text-muted-foreground cursor-not-allowed"
              aria-label="الموقع غير متوفر"
            >
              <Icon name="MapPinIcon" size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;