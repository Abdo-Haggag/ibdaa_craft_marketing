-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL,
    discount_range TEXT NOT NULL,
    color TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create partners table
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    logo_url TEXT NOT NULL,
    logo_alt TEXT NOT NULL,
    discount_percentage INTEGER NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    google_maps_location TEXT,
    location_city TEXT NOT NULL,
    special_terms TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_partners_category_id ON public.partners(category_id);
CREATE INDEX IF NOT EXISTS idx_partners_location_city ON public.partners(location_city);
CREATE INDEX IF NOT EXISTS idx_partners_is_featured ON public.partners(is_featured);
CREATE INDEX IF NOT EXISTS idx_categories_name ON public.categories(name);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read access)
DROP POLICY IF EXISTS "public_can_read_categories" ON public.categories;
CREATE POLICY "public_can_read_categories" 
ON public.categories
FOR SELECT 
TO public 
USING (true);

-- RLS Policies for partners (public read access)
DROP POLICY IF EXISTS "public_can_read_partners" ON public.partners;
CREATE POLICY "public_can_read_partners" 
ON public.partners
FOR SELECT 
TO public 
USING (true);

-- Insert categories mock data
DO $$
DECLARE
    medicine_id UUID := gen_random_uuid();
    restaurants_id UUID := gen_random_uuid();
    clothing_id UUID := gen_random_uuid();
    sweets_id UUID := gen_random_uuid();
    sports_id UUID := gen_random_uuid();
BEGIN
    -- Insert categories
    INSERT INTO public.categories (id, name, icon, discount_range, color)
    VALUES 
        (medicine_id, 'الطب والصحة', 'HeartIcon', '10% - 30%', 'bg-red-500/10 text-red-600'),
        (restaurants_id, 'المطاعم والمقاهي', 'BuildingStorefrontIcon', '10% - 25%', 'bg-orange-500/10 text-orange-600'),
        (clothing_id, 'الملابس والأزياء', 'ShoppingBagIcon', '15% - 40%', 'bg-purple-500/10 text-purple-600'),
        (sweets_id, 'الحلويات والمخبوزات', 'CakeIcon', '10% - 30%', 'bg-pink-500/10 text-pink-600'),
        (sports_id, 'الرياضة واللياقة', 'TrophyIcon', '15% - 35%', 'bg-green-500/10 text-green-600')
    ON CONFLICT (name) DO NOTHING;

    -- Insert partners mock data
    INSERT INTO public.partners (name, category_id, logo_url, logo_alt, discount_percentage, address, phone, location_city, special_terms, is_featured, google_maps_location)
    VALUES 
        -- Medicine category
        ('مركز النور الطبي', medicine_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_134883fdc-1766792325116.png', 'شعار مركز النور الطبي بخلفية زرقاء وصليب أبيض', 25, 'شارع الملك فهد، حي العليا، الرياض', '+966 11 234 5678', 'riyadh', 'الخصم لا يشمل العمليات الجراحية والأشعة المقطعية', true, NULL),
        ('عيادات الشفاء الأسنان', medicine_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1e64b4d6f-1769730863114.png', 'شعار عيادات الشفاء للأسنان بتصميم أسنان بيضاء على خلفية خضراء', 20, 'طريق الأمير سلطان، حي الزهراء، جدة', '+966 12 345 6789', 'jeddah', 'الخصم يشمل جميع خدمات الأسنان عدا التقويم', false, NULL),
        ('مستشفى الحياة الطبي', medicine_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_14be4bee7-1769730863092.png', 'شعار مستشفى الحياة الطبي بتصميم قلب أحمر مع نبضات على خلفية بيضاء', 18, 'طريق الدمام السريع، حي الفيصلية، الدمام', '+966 13 234 5678', 'dammam', NULL, false, NULL),
        
        -- Restaurants category
        ('مطعم الذواقة', restaurants_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_166e78830-1767119315158.png', 'شعار مطعم الذواقة بتصميم شوكة وسكين ذهبية على خلفية سوداء', 20, 'شارع التحلية، حي الروضة، الرياض', '+966 11 456 7890', 'riyadh', 'الخصم لا يشمل المشروبات الغازية والعصائر الطازجة', true, NULL),
        ('مقهى الأصالة', restaurants_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_15dc467aa-1769730862307.png', 'شعار مقهى الأصالة بتصميم فنجان قهوة بني على خلفية كريمية', 15, 'كورنيش جدة، حي الشاطئ، جدة', '+966 12 567 8901', 'jeddah', NULL, false, NULL),
        ('مطعم البحر الأزرق', restaurants_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1f56d2f1f-1766494430350.png', 'شعار مطعم البحر الأزرق بتصميم سمكة زرقاء على خلفية بحرية', 22, 'كورنيش الدمام، حي الشاطئ، الدمام', '+966 13 345 6789', 'dammam', NULL, true, NULL),
        
        -- Clothing category
        ('بوتيك الأناقة', clothing_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1da1956f8-1764849863486.png', 'شعار بوتيك الأناقة بتصميم فستان أنيق على خلفية وردية', 35, 'العثيم مول، حي الربوة، الرياض', '+966 11 678 9012', 'riyadh', 'الخصم يشمل جميع المنتجات عدا الإكسسوارات', true, NULL),
        ('متجر الموضة العصرية', clothing_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_142573337-1769730863651.png', 'شعار متجر الموضة العصرية بتصميم حقيبة يد فاخرة على خلفية سوداء', 30, 'الراشد مول، حي الفيصلية، جدة', '+966 12 789 0123', 'jeddah', NULL, false, NULL),
        
        -- Sweets category
        ('حلويات السعادة', sweets_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1383b51a0-1769730863943.png', 'شعار حلويات السعادة بتصميم كب كيك ملون على خلفية بيضاء', 25, 'شارع العروبة، حي النخيل، الرياض', '+966 11 890 1234', 'riyadh', 'الخصم يشمل جميع المنتجات عدا الكيك المخصص', false, NULL),
        ('مخبز الفرن الذهبي', sweets_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_194d8324b-1768346125710.png', 'شعار مخبز الفرن الذهبي بتصميم خبز طازج على خلفية بنية', 20, 'شارع فلسطين، حي البوادي، جدة', '+966 12 901 2345', 'jeddah', NULL, true, NULL),
        
        -- Sports category
        ('نادي اللياقة الشامل', sports_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1fb827f26-1766558217677.png', 'شعار نادي اللياقة الشامل بتصميم دمبل أسود على خلفية حمراء', 30, 'طريق الملك عبدالله، حي الياسمين، الرياض', '+966 11 012 3456', 'riyadh', 'الخصم يشمل الاشتراك السنوي فقط', false, NULL),
        ('مركز الأبطال الرياضي', sports_id, 'https://img.rocket.new/generatedImages/rocket_gen_img_1aa814764-1769730865016.png', 'شعار مركز الأبطال الرياضي بتصميم كأس ذهبي على خلفية زرقاء', 25, 'شارع الأمير محمد، حي الحمراء، جدة', '+966 12 123 4567', 'jeddah', NULL, false, NULL)
    ON CONFLICT (id) DO NOTHING;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Mock data insertion failed: %', SQLERRM;
END $$;