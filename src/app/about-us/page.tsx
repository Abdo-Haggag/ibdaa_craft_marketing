import type { Metadata } from 'next';
import MainNavigation from '@/components/common/MainNavigation';
import AboutUsInteractive from './components/AboutUsInteractive';

export const metadata: Metadata = {
  title: 'من نحن - إبداع الحرفة للتسويق',
  description:
    'تعرف على إبداع الحرفة للتسويق، الشركة السعودية الرائدة في مجال بطاقات الاشتراك والخصومات. رؤيتنا، مهمتنا، وشركاؤنا في خدمة العائلات السعودية.',
};

export default function AboutUsPage() {
  return (
    <>
      <MainNavigation />
      <main className="pt-20">
        <AboutUsInteractive />
      </main>
    </>
  );
}