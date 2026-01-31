'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onLocationFilter: (location: string) => void;
  onDiscountFilter: (discount: string) => void;
}

const SearchFilter = ({
  onSearch,
  onLocationFilter,
  onDiscountFilter,
}: SearchFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedDiscount, setSelectedDiscount] = useState('all');

  const locations = [
    { value: 'all', label: 'جميع المواقع' },
    { value: 'riyadh', label: 'الرياض' },
    { value: 'jeddah', label: 'جدة' },
    { value: 'dammam', label: 'الدمام' },
    { value: 'mecca', label: 'مكة المكرمة' },
  ];

  const discountRanges = [
    { value: 'all', label: 'جميع الخصومات' },
    { value: '10-20', label: '10% - 20%' },
    { value: '20-30', label: '20% - 30%' },
    { value: '30-40', label: '30% - 40%' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedLocation(value);
    onLocationFilter(value);
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedDiscount(value);
    onDiscountFilter(value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('all');
    setSelectedDiscount('all');
    onSearch('');
    onLocationFilter('all');
    onDiscountFilter('all');
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="FunnelIcon" size={24} className="text-primary" />
        <h3 className="text-lg font-bold text-foreground font-amiri">
          البحث والتصفية
        </h3>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          البحث عن شريك
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="ابحث باسم الشريك..."
            className="w-full px-4 py-3 pr-12 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-premium"
          />
          <Icon
            name="MagnifyingGlassIcon"
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          الموقع
        </label>
        <div className="relative">
          <select
            value={selectedLocation}
            onChange={handleLocationChange}
            className="w-full px-4 py-3 pr-12 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-premium appearance-none"
          >
            {locations.map((location) => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>
          <Icon
            name="MapPinIcon"
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>
      </div>

      {/* Discount Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          نسبة الخصم
        </label>
        <div className="relative">
          <select
            value={selectedDiscount}
            onChange={handleDiscountChange}
            className="w-full px-4 py-3 pr-12 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-premium appearance-none"
          >
            {discountRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <Icon
            name="PercentBadgeIcon"
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      {(searchQuery || selectedLocation !== 'all' || selectedDiscount !== 'all') && (
        <button
          onClick={clearFilters}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-muted text-foreground hover:bg-muted/80 transition-premium font-medium"
        >
          <Icon name="XMarkIcon" size={18} />
          <span>مسح التصفية</span>
        </button>
      )}
    </div>
  );
};

export default SearchFilter;