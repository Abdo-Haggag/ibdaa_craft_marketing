'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Category {
  id: string;
  name: string;
  icon: string;
  avgSpending: number;
  vipDiscount: number;
  familyDiscount: number;
}

const SavingsCalculator = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [monthlyVisits, setMonthlyVisits] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const categories: Category[] = [
    {
      id: 'medicine',
      name: 'الطب والصحة',
      icon: 'HeartIcon',
      avgSpending: 500,
      vipDiscount: 20,
      familyDiscount: 15,
    },
    {
      id: 'restaurants',
      name: 'المطاعم',
      icon: 'BuildingStorefrontIcon',
      avgSpending: 300,
      vipDiscount: 17.5,
      familyDiscount: 12.5,
    },
    {
      id: 'clothing',
      name: 'الملابس',
      icon: 'ShoppingBagIcon',
      avgSpending: 800,
      vipDiscount: 27.5,
      familyDiscount: 20,
    },
    {
      id: 'sweets',
      name: 'الحلويات',
      icon: 'CakeIcon',
      avgSpending: 200,
      vipDiscount: 20,
      familyDiscount: 15,
    },
    {
      id: 'sports',
      name: 'الرياضة',
      icon: 'TrophyIcon',
      avgSpending: 400,
      vipDiscount: 25,
      familyDiscount: 18,
    },
  ];

  const toggleCategory = (categoryId: string) => {
    if (!isHydrated) return;

    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
      const newVisits = { ...monthlyVisits };
      delete newVisits[categoryId];
      setMonthlyVisits(newVisits);
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
      setMonthlyVisits({ ...monthlyVisits, [categoryId]: 2 });
    }
  };

  const updateVisits = (categoryId: string, visits: number) => {
    if (!isHydrated) return;
    setMonthlyVisits({ ...monthlyVisits, [categoryId]: Math.max(1, visits) });
  };

  const calculateSavings = (cardType: 'vip' | 'family') => {
    if (!isHydrated) return 0;

    let totalSavings = 0;
    selectedCategories.forEach((catId) => {
      const category = categories.find((c) => c.id === catId);
      if (category) {
        const visits = monthlyVisits[catId] || 2;
        const discount = cardType === 'vip' ? category.vipDiscount : category.familyDiscount;
        totalSavings += category.avgSpending * visits * 12 * (discount / 100);
      }
    });
    return Math.round(totalSavings);
  };

  const vipSavings = calculateSavings('vip');
  const familySavings = calculateSavings('family');
  const vipProfit = vipSavings - 1500;
  const familyProfit = familySavings - 800;

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-xl shadow-lg border border-border p-6 md:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-6 md:p-8">
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-primary font-amiri mb-2 flex items-center justify-center gap-3">
          <Icon name="CalculatorIcon" size={28} />
          <span>احسب توفيرك السنوي</span>
        </h3>
        <p className="text-sm text-muted-foreground">
          اختر الفئات التي تستخدمها وعدد الزيارات الشهرية
        </p>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={`p-4 rounded-lg border-2 transition-premium ${
              selectedCategories.includes(category.id)
                ? 'border-accent bg-accent/10' :'border-border bg-background hover:border-accent/50'
            }`}
          >
            <Icon
              name={category.icon as any}
              size={32}
              className={`mx-auto mb-2 ${
                selectedCategories.includes(category.id) ? 'text-accent' : 'text-primary'
              }`}
            />
            <p className="text-xs font-medium text-foreground text-center">{category.name}</p>
          </button>
        ))}
      </div>

      {/* Visits Input */}
      {selectedCategories.length > 0 && (
        <div className="space-y-4 mb-6">
          <h4 className="text-sm font-semibold text-foreground">عدد الزيارات الشهرية:</h4>
          {selectedCategories.map((catId) => {
            const category = categories.find((c) => c.id === catId);
            if (!category) return null;

            return (
              <div
                key={catId}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Icon name={category.icon as any} size={20} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">{category.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateVisits(catId, (monthlyVisits[catId] || 2) - 1)}
                    className="w-8 h-8 rounded-md bg-background border border-border hover:bg-accent hover:text-accent-foreground transition-premium flex items-center justify-center"
                  >
                    <Icon name="MinusIcon" size={16} />
                  </button>
                  <span className="w-12 text-center font-bold text-foreground data-text">
                    {monthlyVisits[catId] || 2}
                  </span>
                  <button
                    onClick={() => updateVisits(catId, (monthlyVisits[catId] || 2) + 1)}
                    className="w-8 h-8 rounded-md bg-background border border-border hover:bg-accent hover:text-accent-foreground transition-premium flex items-center justify-center"
                  >
                    <Icon name="PlusIcon" size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Results */}
      {selectedCategories.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {/* VIP Results */}
          <div className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border-2 border-accent/20">
            <h4 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
              <Icon name="StarIcon" size={20} />
              <span>بطاقة VIP</span>
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">التوفير السنوي:</span>
                <span className="text-xl font-bold text-success data-text">
                  {vipSavings.toLocaleString('ar-SA')} ريال
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">تكلفة البطاقة:</span>
                <span className="text-lg font-medium text-foreground data-text">
                  1,500 ريال
                </span>
              </div>
              <div className="pt-3 border-t border-accent/20">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-foreground">صافي الربح:</span>
                  <span
                    className={`text-2xl font-bold data-text ${
                      vipProfit > 0 ? 'text-success' : 'text-error'
                    }`}
                  >
                    {vipProfit > 0 ? '+' : ''}
                    {vipProfit.toLocaleString('ar-SA')} ريال
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Family Results */}
          <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border-2 border-primary/20">
            <h4 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Icon name="UsersIcon" size={20} />
              <span>بطاقة العائلة</span>
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">التوفير السنوي:</span>
                <span className="text-xl font-bold text-success data-text">
                  {familySavings.toLocaleString('ar-SA')} ريال
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">تكلفة البطاقة:</span>
                <span className="text-lg font-medium text-foreground data-text">800 ريال</span>
              </div>
              <div className="pt-3 border-t border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-foreground">صافي الربح:</span>
                  <span
                    className={`text-2xl font-bold data-text ${
                      familyProfit > 0 ? 'text-success' : 'text-error'
                    }`}
                  >
                    {familyProfit > 0 ? '+' : ''}
                    {familyProfit.toLocaleString('ar-SA')} ريال
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedCategories.length === 0 && (
        <div className="text-center py-8">
          <Icon name="CursorArrowRaysIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">اختر الفئات أعلاه لبدء الحساب</p>
        </div>
      )}
    </div>
  );
};

export default SavingsCalculator;