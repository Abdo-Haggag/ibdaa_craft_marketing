'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { createClient } from '@/lib/supabase/client';

interface Category {
  id: string;
  label: string;
  icon: string;
  count: number;
}

interface CategoryQuickAccessProps {
  onCategoryChange?: (categoryId: string) => void;
  activeCategory?: string;
}

const CategoryQuickAccess = ({
  onCategoryChange,
  activeCategory = 'all',
}: CategoryQuickAccessProps) => {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fetch categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      if (!isHydrated) return;

      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (categoriesError) {
          console.error('Error fetching categories:', categoriesError);
          return;
        }

        // Fetch partners count for each category
        const { data: partnersData, error: partnersError } = await supabase
          .from('partners')
          .select('category_id');

        if (partnersError) {
          console.error('Error fetching partners:', partnersError);
          return;
        }

        // Count partners per category
        const partnerCounts: Record<string, number> = {};
        partnersData?.forEach((partner) => {
          partnerCounts[partner.category_id] = (partnerCounts[partner.category_id] || 0) + 1;
        });

        // Transform categories data
        const transformedCategories: Category[] = [
          { id: 'all', label: 'جميع الفئات', icon: 'Squares2X2Icon', count: partnersData?.length || 0 },
          ...(categoriesData?.map((cat) => ({
            id: cat.id,
            label: cat.name,
            icon: cat.icon,
            count: partnerCounts[cat.id] || 0,
          })) || []),
        ];

        setCategories(transformedCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, [isHydrated, supabase]);

  // Update selected category when activeCategory prop changes
  useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsDropdownOpen(false);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  const getSelectedCategoryLabel = () => {
    const category = categories.find((cat) => cat.id === selectedCategory);
    return category ? category.label : 'جميع الفئات';
  };

  if (!isHydrated || categories.length === 0) {
    return (
      <div className="bg-card rounded-lg shadow-sm border border-border p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-6 bg-muted rounded w-1/3" />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-16 bg-muted rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-4">
      {/* Desktop View */}
      <div className="hidden md:block">
        <h3 className="text-lg font-semibold text-foreground mb-4 font-amiri">
          تصفح حسب الفئة
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex items-center gap-3 p-4 rounded-md transition-premium border ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-background text-foreground border-border hover:bg-muted hover:border-primary/30'
              }`}
            >
              <Icon name={category.icon as any} size={24} />
              <div className="flex flex-col items-start flex-1">
                <span className="text-sm font-medium">{category.label}</span>
                {category.count > 0 && (
                  <span className="text-xs opacity-70 mt-1">
                    {category.count} شريك
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile View - Dropdown */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-between w-full p-4 rounded-md bg-background border border-border hover:bg-muted transition-premium"
        >
          <div className="flex items-center gap-3">
            <Icon name="Squares2X2Icon" size={20} />
            <span className="text-sm font-medium text-foreground">
              {getSelectedCategoryLabel()}
            </span>
          </div>
          <Icon
            name="ChevronDownIcon"
            size={20}
            className={`transition-premium ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full right-0 left-0 mt-2 bg-popover rounded-md shadow-lg border border-border z-50 overflow-hidden">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center gap-3 w-full p-4 transition-premium ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-popover-foreground hover:bg-muted'
                }`}
              >
                <Icon name={category.icon as any} size={20} />
                <div className="flex flex-col items-start flex-1">
                  <span className="text-sm font-medium">{category.label}</span>
                  {category.count > 0 && (
                    <span className="text-xs opacity-70 mt-1">
                      {category.count} شريك
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Active Filter Indicator */}
      {selectedCategory !== 'all' && (
        <div className="mt-4 flex items-center justify-between p-3 rounded-md bg-accent/10 border border-accent/20">
          <div className="flex items-center gap-2">
            <Icon name="FunnelIcon" size={16} className="text-accent" />
            <span className="text-sm text-foreground">
              تصفية نشطة: <span className="font-medium">{getSelectedCategoryLabel()}</span>
            </span>
          </div>
          <button
            onClick={() => handleCategoryClick('all')}
            className="text-sm text-accent hover:text-accent/80 transition-premium font-medium"
          >
            إزالة التصفية
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryQuickAccess;