import type { Metadata } from 'next';
import MainNavigation from '@/components/common/MainNavigation';
import PartnersNetworkInteractive from './components/PartnersNetworkInteractive';

export const metadata: Metadata = {
  title: 'شبكة الشركاء - إبداع الحرفة للتسويق',
  description: 'اكتشف شبكة شركائنا الواسعة من المطاعم والمراكز الطبية والمتاجر التي تقدم خصومات حصرية لحاملي بطاقات الاشتراك في الطب والصحة والمطاعم والملابس والحلويات والرياضة',
};

export default function PartnersNetworkPage() {
  return (
    <>
      <MainNavigation />
      <main className="pt-20">
        <PartnersNetworkInteractive />
      </main>
    </>
  );
}