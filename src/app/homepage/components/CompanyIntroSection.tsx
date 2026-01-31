import React from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface ValueCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const CompanyIntroSection = () => {
  const values: ValueCard[] = [
    {
      id: 'mission',
      icon: 'RocketLaunchIcon',
      title: 'رسالتنا',
      description: 'نسعى لتوفير أفضل تجربة توفير للعملاء من خلال شراكات استراتيجية مع أفضل العلامات التجارية في المملكة، مع ضمان جودة الخدمة والمنتجات.'
    },
    {
      id: 'vision',
      icon: 'EyeIcon',
      title: 'رؤيتنا',
      description: 'أن نكون المنصة الرائدة في المملكة لبطاقات الاشتراك والخصومات، ونساهم في تحسين جودة حياة عملائنا من خلال توفير حقيقي وقيمة مضافة.'
    },
    {
      id: 'values',
      icon: 'SparklesIcon',
      title: 'قيمنا',
      description: 'نؤمن بالشفافية والمصداقية في التعامل، ونلتزم بتقديم أفضل الخدمات لعملائنا وشركائنا، مع الحفاظ على أعلى معايير الجودة والاحترافية.'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary via-secondary to-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-amiri mb-4">
            من نحن
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            إبداع الحرفه للتسويق هي منصة رائدة في مجال بطاقات الاشتراك والخصومات في المملكة العربية السعودية، نربط بين العملاء وأفضل الشركاء التجاريين لتوفير تجربة تسوق استثنائية
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {values.map((value) => (
            <div
              key={value.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-premium hover:bg-white/15 hover:shadow-xl"
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
                  <Icon name={value.icon as any} size={40} className="text-accent" />
                </div>
              </div>
              <h3 className="text-2xl font-bold font-amiri mb-4 text-center">
                {value.title}
              </h3>
              <p className="text-white/90 leading-relaxed text-center">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold font-amiri mb-4">
                لماذا تختار إبداع الحرفه ؟
                              </h3>
              <ul className="space-y-3">
                {[
                  'أكثر من 200 شريك تجاري موثوق',
                  'خصومات حصرية تصل إلى 40%',
                  'بطاقات مناسبة لجميع الاحتياجات',
                  'دعم فني متواصل على مدار الساعة',
                  'تجديد سهل وسريع للاشتراكات'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Icon name="CheckCircleIcon" size={24} className="text-accent flex-shrink-0" />
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center md:text-right">
              <div className="bg-accent/20 rounded-2xl p-8 mb-6">
                <p className="text-5xl font-bold mb-2 data-text">15,000+</p>
                <p className="text-lg opacity-90">عميل راضٍ عن خدماتنا</p>
              </div>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground rounded-xl font-bold text-lg transition-premium hover:bg-accent/90 hover:shadow-lg active-press"
              >
                <Icon name="InformationCircleIcon" size={24} />
                <span>اعرف المزيد عنا</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntroSection;