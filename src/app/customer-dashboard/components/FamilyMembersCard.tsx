'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

interface FamilyMember {
  id: string;
  member_name: string;
  relationship: string | null;
  phone: string | null;
  email: string | null;
  created_at: string;
}

const FamilyMembersCard = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { user } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && user) {
      loadFamilyMembers();
    } else if (isHydrated && !user) {
      setLoading(false);
    }
  }, [isHydrated, user]);

  const loadFamilyMembers = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('family_members')
        .select('id, member_name, relationship, phone, email, created_at')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: true });

      if (fetchError) {
        console.error('Error loading family members:', fetchError);
        setError('فشل في تحميل أفراد العائلة');
        return;
      }

      setFamilyMembers(data || []);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!user) {
      setError('يجب تسجيل الدخول أولاً');
      return;
    }

    const trimmedName = newMemberName.trim();
    if (!trimmedName) {
      setError('الرجاء إدخال اسم الفرد');
      return;
    }

    if (familyMembers.length >= 10) {
      setError('لا يمكن إضافة أكثر من 10 أفراد');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      const { data, error: insertError } = await supabase
        .from('family_members')
        .insert({
          user_id: user.id,
          member_name: trimmedName,
          is_active: true
        })
        .select('id, member_name, relationship, phone, email, created_at')
        .single();

      if (insertError) {
        console.error('Error adding family member:', insertError);
        if (insertError.code === '42501') {
          setError('ليس لديك صلاحية لإضافة أفراد العائلة');
        } else if (insertError.message.includes('10')) {
          setError('لا يمكن إضافة أكثر من 10 أفراد');
        } else {
          setError(`فشل في إضافة الفرد: ${insertError.message}`);
        }
        return;
      }

      if (data) {
        setFamilyMembers([...familyMembers, data]);
        setNewMemberName('');
        setIsAdding(false);
        setSuccessMessage('تم إضافة الفرد بنجاح');
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('حدث خطأ غير متوقع أثناء إضافة الفرد');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    if (!user) {
      setError('يجب تسجيل الدخول أولاً');
      return;
    }

    if (!confirm('هل أنت متأكد من حذف هذا الفرد؟')) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      const { error: deleteError } = await supabase
        .from('family_members')
        .delete()
        .eq('id', memberId)
        .eq('user_id', user.id);

      if (deleteError) {
        console.error('Error deleting family member:', deleteError);
        setError('فشل في حذف الفرد');
        return;
      }

      setFamilyMembers(familyMembers.filter((member) => member.id !== memberId));
      setSuccessMessage('تم حذف الفرد بنجاح');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('حدث خطأ غير متوقع أثناء حذف الفرد');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewMemberName('');
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !submitting && newMemberName.trim()) {
      handleAddMember();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground font-amiri flex items-center gap-2">
          <Icon name="UserGroupIcon" size={24} className="text-primary" />
          أفراد العائلة
        </h2>
        {!isAdding && familyMembers.length < 10 && user && (
          <button
            onClick={() => setIsAdding(true)}
            disabled={loading || submitting}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-premium font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="PlusIcon" size={18} />
            إضافة فرد
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
          <Icon name="ExclamationTriangleIcon" size={18} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 rounded-md bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
          <Icon name="CheckCircleIcon" size={18} />
          {successMessage}
        </div>
      )}

      {isAdding && (
        <div className="mb-6 p-4 rounded-lg border border-border bg-muted">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            اسم الفرد <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="أدخل اسم الفرد"
            className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent mb-3"
            maxLength={100}
            autoFocus
            disabled={submitting}
          />
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddMember}
              disabled={submitting || !newMemberName.trim()}
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-premium font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Icon name="CheckIcon" size={20} />
                  حفظ
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-muted text-foreground hover:bg-muted/80 transition-premium font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="XMarkIcon" size={20} />
              إلغاء
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {!user ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="ExclamationTriangleIcon" size={48} className="mx-auto mb-3 opacity-30" />
            <p>يجب تسجيل الدخول لعرض أفراد العائلة</p>
          </div>
        ) : loading ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="ArrowPathIcon" size={24} className="animate-spin mx-auto mb-2" />
            جاري التحميل...
          </div>
        ) : familyMembers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="UserGroupIcon" size={48} className="mx-auto mb-3 opacity-30" />
            <p>لم يتم إضافة أفراد العائلة بعد</p>
            <p className="text-sm mt-1">يمكنك إضافة حتى 10 أفراد</p>
          </div>
        ) : (
          <>
            <div className="mb-3 text-sm text-muted-foreground">
              عدد الأفراد: {familyMembers.length} / 10
            </div>
            {familyMembers.map((member, index) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-background hover:bg-muted/50 transition-premium"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{member.member_name}</p>
                    <p className="text-xs text-muted-foreground">
                      تم الإضافة: {new Date(member.created_at).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  disabled={submitting}
                  className="p-2 rounded-md text-red-600 hover:bg-red-50 transition-premium disabled:opacity-50 disabled:cursor-not-allowed"
                  title="حذف"
                >
                  <Icon name="TrashIcon" size={20} />
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FamilyMembersCard;