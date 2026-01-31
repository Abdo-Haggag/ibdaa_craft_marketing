'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';


interface FormData {
  cardType: 'VIP' | 'Family';
  customerName: string;
  phoneNumber: string;
  workLocation: string;
  email: string;
  discountCode: string;
}

interface FormErrors {
  customerName?: string;
  phoneNumber?: string;
  workLocation?: string;
  email?: string;
  discountCode?: string;
}

const SubscriptionRegistrationInteractive = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    cardType: 'VIP',
    customerName: '',
    phoneNumber: '',
    workLocation: '',
    email: '',
    discountCode: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const cardTypeParam = searchParams.get('type');
    if (cardTypeParam === 'VIP' || cardTypeParam === 'Family') {
      setFormData((prev) => ({ ...prev, cardType: cardTypeParam }));
    }
  }, [searchParams]);

  const cardDetails = {
    VIP: {
      name: 'بطاقة VIP',
      price: 1500,
      image: 'Copy_of_Black_and_Gold_Classy_Business_Card_1_-1769730611123.png',
      color: 'bg-accent',
    },
    Family: {
      name: 'بطاقة العائلة',
      price: 800,
      image: 'https://cmgesbyqfxkmwckadqpy.supabase.co/storage/v1/object/sign/cards/Copy%20of%20Black%20and%20Gold%20Classy%20Business%20Card%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNWJhNmJlNC00YzUzLTQwZTItOGI4OC1mYjg1OWNlNzM1YTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjYXJkcy9Db3B5IG9mIEJsYWNrIGFuZCBHb2xkIENsYXNzeSBCdXNpbmVzcyBDYXJkICgyKS5wbmciLCJpYXQiOjE3Njk3MzYwMjEsImV4cCI6MTgwMTI3MjAyMX0.ImrlFBAKAQFyXTj3oHSxpwnn6HLb-YN2u6cwspSPw-A',
      color: 'bg-primary',
    },
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'اسم العميل مطلوب';
    } else if (formData.customerName.trim().length < 3) {
      newErrors.customerName = 'الاسم يجب أن يكون 3 أحرف على الأقل';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'رقم الجوال مطلوب';
    } else if (!/^[+]?[0-9]{10,15}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'رقم الجوال غير صحيح';
    }

    if (!formData.workLocation.trim()) {
      newErrors.workLocation = 'مكان العمل مطلوب';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    // Validate discount code if provided
    if (formData.discountCode.trim() && formData.discountCode.trim().toUpperCase() !== 'BAKM589') {
      newErrors.discountCode = 'كود الخصم غير صحيح';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Check discount code validity in real-time
    if (name === 'discountCode') {
      if (value.trim().toUpperCase() === 'BAKM589') {
        setDiscountApplied(true);
        setErrors((prev) => ({ ...prev, discountCode: undefined }));
      } else {
        setDiscountApplied(false);
      }
    }

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Calculate pricing
    const originalPrice = currentCard.price;
    const discountPercentage = discountApplied ? 50 : 0;
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const finalPrice = originalPrice - discountAmount;

    // Prepare data for invoice page
    const invoiceData = {
      cardType: formData.cardType,
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      workLocation: formData.workLocation,
      email: formData.email,
      discountCode: formData.discountCode.trim().toUpperCase(),
      discountApplied: discountApplied,
      originalPrice: originalPrice,
      discountAmount: discountAmount,
      finalPrice: finalPrice,
      invoiceNumber: `INV-${Date.now()}`,
      invoiceDate: new Date().toISOString(),
    };

    // Navigate to invoice page with data
    setTimeout(() => {
      const queryParams = new URLSearchParams({
        data: JSON.stringify(invoiceData),
      });
      router.push(`/invoice-page?${queryParams.toString()}`);
    }, 1500);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="space-y-4">
              <div className="h-12 bg-muted rounded"></div>
              <div className="h-12 bg-muted rounded"></div>
              <div className="h-12 bg-muted rounded"></div>
              <div className="h-12 bg-muted rounded"></div>
              <div className="h-12 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = cardDetails[formData.cardType];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary font-amiri mb-3">
            تسجيل الاشتراك
          </h1>
          <p className="text-muted-foreground text-lg">
            أكمل بياناتك للاشتراك في {currentCard.name}
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-start gap-3">
            <Icon name="CheckCircleIcon" size={24} className="text-success flex-shrink-0" />
            <div>
              <p className="text-success font-medium">تم تسجيل اشتراكك بنجاح!</p>
              <p className="text-sm text-muted-foreground mt-1">
                جاري تحويلك لإتمام عملية الدفع...
              </p>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <div className="bg-card rounded-xl shadow-lg border border-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-foreground font-amiri mb-6">
            بيانات المشترك
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Type Field */}
            <div>
              <label htmlFor="cardType" className="block text-sm font-medium text-foreground mb-2">
                نوع البطاقة <span className="text-error">*</span>
              </label>
              <select
                id="cardType"
                name="cardType"
                value={formData.cardType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-premium"
              >
                <option value="VIP">بطاقة VIP - 1500 ريال</option>
                <option value="Family">بطاقة العائلة - 800 ريال</option>
              </select>
            </div>

            {/* Customer Name Field */}
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-foreground mb-2">
                اسم العميل <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.customerName ? 'border-error' : 'border-border'
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-premium`}
                placeholder="أدخل اسمك الكامل"
              />
              {errors.customerName && (
                <p className="mt-1 text-sm text-error flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={16} />
                  {errors.customerName}
                </p>
              )}
            </div>

            {/* Phone Number Field */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-foreground mb-2">
                رقم الجوال <span className="text-error">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.phoneNumber ? 'border-error' : 'border-border'
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-premium`}
                placeholder="+966 50 123 4567"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-error flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={16} />
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Work Location Field */}
            <div>
              <label htmlFor="workLocation" className="block text-sm font-medium text-foreground mb-2">
                مكان العمل <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="workLocation"
                name="workLocation"
                value={formData.workLocation}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.workLocation ? 'border-error' : 'border-border'
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-premium`}
                placeholder="أدخل مكان عملك"
              />
              {errors.workLocation && (
                <p className="mt-1 text-sm text-error flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={16} />
                  {errors.workLocation}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                البريد الإلكتروني <span className="text-error">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.email ? 'border-error' : 'border-border'
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-premium`}
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={16} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Discount Code Field */}
            <div>
              <label htmlFor="discountCode" className="block text-sm font-medium text-foreground mb-2">
                كود الخصم (اختياري)
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="discountCode"
                  name="discountCode"
                  value={formData.discountCode}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-md border ${
                    errors.discountCode ? 'border-error' : discountApplied ? 'border-success' : 'border-border'
                  } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-premium`}
                  placeholder="أدخل كود الخصم إن وجد"
                />
                {discountApplied && (
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Icon name="CheckCircleIcon" size={20} className="text-success" />
                  </div>
                )}
              </div>
              {errors.discountCode && (
                <p className="mt-1 text-sm text-error flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={16} />
                  {errors.discountCode}
                </p>
              )}
              {discountApplied && (
                <p className="mt-1 text-sm text-success flex items-center gap-1">
                  <Icon name="CheckCircleIcon" size={16} />
                  تم تطبيق خصم 50% على السعر!
                </p>
              )}
            </div>

            {/* Pricing Summary */}
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">السعر الأصلي:</span>
                <span className="font-bold text-foreground">{currentCard.price} ريال</span>
              </div>
              {discountApplied && (
                <>
                  <div className="flex justify-between items-center mb-2 text-success">
                    <span>الخصم (50%):</span>
                    <span className="font-bold">- {(currentCard.price * 0.5).toFixed(0)} ريال</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-foreground">المبلغ النهائي:</span>
                      <span className="text-2xl font-bold text-accent">{(currentCard.price * 0.5).toFixed(0)} ريال</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="p-4 bg-muted rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• البطاقة صالحة لمدة سنة واحدة من تاريخ التفعيل</p>
                  <p>• يمكن استخدام البطاقة من قبل 6 أشخاص فقط</p>
                  <p>• لا يمكن استرجاع قيمة الاشتراك بعد التفعيل</p>
                  <p>• يجب إبراز البطاقة عند الاستفادة من الخصم</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-accent text-accent-foreground rounded-lg font-bold text-lg transition-premium hover:bg-accent/90 hover:shadow-lg active-press flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Icon name="ArrowPathIcon" size={24} className="animate-spin" />
                  <span>جاري التسجيل...</span>
                </>
              ) : (
                <>
                  <Icon name="CheckCircleIcon" size={24} />
                  <span>تأكيد الاشتراك</span>
                </>
              )}
            </button>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full py-3 bg-muted text-foreground rounded-lg font-medium transition-premium hover:bg-muted/80 flex items-center justify-center gap-2"
            >
              <Icon name="ArrowRightIcon" size={20} />
              <span>العودة للخلف</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionRegistrationInteractive;