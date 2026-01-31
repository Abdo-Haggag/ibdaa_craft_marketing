'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CalculatorResult {
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
  discountPercentage: number;
}

const SavingsCalculator = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [spendingAmount, setSpendingAmount] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState<'vip' | 'family'>('vip');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const calculateSavings = () => {
    const amount = parseFloat(spendingAmount);
    if (isNaN(amount) || amount <= 0) {
      return;
    }

    const discountPercentage = selectedCard === 'vip' ? 0.35 : 0.25;
    const discountAmount = amount * discountPercentage;
    const finalAmount = amount - discountAmount;

    setResult({
      originalAmount: amount,
      discountAmount,
      finalAmount,
      discountPercentage: discountPercentage * 100
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setSpendingAmount(value);
    setResult(null);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('ar-SA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  if (!isHydrated) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="bg-card rounded-2xl shadow-lg p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
              <div className="h-12 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground font-amiri mb-4">
              احسب توفيرك الشهري
            </h2>
            <p className="text-lg text-muted-foreground">
              اكتشف كم ستوفر مع بطاقات الاشتراك الخاصة بنا
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-lg p-8 space-y-8">
            {/* Card Type Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                اختر نوع البطاقة
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedCard('vip')}
                  className={`p-6 rounded-xl border-2 transition-premium ${
                    selectedCard === 'vip' ?'border-accent bg-accent/10' :'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Icon name="StarIcon" size={24} className="text-accent" />
                    <span className="text-xl font-bold font-amiri">بطاقة VIP</span>
                  </div>
                  <p className="text-sm text-muted-foreground">خصم حتى 35%</p>
                </button>

                <button
                  onClick={() => setSelectedCard('family')}
                  className={`p-6 rounded-xl border-2 transition-premium ${
                    selectedCard === 'family' ?'border-accent bg-accent/10' :'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Icon name="UserGroupIcon" size={24} className="text-accent" />
                    <span className="text-xl font-bold font-amiri">بطاقة العائلة</span>
                  </div>
                  <p className="text-sm text-muted-foreground">خصم حتى 25%</p>
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label htmlFor="spending-amount" className="block text-sm font-medium text-foreground mb-3">
                أدخل مبلغ الإنفاق الشهري (ريال سعودي)
              </label>
              <div className="relative">
                <input
                  id="spending-amount"
                  type="text"
                  value={spendingAmount}
                  onChange={handleInputChange}
                  placeholder="مثال: 5000"
                  className="w-full px-6 py-4 pr-12 rounded-xl border-2 border-border focus:border-accent focus:outline-none transition-premium text-lg"
                />
                <Icon
                  name="BanknotesIcon"
                  size={24}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateSavings}
              disabled={!spendingAmount}
              className="w-full py-4 bg-accent text-accent-foreground rounded-xl font-bold text-lg transition-premium hover:bg-accent/90 hover:shadow-lg active-press disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <Icon name="CalculatorIcon" size={24} />
              <span>احسب التوفير</span>
            </button>

            {/* Results */}
            {result && (
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-8 space-y-6 border-2 border-accent/20">
                <h3 className="text-2xl font-bold text-foreground font-amiri text-center mb-6">
                  نتائج الحساب
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">المبلغ الأصلي</p>
                    <p className="text-2xl font-bold text-foreground data-text">
                      {formatNumber(result.originalAmount)} ريال
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">قيمة الخصم</p>
                    <p className="text-2xl font-bold text-success data-text">
                      {formatNumber(result.discountAmount)} ريال
                    </p>
                    <p className="text-xs text-accent font-medium mt-1">
                      ({result.discountPercentage}% خصم)
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">المبلغ النهائي</p>
                    <p className="text-2xl font-bold text-primary data-text">
                      {formatNumber(result.finalAmount)} ريال
                    </p>
                  </div>
                </div>

                <div className="bg-accent/20 rounded-lg p-4 text-center">
                  <p className="text-sm text-foreground">
                    <Icon name="SparklesIcon" size={20} className="inline ml-2 text-accent" />
                    ستوفر <span className="font-bold text-accent data-text">{formatNumber(result.discountAmount)} ريال</span> شهرياً
                    مع بطاقة {selectedCard === 'vip' ? 'VIP' : 'العائلة'}!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;