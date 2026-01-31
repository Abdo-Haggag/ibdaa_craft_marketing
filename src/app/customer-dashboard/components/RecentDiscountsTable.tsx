import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface DiscountTransaction {
  id: string;
  partnerName: string;
  category: string;
  discountAmount: number;
  originalPrice: number;
  date: string;
}

interface RecentDiscountsTableProps {
  transactions: DiscountTransaction[];
}

const RecentDiscountsTable = ({ transactions }: RecentDiscountsTableProps) => {
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'الطب والصحة': 'HeartIcon',
      'المطاعم والمقاهي': 'BuildingStorefrontIcon',
      'الملابس والأزياء': 'ShoppingBagIcon',
      'الحلويات والمخبوزات': 'CakeIcon',
      'الرياضة واللياقة': 'TrophyIcon',
    };
    return icons[category] || 'TagIcon';
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground font-amiri flex items-center gap-2">
          <Icon name="ClockIcon" size={24} className="text-primary" />
          سجل الخصومات الأخيرة
        </h2>
        <span className="text-sm text-muted-foreground">
          آخر {transactions.length} معاملة
        </span>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                الشريك
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                الفئة
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                السعر الأصلي
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                الخصم
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                التاريخ
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-border hover:bg-muted/50 transition-premium">
                <td className="py-4 px-4">
                  <p className="font-medium text-foreground">{transaction.partnerName}</p>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Icon name={getCategoryIcon(transaction.category) as any} size={16} className="text-primary" />
                    <span className="text-sm text-foreground">{transaction.category}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-foreground data-text">{transaction.originalPrice} ريال</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-success font-bold data-text">-{transaction.discountAmount} ريال</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-muted-foreground">{transaction.date}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-4 rounded-lg border border-border bg-muted/30">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="font-medium text-foreground mb-1">{transaction.partnerName}</p>
                <div className="flex items-center gap-2">
                  <Icon name={getCategoryIcon(transaction.category) as any} size={14} className="text-primary" />
                  <span className="text-xs text-muted-foreground">{transaction.category}</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{transaction.date}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">السعر الأصلي</p>
                <p className="text-foreground font-medium data-text">{transaction.originalPrice} ريال</p>
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground mb-1">الخصم</p>
                <p className="text-success font-bold data-text">-{transaction.discountAmount} ريال</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-12">
          <Icon name="InboxIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">لا توجد معاملات حتى الآن</p>
          <p className="text-sm text-muted-foreground mt-2">ابدأ باستخدام بطاقتك للحصول على خصومات رائعة!</p>
        </div>
      )}
    </div>
  );
};

export default RecentDiscountsTable;