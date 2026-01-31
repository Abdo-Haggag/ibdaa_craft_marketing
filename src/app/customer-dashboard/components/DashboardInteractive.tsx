'use client';

import React, { useState, useEffect } from 'react';
import PersonalInfoCard from './PersonalInfoCard';
import MembershipDetailsCard from './MembershipDetailsCard';
import RenewalNotification from './RenewalNotification';
import QuickActionsPanel from './QuickActionsPanel';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  membership_type: 'individual' | 'family' | 'corporate';
  membership_start_date: string;
  membership_expiry_date: string | null;
  is_active: boolean;
  created_at: string;
  work_at: string | null;
  card_type: 'vip' | 'family';
  card_image: string | null;
}

const DashboardInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [familyMemberCount, setFamilyMemberCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          setError('فشل في تحميل بيانات الملف الشخصي');
          setLoading(false);
          return;
        }

        setUserProfile(profileData);

        // Count family members
        const { count, error: countError } = await supabase
          .from('family_members')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (countError) {
          console.error('Error counting family members:', countError);
        } else {
          setFamilyMemberCount(count || 0);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    if (isHydrated) {
      fetchUserData();
    }
  }, [isHydrated, user]);

  // Real-time subscriptions for all tables
  useEffect(() => {
    if (!user || !isHydrated) return;

    const channels: RealtimeChannel[] = [];

    // Subscribe to user_profiles changes
    const profileChannel = supabase
      .channel('user_profiles_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_profiles',
          filter: `id=eq.${user.id}`,
        },
        async (payload) => {
          console.log('User profile changed:', payload);
          if (payload.eventType === 'DELETE') {
            setUserProfile(null);
          } else {
            const { data } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('id', user.id)
              .maybeSingle();
            if (data) setUserProfile(data);
          }
        }
      )
      .subscribe();

    channels.push(profileChannel);

    // Subscribe to family_members changes
    const familyChannel = supabase
      .channel('family_members_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'family_members',
          filter: `user_id=eq.${user.id}`,
        },
        async (payload) => {
          console.log('Family members changed:', payload);
          const { count } = await supabase
            .from('family_members')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);
          setFamilyMemberCount(count || 0);
        }
      )
      .subscribe();

    channels.push(familyChannel);

    // Cleanup subscriptions
    return () => {
      channels.forEach((channel) => {
        supabase.removeChannel(channel);
      });
    };
  }, [user, isHydrated]);

  // Calculate days until expiry
  const calculateDaysUntilExpiry = () => {
    if (!userProfile?.membership_expiry_date) return 999;
    const expiryDate = new Date(userProfile.membership_expiry_date);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Format date helper
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'غير محدد';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Loading state
  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-muted rounded-lg"></div>
                <div className="h-64 bg-muted rounded-lg"></div>
              </div>
              <div className="space-y-6">
                <div className="h-64 bg-muted rounded-lg"></div>
                <div className="h-64 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No profile state
  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-700 font-medium">لم يتم العثور على بيانات الملف الشخصي</p>
            <p className="text-yellow-600 text-sm mt-2">يرجى التواصل مع الدعم الفني</p>
          </div>
        </div>
      </div>
    );
  }

  const daysUntilExpiry = calculateDaysUntilExpiry();

  // Map card type to Arabic
  const getCardTypeArabic = (type: string) => {
    const types: Record<string, string> = {
      vip: 'VIP',
      family: 'عائلية',
    };
    return types[type] || type;
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        {/* Renewal Notification */}
        {daysUntilExpiry <= 30 && userProfile && (
          <div className="mb-6">
            <RenewalNotification
              daysUntilExpiry={daysUntilExpiry}
              expiryDate={formatDate(userProfile.membership_expiry_date)}
            />
          </div>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info Card */}
            <PersonalInfoCard
              userInfo={{
                name: userProfile.full_name,
                email: userProfile.email,
                phone: userProfile.phone || 'غير محدد',
                workCategory: userProfile.work_at || 'غير محدد',
                nationalId: 'غير محدد',
                city: userProfile.city || 'غير محدد',
              }}
            />

            {/* Membership Details Card */}
            <MembershipDetailsCard
              subscriptionType={userProfile.membership_type || 'individual'}
              activationDate={formatDate(userProfile.created_at)}
              expiryDate={formatDate(userProfile.membership_expiry_date)}
              cardImageUrl={userProfile.card_image}
              totalSavings={0}
              discountsUsed={0}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions Panel */}
            <QuickActionsPanel
              cardImageUrl={userProfile?.card_image}
              onContactSupport={() => (window.location.href = '/contact-us')}
              onRenewSubscription={() => (window.location.href = '/subscription-cards')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInteractive;