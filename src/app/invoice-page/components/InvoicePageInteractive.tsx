'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface InvoiceData {
  cardType: 'VIP' | 'Family';
  customerName: string;
  phoneNumber: string;
  workLocation: string;
  email: string;
  discountCode: string;
  discountApplied: boolean;
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  invoiceNumber: string;
  invoiceDate: string;
}

const InvoicePageInteractive = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isHydrated, setIsHydrated] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    setIsHydrated(true);
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const parsedData = JSON.parse(dataParam);
        setInvoiceData(parsedData);
      } catch (error) {
        console.error('Error parsing invoice data:', error);
        router.push('/subscription-registration');
      }
    } else {
      router.push('/subscription-registration');
    }
  }, [searchParams, router]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleProceedToUpload = () => {
    if (invoiceData) {
      // Prepare WhatsApp message with invoice details
      const message = `مرحباً، أود تأكيد اشتراكي في إبداع الحرفة\n\nرقم الفاتورة: ${invoiceData.invoiceNumber}\nنوع البطاقة: ${invoiceData.cardType === 'VIP' ? 'بطاقة VIP' : 'بطاقة العائلة'}\nالاسم: ${invoiceData.customerName}\nرقم الجوال: ${invoiceData.phoneNumber}\nالبريد الإلكتروني: ${invoiceData.email}\nمكان العمل: ${invoiceData.workLocation}\n${invoiceData.discountApplied ? `كود الخصم: ${invoiceData.discountCode}\n` : ''}المبلغ المدفوع: ${invoiceData.finalPrice} ريال\n\nتم التحويل إلى حساب البنك الأهلي السعودي\nسأقوم بإرسال صورة إيصال التحويل`;
      
      const whatsappUrl = `https://wa.me/966590317360?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      // Redirect to thank you page after opening WhatsApp
      router.push('/thank-you-confirmation');
    }
  };

  if (!isHydrated || !invoiceData) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-48 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const invoiceDate = new Date(invoiceData.invoiceDate);
  const formattedDate = invoiceDate.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
            <Icon name="DocumentTextIcon" size={32} className="text-accent" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary font-amiri mb-3">
            فاتورة الاشتراك
          </h1>
          <p className="text-muted-foreground text-lg">
            رقم الفاتورة: {invoiceData.invoiceNumber}
          </p>
        </div>

        {/* Invoice Card */}
        <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden mb-6">
          {/* Invoice Header */}
          <div className="bg-gradient-to-l from-primary to-secondary p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold font-amiri mb-2">إبداع الحرفة</h2>
                <p className="text-white/80">بطاقات الخصومات الحصرية</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-white/80 mb-1">تاريخ الإصدار</p>
                <p className="font-bold">{formattedDate}</p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="p-6 border-b border-border">
            <h3 className="text-xl font-bold text-foreground font-amiri mb-4">
              معلومات المشترك
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Icon name="UserIcon" size={20} className="text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">الاسم</p>
                  <p className="font-medium text-foreground">{invoiceData.customerName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="PhoneIcon" size={20} className="text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">رقم الجوال</p>
                  <p className="font-medium text-foreground">{invoiceData.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="EnvelopeIcon" size={20} className="text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
                  <p className="font-medium text-foreground">{invoiceData.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="BuildingOfficeIcon" size={20} className="text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">مكان العمل</p>
                  <p className="font-medium text-foreground">{invoiceData.workLocation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Details */}
          <div className="p-6 border-b border-border">
            <h3 className="text-xl font-bold text-foreground font-amiri mb-4">
              تفاصيل الاشتراك
            </h3>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-foreground font-medium">
                  {invoiceData.cardType === 'VIP' ? 'بطاقة VIP' : 'بطاقة العائلة'}
                </span>
                <span className="font-bold text-foreground">{invoiceData.originalPrice} ريال</span>
              </div>
              
              {invoiceData.discountApplied && (
                <div className="bg-success/10 border border-success/20 rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="TagIcon" size={20} className="text-success" />
                    <span className="font-medium text-success">تم تطبيق كود الخصم</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    الكود: <span className="font-mono font-bold text-success">{invoiceData.discountCode}</span>
                  </p>
                </div>
              )}

              <div className="space-y-2 pt-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">السعر الأصلي:</span>
                  <span className="font-medium text-foreground">{invoiceData.originalPrice} ريال</span>
                </div>
                {invoiceData.discountApplied && (
                  <div className="flex justify-between items-center text-success">
                    <span>الخصم (50%):</span>
                    <span className="font-medium">- {invoiceData.discountAmount} ريال</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="text-xl font-bold text-foreground">المبلغ المطلوب:</span>
                  <span className="text-2xl font-bold text-accent">{invoiceData.finalPrice} ريال</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Transfer Information */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-foreground font-amiri mb-4">
              معلومات التحويل البنكي
            </h3>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 border border-primary/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="BuildingLibraryIcon" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">اسم البنك</p>
                      <p className="font-bold text-foreground">البنك الأهلي السعودي</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Icon name="BuildingOffice2Icon" size={20} className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">اسم المؤسسة</p>
                      <p className="font-bold text-foreground">مؤسسة ابداع الحرفة</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <Icon name="HashtagIcon" size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">رقم الحساب</p>
                      <p className="font-bold text-foreground font-mono">01400032678206</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('01400032678206', 'account')}
                    className="p-2 hover:bg-muted rounded-lg transition-premium"
                  >
                    {copiedField === 'account' ? (
                      <Icon name="CheckIcon" size={20} className="text-success" />
                    ) : (
                      <Icon name="ClipboardDocumentIcon" size={20} className="text-muted-foreground" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                      <Icon name="CreditCardIcon" size={20} className="text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">رقم الآيبان (IBAN)</p>
                      <p className="font-bold text-foreground font-mono">SA3910000001400032678206</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('SA3910000001400032678206', 'iban')}
                    className="p-2 hover:bg-muted rounded-lg transition-premium"
                  >
                    {copiedField === 'iban' ? (
                      <Icon name="CheckIcon" size={20} className="text-success" />
                    ) : (
                      <Icon name="ClipboardDocumentIcon" size={20} className="text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="InformationCircleIcon" size={20} className="text-warning mt-0.5" />
                  <div className="text-sm text-foreground">
                    <p className="font-medium mb-1">تعليمات الدفع:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>قم بتحويل المبلغ المطلوب إلى الحساب البنكي أعلاه</li>
                      <li>احتفظ بإيصال التحويل البنكي</li>
                      <li>قم برفع صورة الإيصال في الصفحة التالية</li>
                      <li>سيتم تفعيل اشتراكك خلال 24 ساعة من التحقق من الدفع</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Instructions */}
          <div className="p-6 bg-gradient-to-br from-success/5 to-primary/5 border-t border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="ChatBubbleLeftRightIcon" size={24} className="text-success" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground font-amiri mb-3">
                  خطوات إتمام الاشتراك
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <p className="text-foreground">
                      قم بتحويل المبلغ <span className="font-bold text-accent">{invoiceData.finalPrice} ريال</span> إلى رقم الحساب أعلاه
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <p className="text-foreground">
                      اضغط على زر "تأكيد التحويل" أدناه
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <p className="text-foreground">
                      سيتم إرسال بياناتك تلقائياً إلى الواتساب
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <p className="text-foreground">
                      قم بإرسال <span className="font-bold text-success">صورة إيصال التحويل</span> عبر الواتساب لإتمام العملية
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="InformationCircleIcon" size={20} className="text-primary" />
                    <span className="font-bold text-foreground">ملاحظة هامة</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    بعد الضغط على زر التأكيد، سيتم فتح محادثة واتساب تحتوي على جميع بيانات الفاتورة. يرجى إرفاق صورة إيصال التحويل البنكي لإتمام عملية الاشتراك.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={handleProceedToUpload}
            className="group relative px-8 py-4 bg-gradient-to-l from-primary to-secondary text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
          >
            <Icon name="CheckCircleIcon" size={24} />
            <span>تأكيد التحويل وإرسال البيانات</span>
            <Icon 
              name="ArrowLeftIcon" 
              size={20} 
              className="transform group-hover:-translate-x-1 transition-transform" 
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePageInteractive;