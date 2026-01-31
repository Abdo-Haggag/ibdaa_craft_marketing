'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ComparisonFeature {
  feature: string;
  vip: boolean | string;
  family: boolean | string;
}

interface ComparisonToggleProps {
  features: ComparisonFeature[];
}

const ComparisonToggle = ({ features }: ComparisonToggleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-6 md:p-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-6"
      >
        <h3 className="text-xl md:text-2xl font-bold text-primary font-amiri flex items-center gap-3">
          <Icon name="ScaleIcon" size={28} />
          <span>مقارنة تفصيلية بين البطاقات</span>
        </h3>
        <Icon
          name="ChevronDownIcon"
          size={24}
          className={`text-primary transition-premium ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-right py-4 px-4 text-sm font-semibold text-foreground">
                  الميزة
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-accent">
                  VIP
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-primary">
                  العائلة
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className="border-b border-border hover:bg-muted transition-premium"
                >
                  <td className="py-4 px-4 text-sm text-foreground">{feature.feature}</td>
                  <td className="py-4 px-4 text-center">
                    {typeof feature.vip === 'boolean' ? (
                      feature.vip ? (
                        <Icon name="CheckCircleIcon" size={24} className="text-success mx-auto" />
                      ) : (
                        <Icon name="XCircleIcon" size={24} className="text-error mx-auto" />
                      )
                    ) : (
                      <span className="text-sm font-medium text-foreground">{feature.vip}</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {typeof feature.family === 'boolean' ? (
                      feature.family ? (
                        <Icon name="CheckCircleIcon" size={24} className="text-success mx-auto" />
                      ) : (
                        <Icon name="XCircleIcon" size={24} className="text-error mx-auto" />
                      )
                    ) : (
                      <span className="text-sm font-medium text-foreground">
                        {feature.family}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComparisonToggle;