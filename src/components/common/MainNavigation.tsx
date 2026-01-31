'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';


interface NavigationItem {
  label: string;
  href: string;
  icon: string;
  priority: number;
}

const MainNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const navigationItems: NavigationItem[] = [
    { label: 'الرئيسية', href: '/homepage', icon: 'HomeIcon', priority: 1 },
    { label: 'من نحن', href: '/about-us', icon: 'InformationCircleIcon', priority: 2 },
    { label: 'بطاقات الاشتراك', href: '/subscription-cards', icon: 'CreditCardIcon', priority: 3 },
    { label: 'شبكة الشركاء', href: '/partners-network', icon: 'BuildingStorefrontIcon', priority: 4 },
    { label: 'اتصل بنا', href: '/contact-us', icon: 'PhoneIcon', priority: 5 },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => pathname === href;

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-1000 transition-premium ${
        isScrolled ? 'bg-card shadow-md' : 'bg-card'
      }`}
      suppressHydrationWarning
    >
      <nav className="container mx-auto">
        <div className="flex items-center justify-between h-20 px-6">
          {/* Logo */}
          <Link
            href="/homepage"
            className="flex items-center gap-3 transition-premium hover:opacity-80"
            onClick={closeMobileMenu}
          >
            <div className="relative w-12 h-12">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <rect width="48" height="48" rx="12" fill="url(#gradient)" />
                <path
                  d="M24 12L32 20H28V32H20V20H16L24 12Z"
                  fill="white"
                  opacity="0.9"
                />
                <circle cx="24" cy="36" r="2" fill="#D97706" />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0"
                    y1="0"
                    x2="48"
                    y2="48"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#1E3A8A" />
                    <stop offset="1" stopColor="#1E40AF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-amiri text-primary leading-tight" suppressHydrationWarning>
                إبداع الحرفة
              </span>
              <span className="text-xs text-muted-foreground font-tajawal">
                للتسويق
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-6 py-3 rounded-md transition-premium font-medium ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground hover:bg-muted hover:text-primary'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Customer Dashboard Link - Only show when logged in */}
            {user && (
              <Link
                href="/customer-dashboard"
                className={`flex items-center gap-2 px-6 py-3 rounded-md transition-premium font-medium ${
                  isActive('/customer-dashboard')
                    ? 'bg-primary text-primary-foreground shadow-sm' :'text-foreground hover:bg-muted hover:text-primary'
                }`}
              >
                <Icon name="UserCircleIcon" size={20} />
                <span>لوحة العضو</span>
              </Link>
            )}

            {/* Login Button - Only show when NOT logged in */}
            {!user && (
              <Link
                href="/login"
                className="flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground font-medium transition-premium hover:bg-accent/90 hover:shadow-md active-press mr-2"
              >
                <Icon name="ArrowRightOnRectangleIcon" size={20} />
                <span>تسجيل الدخول</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted transition-premium focus-ring"
            aria-label="القائمة"
          >
            <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-20 z-1100 bg-card">
            <div className="flex flex-col p-6 space-y-2 overflow-y-auto h-full">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-6 py-4 rounded-md transition-premium font-medium text-lg ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-foreground hover:bg-muted hover:text-primary'
                  }`}
                >
                  <Icon name={item.icon as any} size={24} />
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Customer Dashboard Link - Mobile - Only show when logged in */}
              {user && (
                <Link
                  href="/customer-dashboard"
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-6 py-4 rounded-md transition-premium font-medium text-lg ${
                    isActive('/customer-dashboard')
                      ? 'bg-primary text-primary-foreground shadow-sm' :'text-foreground hover:bg-muted hover:text-primary'
                  }`}
                >
                  <Icon name="UserCircleIcon" size={24} />
                  <span>لوحة العضو</span>
                </Link>
              )}

              {/* Mobile Login Button - Only show when NOT logged in */}
              {!user && (
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-6 py-4 rounded-md bg-accent text-accent-foreground font-medium text-lg transition-premium hover:bg-accent/90 hover:shadow-md active-press mt-4"
                >
                  <Icon name="ArrowRightOnRectangleIcon" size={24} />
                  <span>تسجيل الدخول</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default MainNavigation;