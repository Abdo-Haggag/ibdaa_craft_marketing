import type { Metadata } from 'next';
import MainNavigation from '@/components/common/MainNavigation';
import SubscriptionCardsInteractive from './components/SubscriptionCardsInteractive';

export const metadata: Metadata = {
  title: 'بطاقات الاشتراك - إبداع الحرفة للتسويق',
  description:
    'اختر بين بطاقة VIP بسعر 1500 ريال أو بطاقة العائلة بسعر 800 ريال واستمتع بخصومات حصرية تصل إلى 40% في الطب والمطاعم والملابس والحلويات والرياضة على مدار العام',
};

export default function SubscriptionCardsPage() {
  return (
    <>
      <MainNavigation />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-6">
          <SubscriptionCardsInteractive />
        </div>
      </main>
    </>
  );
}