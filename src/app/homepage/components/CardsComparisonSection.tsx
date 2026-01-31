'use client';

import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface ComparisonFeature {
  text: string;
  vipOnly?: boolean;
}

const CardsComparisonSection = () => {
  const features: ComparisonFeature[] = [
    { text: 'خصومات على المطاعم' },
    { text: 'خصومات على العيادات الطبية' },
    { text: 'خصومات على الملابس' },
    { text: 'خصومات على الحلويات' },
    { text: 'خصومات على النوادي الرياضية' },
    { text: 'تغطية حي 6 أفراد' },
    { text: 'خصومات أعلى على جميع الفئات', vipOnly: true },
    { text: 'عروض حصرية شهرية' },
    { text: 'أولوية في الحجوزات' },
    { text: 'دعم فني على مدار الساعة' },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            قارن بين البطاقات
          </h2>
          <p className="text-xl text-gray-600">
            اختر البطاقة المناسبة لاحتياجاتك
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* VIP Card - White Background */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 text-center">
              <h3 className="text-3xl font-bold mb-2">بطاقة VIP</h3>
              <p className="text-gray-300 text-lg">للأفراد والعائلات المميزة</p>
            </div>
            
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">1500 ريال</div>
                <div className="text-gray-600 text-lg">سنوياً</div>
              </div>

              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800 text-lg">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full mt-8 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-300 text-lg">
                اشترك الآن
              </button>
            </div>
          </div>

          {/* Family Card - Golden Background */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl shadow-xl overflow-hidden border-2 border-amber-300 hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white p-6 text-center">
              <h3 className="text-3xl font-bold mb-2">بطاقة العائلة</h3>
              <p className="text-amber-100 text-lg">للعائلات الباحثة عن التوفير</p>
            </div>
            
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-amber-900 mb-2">800 ريال</div>
                <div className="text-amber-700 text-lg">سنوياً</div>
              </div>

              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className={`text-amber-900 text-lg ${feature.vipOnly ? 'line-through opacity-50' : ''}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button className="w-full mt-8 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 text-lg shadow-lg">
                اشترك الآن
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            جميع البطاقات صالحة لمدة سنة كاملة من تاريخ الاشتراك
          </p>
        </div>
      </div>
    </section>
  );
};

export default CardsComparisonSection;