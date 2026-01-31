import React, { Suspense } from 'react';
import SubscriptionRegistrationInteractive from './components/SubscriptionRegistrationInteractive';

export const metadata = {
  title: 'تسجيل الاشتراك - إبداع الحرفة',
  description: 'أكمل بياناتك للاشتراك في بطاقة VIP أو العائلة',
};

const SubscriptionRegistrationPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-muted rounded w-1/2 mx-auto"></div>
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
    }>
      <SubscriptionRegistrationInteractive />
    </Suspense>
  );
};

export default SubscriptionRegistrationPage;