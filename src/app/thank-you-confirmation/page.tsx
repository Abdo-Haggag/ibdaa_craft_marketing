import type { Metadata } from 'next';
import { Suspense } from 'react';
import ThankYouConfirmationInteractive from './components/ThankYouConfirmationInteractive';

export const metadata: Metadata = {
  title: 'شكراً لثقتك بنا - إبداع الحرفة للتسويق',
  description: 'شكراً لثقتك بنا. سيتم تحويلك إلى الصفحة الرئيسية قريباً.',
};

export default function ThankYouConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ThankYouConfirmationInteractive />
    </Suspense>
  );
}