-- Fix the INSERT policy to include bucket_id filter
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;

CREATE POLICY "Authenticated users can upload product images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product_images'
  AND (storage.foldername(name))[1] = (auth.uid())::text
);