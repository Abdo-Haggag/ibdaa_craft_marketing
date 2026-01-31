import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Statistic {
  id: string;
  icon: string;
  value: string;
  label: string;
  color: string;
}

const StatisticsSection = () => {
  const statistics: Statistic[] = [
    {
      id: 'partners',
      icon: 'BuildingStorefrontIcon',
      value: '200+',
      label: 'شريك تجاري',
      color: 'text-accent'
    },
    {
      id: 'customers',
      icon: 'UsersIcon',
      value: '15,000+',
      label: 'عميل راضٍ',
      color: 'text-success'
    },
    {
      id: 'savings',
      icon: 'ChartBarIcon',
      value: '40%',
      label: 'متوسط التوفير',
      color: 'text-primary'
    },
    {
      id: 'categories',
      icon: 'Squares2X2Icon',
      value: '5',
      label: 'فئات متنوعة',
      color: 'text-secondary'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground font-amiri mb-4">
            أرقامنا تتحدث عن نفسها
          </h2>
          <p className="text-lg text-muted-foreground">
            نفخر بثقة عملائنا وشراكاتنا القوية
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat) => (
            <div
              key={stat.id}
              className="bg-card rounded-2xl shadow-lg p-8 text-center transition-premium hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <Icon name={stat.icon as any} size={32} className={stat.color} />
                </div>
              </div>
              <h3 className={`text-4xl font-bold ${stat.color} mb-2 data-text`}>
                {stat.value}
              </h3>
              <p className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;