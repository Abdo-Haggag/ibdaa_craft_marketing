import type { Metadata } from 'next';
import MainNavigation from '@/components/common/MainNavigation';
import HeroSection from './components/HeroSection';
import SavingsCalculator from './components/SavingsCalculator';
import CardsComparisonSection from './components/CardsComparisonSection';
import StatisticsSection from './components/StatisticsSection';
import CategoriesSection from './components/CategoriesSection';
import CompanyIntroSection from './components/CompanyIntroSection';
import CTASection from './components/CTASection';
import FooterSection from './components/FooterSection';

export const metadata: Metadata = {
  title: 'الرئيسية - إبداع الحرفة للتسويق',
  description: 'منصة رائدة لبطاقات الاشتراك والخصومات في السعودية. احصل على خصومات حصرية تصل إلى 40% في أكثر من 200 شريك تجاري عبر فئات متنوعة.',
};

export default function Homepage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      <main className="pt-20">
        <HeroSection />
        <SavingsCalculator />
        <CardsComparisonSection />
        <StatisticsSection />
        <CategoriesSection />
        <CompanyIntroSection />
        <CTASection />
      </main>

      <FooterSection />
    </div>
  );
}