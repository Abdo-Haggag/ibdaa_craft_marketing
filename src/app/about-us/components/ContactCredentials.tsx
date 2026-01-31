import React from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface ContactInfo {
  type: string;
  value: string;
  icon: string;
  link?: string;
}

interface BusinessCredential {
  label: string;
  value: string;
  icon: string;
}

interface ContactCredentialsProps {
  contactInfo: ContactInfo[];
  businessCredentials: BusinessCredential[];
}

const ContactCredentials = ({
  contactInfo,
  businessCredentials,
}: ContactCredentialsProps) => {
  return (
    <section className="bg-card py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-amiri">
            معلومات الاتصال
          </h2>
          <p className="text-lg text-muted-foreground">
            نحن هنا لخدمتك في أي وقت
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-background rounded-lg p-8 border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6 font-amiri flex items-center gap-3">
              <Icon name="PhoneIcon" size={28} className="text-accent" />
              تواصل معنا
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon
                      name={info.icon as any}
                      size={20}
                      className="text-primary"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      {info.type}
                    </p>
                    {info.link ? (
                      <Link
                        href={info.link}
                        className="text-foreground font-medium hover:text-primary transition-premium"
                      >
                        {info.value}
                      </Link>
                    ) : (
                      <p className="text-foreground font-medium">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <Link
                href="/contact-us"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-accent text-accent-foreground rounded-md font-medium transition-premium hover:bg-accent/90 hover:shadow-md active-press"
              >
                <Icon name="PaperAirplaneIcon" size={20} />
                <span>أرسل رسالة</span>
              </Link>
            </div>
          </div>

          <div className="bg-background rounded-lg p-8 border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6 font-amiri flex items-center gap-3">
              <Icon name="DocumentTextIcon" size={28} className="text-accent" />
              الاعتمادات التجارية
            </h3>
            <div className="space-y-4">
              {businessCredentials.map((credential, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border"
                >
                  <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon
                      name={credential.icon as any}
                      size={20}
                      className="text-success"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      {credential.label}
                    </p>
                    <p className="text-foreground font-medium font-ibm-plex data-text">
                      {credential.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 border border-primary/10 text-center">
          <Icon
            name="ShieldCheckIcon"
            size={48}
            className="text-success mx-auto mb-4"
          />
          <h4 className="text-xl font-bold text-foreground mb-2 font-amiri">
            شركة موثوقة ومعتمدة
          </h4>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            جميع معلوماتنا التجارية مسجلة ومعتمدة من الجهات الرسمية في المملكة
            العربية السعودية
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactCredentials;