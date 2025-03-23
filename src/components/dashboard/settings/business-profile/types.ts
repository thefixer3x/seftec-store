
import { z } from 'zod';

export const businessFormSchema = z.object({
  business_name: z.string().min(1, 'Business name is required'),
  business_email: z.string().email('Invalid email address'),
  business_phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  business_address: z.string().min(1, 'Business address is required'),
  date_of_incorporation: z.string().min(1, 'Date of incorporation is required'),
  rc_number: z.string().min(1, 'RC Number is required'),
  business_type: z.string().min(1, 'Business type is required'),
  tax_id: z.string().min(1, 'Tax Identification Number is required'),
});

export type BusinessFormValues = z.infer<typeof businessFormSchema>;
