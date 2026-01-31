'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

interface MemberDashboardNavProps {
  userName?: string;
  subscriptionType?: 'VIP' | 'Family';
  onLogout?: () => void;
}

const MemberDashboardNav = ({
  userName: propUserName,
  subscriptionType: propSubscriptionType,
  onLogout,
}: MemberDashboardNavProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState(propUserName || 'عضو');
  const [subscriptionType, setSubscriptionType] = useState<'VIP' | 'Family'>(propSubscriptionType || 'VIP');
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const supabase = createClient();

  // Fetch user data from Supabase
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const { data: profileData, error } = await supabase
          .from('user_profiles')
          .select('full_name, membership_type')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching user profile:', error);
          return;
        }

        if (profileData) {
          setUserName(profileData.full_name || user.email?.split('@')[0] || 'عضو');
          setSubscriptionType(
            profileData.membership_type === 'family' ? 'Family' : 'VIP'
          );
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchUserData();
  }, [user]);

  const dashboardItems = [
    { label: 'لوحة التحكم', href: '/customer-dashboard', icon: 'HomeIcon' },
    { label: 'اشتراكاتي', href: '/subscription-cards', icon: 'CreditCardIcon' },
    { label: 'الشركاء', href: '/partners-network', icon: 'BuildingStorefrontIcon' },
    { label: 'الدعم', href: '/contact-us', icon: 'ChatBubbleLeftRightIcon' },
  ];

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
    router.push('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-card shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20 px-6">
          {/* Logo and User Info */}
          <div className="flex items-center gap-6">
            <Link
              href="/customer-dashboard"
              className="flex items-center gap-3 transition-premium hover:opacity-80"
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
              <div className="hidden md:flex flex-col">
                <span className="text-lg font-bold font-amiri text-primary leading-tight">
                  إبداع الحرفة
                </span>
                <span className="text-xs text-muted-foreground font-tajawal">
                  لوحة العضو
                </span>
              </div>
            </Link>

            {/* User Badge */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-md bg-accent/10 border border-accent/20">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold">
                {userName.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{userName}</span>
                <span className="text-xs text-accent font-medium">
                  {subscriptionType === 'VIP' ? 'عضوية VIP' : 'عضوية عائلية'}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {dashboardItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-5 py-3 rounded-md transition-premium font-medium ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground hover:bg-muted hover:text-primary'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-3 rounded-md text-error hover:bg-error/10 transition-premium font-medium mr-2"
            >
              <Icon name="ArrowRightOnRectangleIcon" size={20} />
              <span>خروج</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted transition-premium focus-ring"
            aria-label="القائمة"
          >
            <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="flex flex-col p-4 space-y-2">
              {/* Mobile User Info */}
              <div className="flex items-center gap-3 p-4 mb-2 rounded-md bg-accent/10 border border-accent/20">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground font-bold">
                  {userName.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{userName}</span>
                  <span className="text-xs text-accent font-medium">
                    {subscriptionType === 'VIP' ? 'عضوية VIP' : 'عضوية عائلية'}
                  </span>
                </div>
              </div>

              {dashboardItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-premium font-medium ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-foreground hover:bg-muted hover:text-primary'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Mobile Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-md text-error hover:bg-error/10 transition-premium font-medium w-full mt-2"
              >
                <Icon name="ArrowRightOnRectangleIcon" size={20} />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MemberDashboardNav;