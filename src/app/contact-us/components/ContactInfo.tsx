import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ContactInfoItem {
  icon: string;
  title: string;
  content: string;
  link?: string;
  type?: 'phone' | 'email' | 'address';
}

const ContactInfo = () => {
  const contactItems: ContactInfoItem[] = [
    {
      icon: 'PhoneIcon',
      title: 'الهاتف',
      content: '+966 590 317 360',
      link: 'tel:+966590317360',
      type: 'phone',
    },
    {
      icon: 'EnvelopeIcon',
      title: 'البريد الإلكتروني',
      content: 'info@creativecraftsa.com',
      link: 'mailto:info@creativecraftsa.com',
      type: 'email',
    },
    {
      icon: 'MapPinIcon',
      title: 'العنوان',
      content: 'خميس مشيط - حي الخالدية',
      type: 'address',
    },
    {
      icon: 'ClockIcon',
      title: 'ساعات العمل',
      content: 'السبت - الخميس: 9:00 صباحاً - 6:00 مساءً',
      type: 'address',
    },
  ];

  const socialLinks = [
    { icon: 'facebook', name: 'فيسبوك', url: 'https://facebook.com/ibdaacraft' },
    { icon: 'twitter', name: 'تويتر', url: 'https://twitter.com/ibdaacraft' },
    { icon: 'instagram', name: 'إنستغرام', url: 'https://instagram.com/ibdaacraft' },
    { icon: 'linkedin', name: 'لينكد إن', url: 'https://linkedin.com/company/ibdaacraft' },
  ];

  return (
    <div className="space-y-8">
      {/* Contact Information Cards */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground font-amiri mb-6">
          معلومات الاتصال
        </h2>
        {contactItems.map((item, index) => (
          <div
            key={index}
            className="bg-card rounded-lg p-6 border border-border hover:shadow-md transition-premium"
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary flex-shrink-0">
                <Icon name={item.icon as any} size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-muted-foreground hover:text-primary transition-premium inline-block"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{item.content}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Social Media Links */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 font-amiri">
          تابعنا على وسائل التواصل الاجتماعي
        </h3>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-premium"
              aria-label={social.name}
            >
              <Icon name="GlobeAltIcon" size={20} />
              <span className="text-sm font-medium">{social.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Business Credentials */}
      <div className="bg-accent/10 rounded-lg p-6 border border-accent/20">
        <h3 className="text-lg font-semibold text-foreground mb-3 font-amiri">
          معلومات الشركة
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">السجل التجاري:</span> 1009090220
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;