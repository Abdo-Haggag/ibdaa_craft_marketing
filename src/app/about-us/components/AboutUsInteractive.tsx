'use client';

import React, { useState, useEffect } from 'react';
import CompanyIntroduction from './CompanyIntroduction';
import CompanyStory from './CompanyStory';
import TrustSignals from './TrustSignals';
import CompanyMetrics from './CompanyMetrics';
import ContactCredentials from './ContactCredentials';
import { createClient } from '@/lib/supabase/client';

interface StoryPoint {
  year: string;
  title: string;
  description: string;
  icon: string;
}

interface Partnership {
  name: string;
  logo: string;
  alt: string;
  category: string;
}

interface Certification {
  title: string;
  issuer: string;
  icon: string;
}

interface Metric {
  value: string;
  label: string;
  icon: string;
  suffix?: string;
}

interface TeamMember {
  name: string;
  position: string;
  image: string;
  alt: string;
  bio: string;
  expertise: string[];
}

interface ContactInfo {
  type: string;
  value: string;
  icon: string;
  link?: string;
}

interface BusinessCredential {
  label: string;
  value: string;
  icon: string;
}

const AboutUsInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsHydrated(true);
    fetchPartnersFromSupabase();
  }, []);

  const fetchPartnersFromSupabase = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('partners')
        .select(`
          id,
          name,
          logo_url,
          categories(name)
        `)
        .order('name');

      if (error) {
        console.error('Error fetching partners:', error);
        setLoading(false);
        return;
      }

      if (data) {
        const mappedPartnerships: Partnership[] = data.map((partner: any) => ({
          name: partner.name,
          logo: partner.logo_url,
          alt: `${partner.name} logo`,
          category: partner.categories?.name || 'عام'
        }));
        setPartnerships(mappedPartnerships);
      }
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const companyData = {
    title: 'من نحن',
    description:
    'إبداع الحرفة للتسويق هي شركة سعودية رائدة في مجال بطاقات الاشتراك والخصومات، نسعى لتوفير أفضل العروض والخصومات لعملائنا من خلال شبكة واسعة من الشركاء في مختلف القطاعات.',
    mission:
    'تقديم قيمة حقيقية لعملائنا من خلال توفير خصومات مميزة وشراكات استراتيجية مع أفضل الأسماء التجارية في المملكة، مع الحفاظ على أعلى معايير الجودة والخدمة.',
    vision:
    'أن نكون الخيار الأول للعائلات السعودية في الحصول على خصومات وعروض حصرية، وبناء شبكة شراكات تجارية تخدم جميع احتياجات الحياة اليومية.'
  };

  const storyPoints: StoryPoint[] = [
  {
    year: '2020',
    title: 'التأسيس',
    description:
    'بدأت رحلتنا بفكرة بسيطة: توفير خصومات حقيقية للعائلات السعودية',
    icon: 'SparklesIcon'
  },
  {
    year: '2021',
    title: 'التوسع',
    description: 'وصلنا إلى 100+ شريك تجاري في مختلف القطاعات',
    icon: 'ChartBarIcon'
  },
  {
    year: '2023',
    title: 'النمو',
    description: 'تجاوزنا 5000 عميل راضٍ عن خدماتنا',
    icon: 'UserGroupIcon'
  },
  {
    year: '2026',
    title: 'الريادة',
    description: 'أصبحنا الخيار الأول لبطاقات الخصومات في المملكة',
    icon: 'TrophyIcon'
  }];


  const mainStory =
  'تأسست إبداع الحرفة للتسويق من إيمان عميق بأن كل عائلة سعودية تستحق الحصول على أفضل الخدمات بأسعار مناسبة. بدأنا رحلتنا بفريق صغير وحلم كبير، واليوم نفخر بشبكة واسعة من الشركاء والعملاء الذين يثقون بنا.';

  const foundingPrinciples = [
  'الشفافية الكاملة في جميع تعاملاتنا مع العملاء والشركاء',
  'تقديم قيمة حقيقية من خلال خصومات فعلية وليست وهمية',
  'بناء علاقات طويلة الأمد مع شركائنا التجاريين',
  'الاستماع لاحتياجات عملائنا والتطور المستمر',
  'الالتزام بأعلى معايير الجودة في الخدمة',
  'دعم الاقتصاد المحلي من خلال الشراكات مع الأعمال السعودية'];


  const certifications: Certification[] = [
  {
    title: 'سجل تجاري معتمد',
    issuer: 'وزارة التجارة السعودية',
    icon: 'DocumentCheckIcon'
  },
  {
    title: 'شهادة الجودة ISO 9001',
    issuer: 'المنظمة الدولية للمعايير',
    icon: 'ShieldCheckIcon'
  },
  {
    title: 'عضوية الغرفة التجارية',
    issuer: 'الغرفة التجارية بالرياض',
    icon: 'BuildingOfficeIcon'
  },
  {
    title: 'ترخيص التسويق الإلكتروني',
    issuer: 'هيئة الاتصالات وتقنية المعلومات',
    icon: 'GlobeAltIcon'
  },
  {
    title: 'شهادة حماية البيانات',
    issuer: 'المركز الوطني للأمن السيبراني',
    icon: 'LockClosedIcon'
  },
  {
    title: 'اعتماد خدمة العملاء',
    issuer: 'الهيئة السعودية للمواصفات والمقاييس',
    icon: 'ChatBubbleLeftRightIcon'
  }];


  const metrics: Metric[] = [
  {
    value: '150',
    label: 'شريك تجاري',
    icon: 'BuildingStorefrontIcon',
    suffix: '+'
  },
  {
    value: '8500',
    label: 'عميل راضٍ',
    icon: 'UserGroupIcon',
    suffix: '+'
  },
  {
    value: '35',
    label: 'متوسط الخصم',
    icon: 'ReceiptPercentIcon',
    suffix: '%'
  },
  {
    value: '98',
    label: 'رضا العملاء',
    icon: 'StarIcon',
    suffix: '%'
  }];


  const teamMembers: TeamMember[] = [
  {
    name: 'أحمد العتيبي',
    position: 'المدير التنفيذي',
    image:
    "https://img.rocket.new/generatedImages/rocket_gen_img_1c6bcc831-1763295074920.png",
    alt: 'Professional Saudi businessman in white thobe and traditional headwear smiling at camera',
    bio: 'خبرة تزيد عن 15 عامًا في مجال التسويق والشراكات التجارية في المملكة',
    expertise: ['التسويق الاستراتيجي', 'إدارة الشراكات', 'تطوير الأعمال']
  },
  {
    name: 'فاطمة السالم',
    position: 'مديرة العمليات',
    image:
    "https://img.rocket.new/generatedImages/rocket_gen_img_11db4a0cb-1768567885457.png",
    alt: 'Professional Saudi businesswoman in black abaya with confident smile in modern office',
    bio: 'متخصصة في تحسين العمليات وإدارة علاقات العملاء بكفاءة عالية',
    expertise: ['إدارة العمليات', 'خدمة العملاء', 'تحسين الأداء']
  },
  {
    name: 'خالد المطيري',
    position: 'مدير الشراكات',
    image:
    "https://img.rocket.new/generatedImages/rocket_gen_img_1fec87729-1763295737673.png",
    alt: 'Young Saudi professional in business suit with beard looking at camera confidently',
    bio: 'خبير في بناء العلاقات التجارية وتطوير شبكة الشركاء',
    expertise: ['تطوير الشراكات', 'التفاوض', 'إدارة العلاقات']
  }];


  const contactInfo: ContactInfo[] = [
  {
    type: 'رقم الهاتف',
    value: '+966 590 317 360',
    icon: 'PhoneIcon',
    link: 'tel:+966590317360'
  },
  {
    type: 'البريد الإلكتروني',
    value: 'info@creativecraftsa.com',
    icon: 'EnvelopeIcon',
    link: 'mailto:info@creativecraftsa.com'
  },
  {
    type: 'العنوان',
    value: 'خميس مشيط - حي الخالدية',
    icon: 'MapPinIcon'
  },
  {
    type: 'ساعات العمل',
    value: 'السبت - الخميس: 9:00 ص - 6:00 م',
    icon: 'ClockIcon'
  }];


  const businessCredentials: BusinessCredential[] = [
  {
    label: 'رقم السجل التجاري',
    value: '1010123456',
    icon: 'DocumentTextIcon'
  },
  {
    label: 'تاريخ التأسيس',
    value: '15/03/2020',
    icon: 'CalendarIcon'
  }];


  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-muted rounded-lg"></div>
            <div className="h-96 bg-muted rounded-lg"></div>
            <div className="h-64 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 space-y-12">
        <CompanyIntroduction
          title={companyData.title}
          description={companyData.description}
          mission={companyData.mission}
          vision={companyData.vision} />


        <CompanyStory
          storyPoints={storyPoints}
          mainStory={mainStory}
          foundingPrinciples={foundingPrinciples} />


        <TrustSignals
          partnerships={partnerships}
          certifications={certifications} />


        <CompanyMetrics metrics={metrics} />

        <ContactCredentials
          contactInfo={contactInfo}
          businessCredentials={businessCredentials} />

      </div>
    </div>);

};

export default AboutUsInteractive;