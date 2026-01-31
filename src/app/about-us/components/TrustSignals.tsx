import React from 'react';
import AppImage from '@/components/ui/AppImage';


interface Partnership {
  name: string;
  logo: string;
  alt: string;
  category: string;
}

interface Certification {
  title: string;
  issuer: string;
  icon: string;
}

interface TrustSignalsProps {
  partnerships: Partnership[];
  certifications: Certification[];
}

const TrustSignals = ({ partnerships, certifications }: TrustSignalsProps) => {
  return (
    <section className="bg-card py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-amiri">
            شركاء النجاح
          </h2>
          <p className="text-lg text-muted-foreground">
            نفخر بشراكاتنا مع أفضل الأسماء في المملكة
          </p>
        </div>

        <div>
          {partnerships.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">جاري تحميل الشركاء...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {partnerships.map((partner, index) => (
                <div
                  key={index}
                  className="bg-background rounded-lg p-6 border border-border hover:border-primary/30 transition-premium hover:shadow-md"
                >
                  <div className="aspect-square relative overflow-hidden rounded-md mb-3">
                    <AppImage
                      src={partner.logo}
                      alt={partner.alt}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground text-center mb-1">
                    {partner.name}
                  </h4>
                  <p className="text-xs text-muted-foreground text-center">
                    {partner.category}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;