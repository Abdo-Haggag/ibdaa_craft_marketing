'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FormData {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  inquiryType?: string;
  message?: string;
}

const ContactForm = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const inquiryTypes = [
    { value: '', label: 'اختر نوع الاستفسار' },
    { value: 'subscription', label: 'استفسار عن الاشتراكات' },
    { value: 'partnership', label: 'طلب شراكة' },
    { value: 'support', label: 'الدعم الفني' },
    { value: 'complaint', label: 'شكوى أو اقتراح' },
    { value: 'other', label: 'أخرى' },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^[+]?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'رقم الهاتف غير صحيح';
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = 'نوع الاستفسار مطلوب';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'الرسالة مطلوبة';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'الرسالة يجب أن تكون 10 أحرف على الأقل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    // Prepare WhatsApp message
    const whatsappMessage = `مرحباً، أنا ${formData.name}%0A%0Aنوع الاستفسار: ${inquiryTypes.find(t => t.value === formData.inquiryType)?.label}%0A%0Aالرسالة:%0A${formData.message}%0A%0Aالبريد الإلكتروني: ${formData.email}%0Aرقم الهاتف: ${formData.phone}`;
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/966590317360?text=${whatsappMessage}`, '_blank');

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: '',
      message: '',
    });

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg p-8 border border-border">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="space-y-4">
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-8 border border-border shadow-sm">
      <h2 className="text-2xl font-bold text-foreground font-amiri mb-6">
        أرسل لنا رسالة
      </h2>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-start gap-3">
          <Icon name="CheckCircleIcon" size={24} className="text-success flex-shrink-0" />
          <div>
            <p className="text-success font-medium">تم إرسال رسالتك بنجاح!</p>
            <p className="text-sm text-muted-foreground mt-1">
              سنتواصل معك في أقرب وقت ممكن
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            الاسم الكامل <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-md border ${
              errors.name ? 'border-error' : 'border-border'
            } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-premium`}
            placeholder="أدخل اسمك الكامل"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-error flex items-center gap-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              {errors.name}
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

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            رقم الهاتف <span className="text-error">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-md border ${
              errors.phone ? 'border-error' : 'border-border'
            } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-premium`}
            placeholder="+966 50 123 4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-error flex items-center gap-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Inquiry Type Field */}
        <div>
          <label htmlFor="inquiryType" className="block text-sm font-medium text-foreground mb-2">
            نوع الاستفسار <span className="text-error">*</span>
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-md border ${
              errors.inquiryType ? 'border-error' : 'border-border'
            } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-premium`}
          >
            {inquiryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.inquiryType && (
            <p className="mt-1 text-sm text-error flex items-center gap-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              {errors.inquiryType}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            الرسالة <span className="text-error">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`w-full px-4 py-3 rounded-md border ${
              errors.message ? 'border-error' : 'border-border'
            } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-premium resize-none`}
            placeholder="اكتب رسالتك هنا..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-error flex items-center gap-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-accent text-accent-foreground font-medium text-lg transition-premium hover:bg-accent/90 hover:shadow-md active-press disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
              <span>جاري الإرسال...</span>
            </>
          ) : (
            <>
              <Icon name="PaperAirplaneIcon" size={20} />
              <span>إرسال الرسالة</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;