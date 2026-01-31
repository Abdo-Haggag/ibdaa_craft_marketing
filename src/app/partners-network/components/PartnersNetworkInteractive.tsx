'use client';

import React, { useState, useEffect } from 'react';
import PartnerCard from './PartnerCard';
import CategoryStats from './CategoryStats';
import CategoryQuickAccess from '@/components/common/CategoryQuickAccess';
import Icon from '@/components/ui/AppIcon';
import { createClient } from '@/lib/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface Partner {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  logo: string;
  logoAlt: string;
  discount: string;
  address: string;
  phone: string;
  location: string;
  discountValue: number;
  specialTerms?: string;
  isFeatured?: boolean;
  googleMapsLocation?: string;
}

interface Category {
  id: string;
  label: string;
  icon: string;
  discountRange: string;
  partnerCount: number;
  color: string;
}

interface SupabaseCategory {
  id: string;
  name: string;
  icon: string;
  discount_range: string;
  color: string;
}

interface SupabasePartner {
  id: string;
  name: string;
  category_id: string;
  logo_url: string;
  logo_alt: string;
  discount_percentage: number;
  address: string;
  phone: string;
  google_maps_location: string | null;
  location_city: string;
  special_terms: string | null;
  is_featured: boolean;
}

const PartnersNetworkInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allPartners, setAllPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fetch categories and partners from Supabase
  useEffect(() => {
    const fetchData = async () => {
      if (!isHydrated) return;

      try {
        setLoading(true);

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (categoriesError) {
          console.error('Error fetching categories:', categoriesError);
          setLoading(false);
          return;
        }

        // Fetch partners with category names
        const { data: partnersData, error: partnersError } = await supabase
          .from('partners')
          .select(`
            *,
            categories!inner(name)
          `);

        if (partnersError) {
          console.error('Error fetching partners:', partnersError);
          setLoading(false);
          return;
        }

        // Transform partners data first
        const transformedPartners: Partner[] = partnersData?.map((partner: any) => ({
          id: partner.id,
          name: partner.name,
          category: partner.categories.name,
          categoryId: partner.category_id,
          logo: partner.logo_url,
          logoAlt: partner.logo_alt,
          discount: `${partner.discount_percentage}%`,
          address: partner.address,
          phone: partner.phone,
          location: partner.location_city.toLowerCase(),
          discountValue: partner.discount_percentage,
          specialTerms: partner.special_terms || undefined,
          isFeatured: partner.is_featured || false,
          googleMapsLocation: partner.google_maps_location || undefined,
        })) || [];
        setAllPartners(transformedPartners);

        // Transform categories data with partner counts
        const transformedCategories: Category[] = categoriesData?.map((cat: SupabaseCategory) => ({
          id: cat.id,
          label: cat.name,
          icon: cat.icon,
          discountRange: cat.discount_range,
          partnerCount: transformedPartners.filter((p) => p.categoryId === cat.id).length,
          color: cat.color,
        })) || [];
        setCategories(transformedCategories);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isHydrated, supabase]);

  // Real-time subscriptions for categories and partners
  useEffect(() => {
    if (!isHydrated) return;

    const channels: RealtimeChannel[] = [];

    // Subscribe to categories changes
    const categoriesChannel = supabase
      .channel('categories_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'categories',
        },
        async (payload) => {
          console.log('Categories changed:', payload);
          // Refetch categories
          const { data } = await supabase
            .from('categories')
            .select('*')
            .order('name');

          if (data) {
            const transformedCategories: Category[] = data.map((cat: SupabaseCategory) => ({
              id: cat.id,
              label: cat.name,
              icon: cat.icon,
              discountRange: cat.discount_range,
              partnerCount: allPartners.filter((p) => p.categoryId === cat.id).length,
              color: cat.color,
            }));
            setCategories(transformedCategories);
          }
        }
      )
      .subscribe();

    channels.push(categoriesChannel);

    // Subscribe to partners changes
    const partnersChannel = supabase
      .channel('partners_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'partners',
        },
        async (payload) => {
          console.log('Partners changed:', payload);
          // Refetch partners
          const { data } = await supabase
            .from('partners')
            .select(`
              *,
              categories!inner(name)
            `);

          if (data) {
            const transformedPartners: Partner[] = data.map((partner: any) => ({
              id: partner.id,
              name: partner.name,
              category: partner.categories.name,
              categoryId: partner.category_id,
              logo: partner.logo_url,
              logoAlt: partner.logo_alt,
              discount: `${partner.discount_percentage}%`,
              address: partner.address,
              phone: partner.phone,
              location: partner.location_city.toLowerCase(),
              discountValue: partner.discount_percentage,
              specialTerms: partner.special_terms || undefined,
              isFeatured: partner.is_featured || false,
              googleMapsLocation: partner.google_maps_location || undefined,
            }));
            setAllPartners(transformedPartners);

            // Update partner counts for categories
            setCategories((prevCategories) =>
              prevCategories.map((cat) => ({
                ...cat,
                partnerCount: transformedPartners.filter((p) => p.categoryId === cat.id).length,
              }))
            );
          }
        }
      )
      .subscribe();

    channels.push(partnersChannel);

    // Cleanup subscriptions on unmount
    return () => {
      channels.forEach((channel) => {
        supabase.removeChannel(channel);
      });
    };
  }, [isHydrated, supabase, allPartners]);

  useEffect(() => {
    if (!isHydrated) return;

    let filtered = allPartners;

    if (activeCategory !== 'all') {
      filtered = filtered.filter((partner) => partner.categoryId === activeCategory);
    }

    setFilteredPartners(filtered);
  }, [isHydrated, activeCategory, allPartners]);

  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded-lg w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-muted rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const activeCategoryData = categories.find((cat) => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-secondary to-primary text-primary-foreground py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Icon name="BuildingStorefrontIcon" size={48} variant="solid" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-amiri mb-4">
              شبكة شركائنا
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              اكتشف أكثر من 247 شريك تجاري يقدمون خصومات حصرية لحاملي بطاقات الاشتراك
            </p>
          </div>
        </div>
      </section>

      {/* Category Stats */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <CategoryStats key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Category Filter */}
            <CategoryQuickAccess
              onCategoryChange={setActiveCategory}
              activeCategory={activeCategory}
            />

            {/* Active Category Info */}
            {activeCategoryData && activeCategory !== 'all' && (
              <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${activeCategoryData.color}`}>
                      <Icon name={activeCategoryData.icon as any} size={24} variant="solid" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground font-amiri">
                        {activeCategoryData.label}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {filteredPartners.length} شريك متاح
                      </p>
                    </div>
                  </div>
                  <div className="bg-accent/10 border border-accent/20 rounded-lg px-6 py-3">
                    <span className="text-sm text-foreground">نطاق الخصم: </span>
                    <span className="text-lg font-bold text-accent font-amiri">
                      {activeCategoryData.discountRange}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Partners Grid */}
            {filteredPartners.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPartners.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-lg shadow-sm border border-border p-12 text-center">
                <Icon name="MagnifyingGlassIcon" size={64} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground font-amiri mb-2">
                  لا توجد نتائج
                </h3>
                <p className="text-muted-foreground mb-6">
                  لا يوجد شركاء في هذه الفئة حالياً
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                  }}
                  className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium transition-premium hover:bg-primary/90"
                >
                  عرض جميع الشركاء
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-accent via-accent/90 to-accent text-accent-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Icon name="SparklesIcon" size={48} variant="solid" className="mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold font-amiri mb-4">
              ابدأ الاستفادة من الخصومات الحصرية
            </h2>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              اشترك الآن واحصل على وصول فوري لجميع شركائنا وخصوماتهم المميزة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/subscription-cards"
                className="px-8 py-4 rounded-md bg-primary text-primary-foreground font-bold text-lg transition-premium hover:bg-primary/90 hover:shadow-lg active-press">

                اشترك الآن
              </a>
              <a
                href="/contact-us"
                className="px-8 py-4 rounded-md bg-card text-foreground font-bold text-lg transition-premium hover:bg-card/90 hover:shadow-lg active-press">

                تواصل معنا
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnersNetworkInteractive;