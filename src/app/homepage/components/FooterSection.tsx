'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  name: string;
  icon: string;
  href: string;
}

const FooterSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setIsHydrated(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  const quickLinks: FooterLink[] = [
    { label: 'الرئيسية', href: '/homepage' },
    { label: 'من نحن', href: '/about-us' },
    { label: 'بطاقات الاشتراك', href: '/subscription-cards' },
    { label: 'شبكة الشركاء', href: '/partners-network' },
    { label: 'اتصل بنا', href: '/contact-us' }
  ];

  const socialLinks: SocialLink[] = [
    { name: 'تويتر', icon: 'AtSymbolIcon', href: '#' },
    { name: 'إنستغرام', icon: 'CameraIcon', href: '#' },
    { name: 'فيسبوك', icon: 'UserGroupIcon', href: '#' },
    { name: 'واتساب', icon: 'ChatBubbleLeftRightIcon', href: '#' }
  ];

  if (!isHydrated) {
    return (
      <footer className="bg-gradient-to-br from-primary via-secondary to-primary text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full animate-pulse mx-auto"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gradient-to-br from-primary via-secondary to-primary text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <rect width="48" height="48" rx="12" fill="white" fillOpacity="0.1" />
                  <path
                    d="M24 12L32 20H28V32H20V20H16L24 12Z"
                    fill="white"
                    opacity="0.9"
                  />
                  <circle cx="24" cy="36" r="2" fill="#D97706" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-amiri">إبداع الحرفه</h3>
                <p className="text-sm opacity-80">للتسويق</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              منصة رائدة في مجال بطاقات الاشتراك والخصومات في المملكة العربية السعودية. نربط بين العملاء وأفضل الشركاء التجاريين لتوفير تجربة تسوق استثنائية.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-premium hover:bg-accent hover:scale-110"
                  aria-label={social.name}
                >
                  <Icon name={social.icon as any} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold font-amiri mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-accent transition-premium inline-flex items-center gap-2"
                  >
                    <Icon name="ChevronLeftIcon" size={16} />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold font-amiri mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Icon name="PhoneIcon" size={20} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm opacity-80">الهاتف</p>
                  <a href="tel:+966590317360" className="text-white hover:text-accent transition-premium data-text">
                    +966 590 317 360
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="EnvelopeIcon" size={20} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm opacity-80">البريد الإلكتروني</p>
                  <a href="mailto:info@creativecraftsa.com" className="text-white hover:text-accent transition-premium">
                    info@creativecraftsa.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="MapPinIcon" size={20} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm opacity-80">العنوان</p>
                  <p className="text-white/90">خميس مشيط - حي الخالدية</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/70">
              © {currentYear} إبداع الحرفة للتسويق. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-white/70 hover:text-accent transition-premium">
                سياسة الخصوصية
              </Link>
              <Link href="#" className="text-white/70 hover:text-accent transition-premium">
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;