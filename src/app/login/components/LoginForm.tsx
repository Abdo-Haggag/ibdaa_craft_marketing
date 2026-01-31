'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';

interface LoginFormProps {
  onLoginSuccess?: (userData: { email: string; name: string }) => void;
}

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockCredentials = [
    { email: 'vip@ibdaacraft.com', password: 'VIP2026!', name: 'أحمد محمد', type: 'VIP' },
    { email: 'family@ibdaacraft.com', password: 'Family2026!', name: 'فاطمة علي', type: 'Family' },
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Use real Supabase authentication
      const { user } = await signIn(formData.email, formData.password);

      if (user) {
        if (formData.rememberMe && isHydrated) {
          localStorage.setItem('rememberedEmail', formData.email);
        }
        
        if (onLoginSuccess) {
          onLoginSuccess({ email: user.email || formData.email, name: user.user_metadata?.full_name || 'User' });
        }
        
        router.replace('/customer-dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setErrors({
        general: error.message || 'حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-lg p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-3/4 mx-auto"></div>
          <div className="space-y-4">
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Icon name="UserCircleIcon" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground font-amiri mb-2">
          تسجيل الدخول
        </h2>
        <p className="text-sm text-muted-foreground">
          أدخل بياناتك للوصول إلى حسابك
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="flex items-start gap-3 p-4 rounded-md bg-error/10 border border-error/20">
            <Icon name="ExclamationCircleIcon" size={20} className="text-error flex-shrink-0 mt-0.5" />
            <p className="text-sm text-error">{errors.general}</p>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            البريد الإلكتروني
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 pr-12 rounded-md border ${
                errors.email ? 'border-error' : 'border-input'
              } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-premium`}
              placeholder="example@ibdaacraft.com"
              disabled={isLoading}
            />
            <Icon
              name="EnvelopeIcon"
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-error flex items-center gap-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-foreground">
            كلمة المرور
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 pr-12 rounded-md border ${
                errors.password ? 'border-error' : 'border-input'
              } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-premium`}
              placeholder="••••••••"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-premium"
              disabled={isLoading}
            >
              <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-error flex items-center gap-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              {errors.password}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <span className="text-sm text-foreground">تذكرني</span>
          </label>
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-premium font-medium"
            disabled={isLoading}
          >
            نسيت كلمة المرور؟
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground font-medium transition-premium hover:bg-accent/90 hover:shadow-md active-press disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
              <span>جاري تسجيل الدخول...</span>
            </>
          ) : (
            <>
              <Icon name="ArrowRightOnRectangleIcon" size={20} />
              <span>تسجيل الدخول</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;