'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Credential {
  type: string;
  email: string;
  password: string;
  description: string;
}

const TestCredentials = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const credentials: Credential[] = [
    {
      type: 'VIP',
      email: 'vip@ibdaacraft.com',
      password: 'VIP2026!',
      description: 'حساب عضوية VIP - 6 أشخاص',
    },
    {
      type: 'Family',
      email: 'family@ibdaacraft.com',
      password: 'Family2026!',
      description: 'حساب عضوية عائلية - 6 أشخاص',
    },
  ];

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 rounded-md bg-muted/50 border border-border hover:bg-muted transition-premium"
      >
        <div className="flex items-center gap-2">
          <Icon name="InformationCircleIcon" size={20} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            بيانات الاختبار التجريبية
          </span>
        </div>
        <Icon
          name="ChevronDownIcon"
          size={20}
          className={`text-muted-foreground transition-premium ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isExpanded && (
        <div className="mt-2 p-4 rounded-md bg-card border border-border space-y-4">
          <p className="text-xs text-muted-foreground">
            استخدم أحد الحسابات التالية لتجربة النظام:
          </p>

          {credentials.map((cred, index) => (
            <div
              key={index}
              className="p-4 rounded-md bg-background border border-border space-y-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    cred.type === 'VIP' ?'bg-accent/10 text-accent' :'bg-primary/10 text-primary'
                  }`}
                >
                  {cred.type}
                </div>
                <span className="text-xs text-muted-foreground">{cred.description}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">البريد الإلكتروني</p>
                    <p className="text-sm font-medium text-foreground font-mono">
                      {cred.email}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(cred.email, `email-${index}`)}
                    className="p-2 rounded-md hover:bg-muted transition-premium"
                    title="نسخ"
                  >
                    <Icon
                      name={
                        copiedField === `email-${index}` ? 'CheckIcon' : 'ClipboardIcon'
                      }
                      size={16}
                      className={
                        copiedField === `email-${index}` ? 'text-success' : 'text-muted-foreground'
                      }
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">كلمة المرور</p>
                    <p className="text-sm font-medium text-foreground font-mono">
                      {cred.password}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(cred.password, `password-${index}`)}
                    className="p-2 rounded-md hover:bg-muted transition-premium"
                    title="نسخ"
                  >
                    <Icon
                      name={
                        copiedField === `password-${index}` ? 'CheckIcon' : 'ClipboardIcon'
                      }
                      size={16}
                      className={
                        copiedField === `password-${index}`
                          ? 'text-success' :'text-muted-foreground'
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-start gap-2 p-3 rounded-md bg-warning/10 border border-warning/20">
            <Icon name="ExclamationTriangleIcon" size={16} className="text-warning flex-shrink-0 mt-0.5" />
            <p className="text-xs text-warning">
              هذه بيانات تجريبية للاختبار فقط. لا تستخدم معلومات حقيقية.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCredentials;