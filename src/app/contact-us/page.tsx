import type { Metadata } from 'next';
import MainNavigation from '@/components/common/MainNavigation';
import ContactPageHeader from './components/ContactPageHeader';
import QuickContactOptions from './components/QuickContactOptions';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import LocationMap from './components/LocationMap';
import FAQSection from './components/FAQSection';

export const metadata: Metadata = {
  title: 'اتصل بنا - إبداع الحرفة للتسويق',
  description:
    'تواصل مع فريق إبداع الحرفة للتسويق عبر نموذج الاتصال، الهاتف، أو البريد الإلكتروني. نحن هنا لمساعدتك في الحصول على أفضل تجربة مع خدماتنا وبطاقات الاشتراك.',
};

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      <main className="pt-20">
        <ContactPageHeader />

        <div className="container mx-auto px-6 py-12">
          <QuickContactOptions />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <ContactForm />
            <ContactInfo />
          </div>

          <div className="mb-12">
            <LocationMap />
          </div>

          <FAQSection />
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-primary via-secondary to-primary text-white py-12 mt-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold font-amiri mb-4">إبداع الحرفة للتسويق</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  منصة رائدة في تقديم بطاقات الخصم والشراكات التجارية في المملكة العربية
                  السعودية.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold font-amiri mb-4">روابط سريعة</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>
                    <a href="/homepage" className="hover:text-white transition-premium">
                      الرئيسية
                    </a>
                  </li>
                  <li>
                    <a href="/about-us" className="hover:text-white transition-premium">
                      من نحن
                    </a>
                  </li>
                  <li>
                    <a
                      href="/subscription-cards"
                      className="hover:text-white transition-premium"
                    >
                      بطاقات الاشتراك
                    </a>
                  </li>
                  <li>
                    <a href="/partners-network" className="hover:text-white transition-premium">
                      شبكة الشركاء
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold font-amiri mb-4">تواصل معنا</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>الهاتف: +966 50 123 4567</li>
                  <li>البريد: info@ibdaacraft.sa</li>
                  <li>الرياض، المملكة العربية السعودية</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6 text-center text-sm text-white/70">
              <p>&copy; {new Date().getFullYear()} إبداع الحرفة للتسويق. جميع الحقوق محفوظة.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}