'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface AuthenticationBridgeProps {
  isAuthenticated?: boolean;
  userName?: string;
  onLogout?: () => void;
}

const AuthenticationBridge = ({
  isAuthenticated = false,
  userName = 'عضو',
  onLogout,
}: AuthenticationBridgeProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.auth-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    if (onLogout) {
      onLogout();
    }
    router.push('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground font-medium transition-premium hover:bg-accent/90 hover:shadow-md active-press"
      >
        <Icon name="ArrowRightOnRectangleIcon" size={20} />
        <span>تسجيل الدخول</span>
      </Link>
    );
  }

  return (
    <div className="relative auth-dropdown">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-3 px-4 py-2 rounded-md bg-muted hover:bg-muted/80 transition-premium focus-ring"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
          {userName.charAt(0)}
        </div>
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-medium text-foreground">{userName}</span>
          <span className="text-xs text-muted-foreground">عضو مميز</span>
        </div>
        <Icon
          name="ChevronDownIcon"
          size={20}
          className={`transition-premium ${isDropdownOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-popover rounded-md shadow-lg z-1100 overflow-hidden">
          <div className="p-4 border-b border-border">
            <p className="text-sm font-medium text-popover-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground mt-1">عضوية نشطة</p>
          </div>

          <div className="py-2">
            <Link
              href="/customer-dashboard"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-premium"
            >
              <Icon name="UserCircleIcon" size={20} />
              <span>لوحة التحكم</span>
            </Link>

            <Link
              href="/subscription-cards"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-premium"
            >
              <Icon name="CreditCardIcon" size={20} />
              <span>اشتراكاتي</span>
            </Link>

            <Link
              href="/partners-network"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-premium"
            >
              <Icon name="BuildingStorefrontIcon" size={20} />
              <span>الشركاء</span>
            </Link>

            <Link
              href="/contact-us"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-premium"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={20} />
              <span>الدعم</span>
            </Link>
          </div>

          <div className="border-t border-border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-sm text-error hover:bg-error/10 transition-premium w-full"
            >
              <Icon name="ArrowRightOnRectangleIcon" size={20} />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticationBridge;