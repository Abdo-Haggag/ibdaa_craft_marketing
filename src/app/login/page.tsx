import type { Metadata } from 'next';
import MainNavigation from '@/components/common/MainNavigation';
import LoginInteractive from './components/LoginInteractive';


export const metadata: Metadata = {
  title: 'تسجيل الدخول - إبداع الحرفة للتسويق',
  description: 'قم بتسجيل الدخول إلى حسابك في إبداع الحرفة للتسويق للوصول إلى بطاقات الاشتراك والخصومات الحصرية عبر شبكة شركائنا.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary">
      <MainNavigation />
      
      <main className="pt-20">
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Login Form */}
            <div className="order-2 lg:order-1">
              <LoginInteractive />
            </div>

            {/* Right Side - Welcome Section */}
            <div className="order-1 lg:order-2 text-center lg:text-right">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16"
                  >
                    <rect width="48" height="48" rx="12" fill="white" opacity="0.9" />
                    <path
                      d="M24 12L32 20H28V32H20V20H16L24 12Z"
                      fill="#1E3A8A"
                      opacity="0.9"
                    />
                    <circle cx="24" cy="36" r="2" fill="#D97706" />
                  </svg>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white font-amiri leading-tight">
                  مرحباً بعودتك!
                </h1>
                
                <p className="text-lg text-white/90 leading-relaxed max-w-md mx-auto lg:mx-0">
                  سجل دخولك للوصول إلى بطاقة اشتراكك والاستفادة من الخصومات الحصرية في شبكة شركائنا
                </p>

                <div className="grid grid-cols-3 gap-4 pt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-3xl font-bold text-accent mb-1">200+</p>
                    <p className="text-sm text-white/80">شريك تجاري</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-3xl font-bold text-accent mb-1">5000+</p>
                    <p className="text-sm text-white/80">عميل راضٍ</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-3xl font-bold text-accent mb-1">40%</p>
                    <p className="text-sm text-white/80">خصم يصل إلى</p>
                  </div>
                </div>

                <div className="pt-8 space-y-4">
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm">خصومات حصرية في أكثر من 200 شريك</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm">بطاقة اشتراك لـ 6 أشخاص</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm">دعم فني متواصل على مدار الساعة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-sm border-t border-white/10 py-8 mt-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} إبداع الحرفة للتسويق. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-white/70 hover:text-white transition-premium">
                الشروط والأحكام
              </a>
              <a href="#" className="text-sm text-white/70 hover:text-white transition-premium">
                سياسة الخصوصية
              </a>
              <a href="/contact-us" className="text-sm text-white/70 hover:text-white transition-premium">
                اتصل بنا
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}