'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

const ThankYouConfirmationInteractive = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setIsVisible(true);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Redirect after 5 seconds
    const redirectTimer = setTimeout(() => {
      router?.push('/homepage');
    }, 5000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center px-4">
      <div
        className={`max-w-2xl w-full text-center transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-accent to-accent/80 rounded-full mb-8 shadow-lg animate-bounce">
          <Icon name="CheckCircleIcon" size={56} className="text-white" />
        </div>

        {/* Main Thank You Message */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary font-amiri mb-6 leading-relaxed">
          شكراً لثقتك بنا
        </h1>

        {/* Confirmation Message */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border p-8 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="DocumentCheckIcon" size={28} className="text-accent" />
            <p className="text-xl md:text-2xl font-semibold text-primary font-cairo">
              تم استلام طلب الاشتراك بنجاح
            </p>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">
            سيتم مراجعة بياناتك والتواصل معك قريباً عبر الواتساب
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center justify-center gap-3 text-muted-foreground">
          <Icon name="ClockIcon" size={24} className="text-accent" />
          <p className="text-lg">
            سيتم تحويلك إلى الصفحة الرئيسية خلال{' '}
            <span className="font-bold text-accent text-2xl mx-1">{countdown}</span>
            {countdown === 1 ? 'ثانية' : 'ثوانٍ'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 w-full max-w-md mx-auto">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-1000 ease-linear"
              style={{ width: `${((5 - countdown) / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Manual Navigation Link */}
        <button
          onClick={() => router?.push('/homepage')}
          className="mt-8 text-primary hover:text-accent transition-colors duration-200 underline text-sm"
        >
          العودة إلى الصفحة الرئيسية الآن
        </button>
      </div>
    </div>
  );
};

export default ThankYouConfirmationInteractive;