import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface CompanyIntroductionProps {
  title: string;
  description: string;
  mission: string;
  vision: string;
}

const CompanyIntroduction = ({
  title,
  description,
  mission,
  vision,
}: CompanyIntroductionProps) => {
  return (
    <section className="bg-card rounded-lg shadow-sm border border-border p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-amiri">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="LightBulbIcon" size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold font-amiri">رؤيتنا</h2>
            </div>
            <p className="text-white/90 leading-relaxed text-lg">{vision}</p>
          </div>

          <div className="bg-gradient-to-br from-accent to-warning rounded-lg p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="RocketLaunchIcon" size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold font-amiri">مهمتنا</h2>
            </div>
            <p className="text-white/90 leading-relaxed text-lg">{mission}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntroduction;