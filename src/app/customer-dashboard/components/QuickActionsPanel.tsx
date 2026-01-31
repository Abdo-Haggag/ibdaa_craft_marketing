'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface QuickActionsPanelProps {
  cardImageUrl?: string;
  onContactSupport?: () => void;
  onRenewSubscription?: () => void;
}

const QuickActionsPanel = ({
  cardImageUrl,
  onContactSupport,
  onRenewSubscription,
}: QuickActionsPanelProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-12 bg-muted rounded"></div>
          <div className="h-12 bg-muted rounded"></div>
          <div className="h-12 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const handleDownloadCard = async () => {
    if (!cardImageUrl) {
      alert('لا توجد صورة للبطاقة للتحميل');
      return;
    }

    try {
      const response = await fetch(cardImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'membership-card.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading card:', error);
      alert('حدث خطأ أثناء تحميل البطاقة');
    }
  };

  const handleContactSupport = () => {
    if (onContactSupport) {
      onContactSupport();
    }
  };

  const handleRenewSubscription = () => {
    if (onRenewSubscription) {
      onRenewSubscription();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('حدث خطأ أثناء تسجيل الخروج');
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6">
      <h2 className="text-xl font-bold text-foreground font-amiri mb-6 flex items-center gap-2">
        <Icon name="BoltIcon" size={24} className="text-primary" />
        إجراءات سريعة
      </h2>

      <div className="space-y-3">
        <button
          onClick={handleDownloadCard}
          className="w-full flex items-center gap-3 px-5 py-4 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-premium font-medium shadow-sm hover:shadow-md"
        >
          <Icon name="ArrowDownTrayIcon" size={20} />
          <span>تحميل البطاقة الرقمية</span>
        </button>

        <button
          onClick={handleContactSupport}
          className="w-full flex items-center gap-3 px-5 py-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-premium font-medium shadow-sm hover:shadow-md"
        >
          <Icon name="ChatBubbleLeftRightIcon" size={20} />
          <span>التواصل مع الدعم</span>
        </button>

        <button
          onClick={handleRenewSubscription}
          className="w-full flex items-center gap-3 px-5 py-4 rounded-md bg-muted text-foreground hover:bg-muted/80 transition-premium font-medium border border-border"
        >
          <Icon name="ArrowPathIcon" size={20} />
          <span>تجديد الاشتراك</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-5 py-4 rounded-md bg-red-500 text-white hover:bg-red-600 transition-premium font-medium shadow-sm hover:shadow-md"
        >
          <Icon name="ArrowRightOnRectangleIcon" size={20} />
          <span>تسجيل الخروج</span>
        </button>

        <div className="pt-4 border-t border-border">
          <a
            href="/partners-network"
            className="w-full flex items-center gap-3 px-5 py-4 rounded-md bg-background text-foreground hover:bg-muted transition-premium font-medium border border-border"
          >
            <Icon name="BuildingStorefrontIcon" size={20} />
            <span>تصفح شبكة الشركاء</span>
          </a>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
        <div className="flex items-start gap-3">
          <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-foreground font-medium mb-1">نصيحة اليوم</p>
            <p className="text-xs text-muted-foreground">
              استخدم بطاقتك في أكثر من شريك للحصول على أقصى استفادة من اشتراكك!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;