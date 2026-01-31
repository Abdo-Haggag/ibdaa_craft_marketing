import React, { Suspense } from 'react';
import InvoicePageInteractive from './components/InvoicePageInteractive';

export const metadata = {
  title: 'الفاتورة - إبداع الحرفة',
  description: 'تفاصيل الفاتورة ومعلومات الدفع',
};

const InvoicePage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-48 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    }>
      <InvoicePageInteractive />
    </Suspense>
  );
};

export default InvoicePage;