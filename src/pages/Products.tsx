
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, UploadCloud, ImageIcon } from 'lucide-react';
import { AuthModal } from '@/components/auth/AuthModal';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string | null;
  description: string | null;
  image_url: string | null;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error.message);
      toast({
        variant: "destructive",
        title: "Error fetching products",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to upload product images.",
      });
      return;
    }

    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select an image to upload.",
      });
      return;
    }

    try {
      setUploadLoading(true);
      
      // Generate a unique filename with user ID as the folder path
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      // Upload the file to the product_images bucket
      const { error: uploadError } = await supabase.storage
        .from('product_images')
        .upload(fileName, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) throw uploadError;
      
      // Create a product entry with the image URL
      const imagePath = fileName;
      
      // Basic product data (in a real app, you'd have a form for this)
      const productData = {
        name: `Product ${Date.now()}`,
        price: 99.99,
        description: 'A sample product with an uploaded image',
        category: 'Sample',
        image_url: imagePath,
        vendor_id: user.id,
      };
      
      const { error: productError } = await supabase
        .from('products')
        .insert([productData]);
      
      if (productError) throw productError;
      
      toast({
        title: "Success!",
        description: "Product image uploaded successfully.",
      });
      
      // Refresh the products list
      fetchProducts();
      
      // Reset file selection
      setSelectedFile(null);
      
    } catch (error: any) {
      console.error('Error uploading image:', error.message);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message,
      });
    } finally {
      setUploadLoading(false);
    }
  };

  const getImageUrl = (path: string | null) => {
    if (!path) return null;
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mxtsdgkwzjzlttpotole.supabase.co';
    return `${supabaseUrl}/storage/v1/object/public/product_images/${path}`;
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Signed in as {user.email}</span>
            </div>
          ) : (
            <AuthModal>
              <Button>Sign In</Button>
            </AuthModal>
          )}
        </div>
      </div>

      {/* Image Upload Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload Product Image</CardTitle>
          <CardDescription>
            Select an image file to upload for your product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="product-image">Product Image</Label>
            <Input
              id="product-image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={!user || uploadLoading}
            />
            {selectedFile && (
              <p className="text-sm text-gray-500 mt-1">
                Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={uploadImage} 
            disabled={!user || !selectedFile || uploadLoading}
            className="w-full sm:w-auto"
          >
            {uploadLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <UploadCloud className="mr-2 h-4 w-4" /> Upload Product Image
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Products Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No products found. Upload your first product image!</p>
          </div>
        ) : (
          products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative">
                {product.image_url ? (
                  <img 
                    src={getImageUrl(product.image_url)} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-gray-400" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="font-medium mt-2">${product.price?.toFixed(2)}</p>
                {product.description && (
                  <p className="text-sm mt-2 line-clamp-2">{product.description}</p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
