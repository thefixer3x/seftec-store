
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, User, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

// Form schema validation
const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof formSchema>;

export function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form with existing values
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.user_metadata?.full_name || '',
      email: user?.email || '',
      phone: user?.user_metadata?.phone || '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      // Call update profile function from auth context
      await updateProfile(data);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: (
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error.message || "An error occurred while updating your profile"}</span>
          </div>
        )
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border border-seftec-navy/10 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-sm">
      <CardHeader>
        <CardTitle className="text-seftec-navy dark:text-white">Personal Information</CardTitle>
        <CardDescription className="text-seftec-navy/70 dark:text-white/70">
          Update your personal details
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
              Full Name
            </Label>
            <Input 
              id="fullName" 
              {...register('fullName')} 
              className="border-seftec-navy/10 dark:border-white/10"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
              Email Address
            </Label>
            <Input 
              id="email" 
              type="email" 
              {...register('email')} 
              className="border-seftec-navy/10 dark:border-white/10"
              disabled
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
              Phone Number (optional)
            </Label>
            <Input 
              id="phone" 
              {...register('phone')} 
              className="border-seftec-navy/10 dark:border-white/10"
            />
          </div>
        </CardContent>
        <CardFooter className="border-t border-seftec-navy/10 dark:border-white/10 pt-6">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-seftec-navy text-white hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
