import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Metric {
  value: string;
  label: string;
  icon: string;
  suffix?: string;
}

interface CompanyMetricsProps {
  metrics: Metric[];
}

const CompanyMetrics = ({ metrics }: CompanyMetricsProps) => {
  return (
    <section className="bg-gradient-to-br from-primary to-secondary py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-amiri">
            إنجازاتنا بالأرقام
          </h2>
          <p className="text-lg text-white/80">
            نمو مستمر وثقة متزايدة من عملائنا
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20 hover:bg-white/15 transition-premium"
            >
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon
                  name={metric.icon as any}
                  size={32}
                  className="text-white"
                />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-amiri">
                {metric.value}
                {metric.suffix && (
                  <span className="text-accent">{metric.suffix}</span>
                )}
              </div>
              <p className="text-white/80 text-sm md:text-base">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyMetrics;