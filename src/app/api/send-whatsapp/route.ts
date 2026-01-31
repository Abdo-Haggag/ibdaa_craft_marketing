import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const invoiceData = JSON.parse(formData.get('invoiceData') as string);
    const whatsappNumber = '966590317360';

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');
    const mimeType = image.type;

    // Prepare message text
    const message = `*تأكيد دفع اشتراك - إبداع الحرفة*\n\n` +
      `رقم الفاتورة: ${invoiceData.invoiceNumber}\n` +
      `الاسم: ${invoiceData.customerName}\n` +
      `رقم الجوال: ${invoiceData.phoneNumber}\n` +
      `نوع البطاقة: ${invoiceData.cardType === 'VIP' ? 'بطاقة VIP' : 'بطاقة العائلة'}\n` +
      `${invoiceData.discountApplied ? `كود الخصم: ${invoiceData.discountCode}\n` : ''}` +
      `السعر الأصلي: ${invoiceData.originalPrice} ريال\n` +
      `${invoiceData.discountApplied ? `الخصم: ${invoiceData.discountAmount} ريال\n` : ''}` +
      `المبلغ المدفوع: ${invoiceData.finalPrice} ريال\n\n` +
      `تم رفع إيصال الدفع بنجاح.\n` +
      `يرجى مراجعة الطلب وتفعيل الاشتراك.`;

    // Note: WhatsApp Business API requires proper setup with Meta/Facebook
    // This is a placeholder implementation that prepares the data
    // You'll need to integrate with a WhatsApp service provider like:
    // - Twilio WhatsApp API
    // - Meta WhatsApp Business API
    // - WhatsApp Cloud API
    // - Third-party services like Wassenger, Chat-API, etc.

    // For now, we'll return the data formatted for WhatsApp Web fallback
    const encodedMessage = encodeURIComponent(message);
    const whatsappWebUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    return NextResponse.json({
      success: true,
      whatsappUrl: whatsappWebUrl,
      message: 'سيتم فتح واتساب. يرجى إرفاق الصورة يدوياً.',
      imageData: {
        base64: base64Image,
        mimeType: mimeType,
        fileName: image.name
      }
    });

  } catch (error) {
    console.error('Error processing WhatsApp request:', error);
    return NextResponse.json(
      { success: false, error: 'فشل في معالجة الطلب' },
      { status: 500 }
    );
  }
}