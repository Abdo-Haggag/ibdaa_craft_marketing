import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  partnerCount: number;
  color: string;
}

const CategoriesSection = () => {
  const categories: Category[] = [
    {
      id: 'medicine',
      name: 'الطب والصحة',
      icon: 'HeartIcon',
      description: 'مراكز طبية وعيادات متخصصة',
      partnerCount: 45,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'restaurants',
      name: 'المطاعم والمقاهي',
      icon: 'BuildingStorefrontIcon',
      description: 'أشهر المطاعم والمقاهي',
      partnerCount: 78,
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 'clothing',
      name: 'الملابس والأزياء',
      icon: 'ShoppingBagIcon',
      description: 'محلات الأزياء والإكسسوارات',
      partnerCount: 62,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'sweets',
      name: 'الحلويات والمخبوزات',
      icon: 'CakeIcon',
      description: 'محلات الحلويات والمخابز',
      partnerCount: 34,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'sports',
      name: 'الرياضة واللياقة',
      icon: 'TrophyIcon',
      description: 'نوادي رياضية ومراكز لياقة',
      partnerCount: 28,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground font-amiri mb-4">
            فئات الشركاء
          </h2>
          <p className="text-lg text-muted-foreground">
            اكتشف خصومات حصرية في جميع الفئات
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href="/partners-network"
              className="group bg-card rounded-2xl shadow-lg overflow-hidden transition-premium hover:shadow-xl hover:-translate-y-2"
            >
              <div className={`h-32 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name={category.icon as any} size={64} className="text-white opacity-90" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground font-amiri mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent font-medium data-text">
                    {category.partnerCount} شريك
                  </span>
                  <Icon
                    name="ArrowLeftIcon"
                    size={20}
                    className="text-accent transition-premium group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/partners-network"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg transition-premium hover:bg-primary/90 hover:shadow-lg active-press"
          >
            <Icon name="BuildingStorefrontIcon" size={24} />
            <span>عرض جميع الشركاء</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;