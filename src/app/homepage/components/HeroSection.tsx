'use client';

import React, { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface CardData {
  id: string;
  title: string;
  price: string;
  people: string;
  image: string;
  alt: string;
  features: string[];
}

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const cards: CardData[] = [
  {
    id: 'vip',
    title: 'بطاقة VIP',
    price: '1500 ريال',
    people: '6 أشخاص',
    image: "/assets/images/Copy_of_Black_and_Gold_Classy_Business_Card_1_-1769730611123.png",
    alt: 'بطاقة VIP ذهبية فاخرة مع تصميم أنيق وشعار إبداع الحرفة',
    features: ['خصومات حصرية تصل إلى 40%', 'أولوية في الحجوزات', 'عروض خاصة شهرية']
  },
  {
    id: 'family',
    title: 'بطاقة العائلة',
    price: '800 ريال',
    people: '6 أشخاص',
    image: "https://cmgesbyqfxkmwckadqpy.supabase.co/storage/v1/object/sign/cards/Copy%20of%20Black%20and%20Gold%20Classy%20Business%20Card%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNWJhNmJlNC00YzUzLTQwZTItOGI4OC1mYjg1OWNlNzM1YTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjYXJkcy9Db3B5IG9mIEJsYWNrIGFuZCBHb2xkIENsYXNzeSBCdXNpbmVzcyBDYXJkICgyKS5wbmciLCJpYXQiOjE3Njk4NjIzNzgsImV4cCI6MTgwMTM5ODM3OH0.GUcfOCNrXkEu0ZYv9WqgdsbrASIrc5VpfmDID7zH_F4",
    alt: 'بطاقة عائلية زرقاء مع تصميم Vision 2030 ورمز QR',
    features: ['خصومات عائلية تصل إلى 30%', 'مناسبة لجميع أفراد الأسرة', 'توفير حقيقي على المشتريات']
  }];


  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cards.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [isHydrated, cards.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  if (!isHydrated) {
    return (
      <section className="relative bg-gradient-to-br from-primary via-secondary to-primary min-h-[600px] flex items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </section>);

  }

  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold font-amiri leading-tight">
              وفّر أكثر مع بطاقات الاشتراك المميزة
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 leading-relaxed">
              احصل على خصومات حصرية تصل إلى 40% في أكثر من 200 شريك تجاري
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/subscription-cards"
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-bold text-lg transition-premium hover:bg-accent/90 hover:shadow-xl active-press">

                <Icon name="CreditCardIcon" size={24} />
                <span>اشترك الآن</span>
              </Link>
              <Link
                href="/partners-network"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 text-white rounded-lg font-bold text-lg transition-premium hover:bg-white/20 backdrop-blur-sm">

                <Icon name="BuildingStorefrontIcon" size={24} />
                <span>تصفح الشركاء</span>
              </Link>
            </div>
          </div>

          {/* Card Slider */}
          <div className="relative">
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-6">
              {cards.map((card, index) =>
              <div
                key={card.id}
                className={`absolute inset-0 transition-all duration-1000 flex items-center justify-center p-6 ${
                currentSlide === index ?
                'opacity-100 scale-100' : 'opacity-0 scale-95'}`
                }>

                  <AppImage
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-contain" />
                </div>
              )}
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-3 mt-6">
              {cards.map((_, index) =>
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-3 h-3 rounded-full transition-premium ${
                currentSlide === index ?
                'bg-accent w-12' : 'bg-white/40 hover:bg-white/60'}`
                }
                aria-label={`الانتقال إلى الشريحة ${index + 1}`} />

              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;