'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SocialProvider {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
}

const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const providers: SocialProvider[] = [
    {
      name: 'Google',
      icon: 'GlobeAltIcon',
      color: 'text-red-600',
      bgColor: 'bg-red-50 hover:bg-red-100',
    },
    {
      name: 'Apple',
      icon: 'DevicePhoneMobileIcon',
      color: 'text-gray-900',
      bgColor: 'bg-gray-50 hover:bg-gray-100',
    },
  ];

  const handleSocialLogin = async (providerName: string) => {
    setIsLoading(providerName);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(null);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">أو تسجيل الدخول باستخدام</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {providers.map((provider) => (
          <button
            key={provider.name}
            onClick={() => handleSocialLogin(provider.name)}
            disabled={isLoading !== null}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-border ${provider.bgColor} transition-premium active-press disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading === provider.name ? (
              <Icon name="ArrowPathIcon" size={20} className="animate-spin text-muted-foreground" />
            ) : (
              <Icon name={provider.icon as any} size={20} className={provider.color} />
            )}
            <span className="text-sm font-medium text-foreground">{provider.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;