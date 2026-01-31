import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface CategoryStatsProps {
  category: {
    id: string;
    label: string;
    icon: string;
    discountRange: string;
    partnerCount: number;
    color: string;
  };
}

const CategoryStats = ({ category }: CategoryStatsProps) => {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6">
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-lg ${category.color}`}
        >
          <Icon name={category.icon as any} size={28} variant="solid" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground font-amiri mb-1">
            {category.label}
          </h3>
          <p className="text-sm text-muted-foreground">
            {category.partnerCount} شريك متاح
          </p>
        </div>
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">نطاق الخصم</span>
          <span className="text-xl font-bold text-accent font-amiri">
            {category.discountRange}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryStats;