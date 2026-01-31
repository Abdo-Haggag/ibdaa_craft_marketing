'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  workCategory: string;
  nationalId: string;
  city: string;
}

interface PersonalInfoCardProps {
  userInfo: PersonalInfo;
  onUpdate?: (updatedInfo: PersonalInfo) => void;
}

const PersonalInfoCard = ({ userInfo, onUpdate }: PersonalInfoCardProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PersonalInfo>(userInfo);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(userInfo);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(formData);
    }
    setIsEditing(false);
  };

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground font-amiri flex items-center gap-2">
          <Icon name="UserCircleIcon" size={24} className="text-primary" />
          المعلومات الشخصية
        </h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              الاسم الكامل
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            ) : (
              <p className="text-foreground font-medium px-4 py-3 bg-muted rounded-md">
                {userInfo.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              البريد الإلكتروني
            </label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            ) : (
              <p className="text-foreground font-medium px-4 py-3 bg-muted rounded-md">
                {userInfo.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              رقم الجوال
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            ) : (
              <p className="text-foreground font-medium px-4 py-3 bg-muted rounded-md">
                {userInfo.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              جهة العمل
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.workCategory}
                onChange={(e) => handleChange('workCategory', e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            ) : (
              <p className="text-foreground font-medium px-4 py-3 bg-muted rounded-md">
                {userInfo.workCategory}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              المدينة
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            ) : (
              <p className="text-foreground font-medium px-4 py-3 bg-muted rounded-md">
                {userInfo.city}
              </p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-premium font-medium"
            >
              <Icon name="CheckIcon" size={20} />
              حفظ التغييرات
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-muted text-foreground hover:bg-muted/80 transition-premium font-medium"
            >
              <Icon name="XMarkIcon" size={20} />
              إلغاء
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoCard;