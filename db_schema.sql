-- RUN THIS IN SUPABASE SQL EDITOR
-- 1. Add the design_config column as JSONB (Flexible JSON format)
ALTER TABLE public.profile
ADD COLUMN IF NOT EXISTS design_config JSONB DEFAULT NULL;
-- 2. (Optional) Example of how to manually update a profile with a custom theme
-- Replace 'your-username-here' with the actual username
/*
 UPDATE public.profile
 SET design_config = '{
 "colors": {
 "primary": "#8b5cf6",
 "background": "#2e1065",
 "cardBg": "#4c1d95",
 "cardBorder": "#6d28d9"
 },
 "shapes": {
 "button": "9999px",
 "card": "1rem"
 }
 }'
 WHERE username = 'your-username-here';
 */