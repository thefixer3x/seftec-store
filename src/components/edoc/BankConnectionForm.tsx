import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Plus, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEdocIntegration } from '@/hooks/useEdocIntegration';
import { useAuth } from '@/context/AuthContext';

const formSchema = z.object({
  bankCode: z.string().min(1, 'Please select a bank'),
  email: z.string().email('Please enter a valid email address'),
  consent: z.boolean().refine(val => val === true, 'You must provide consent to connect your bank')
});

type FormData = z.infer<typeof formSchema>;

// Nigerian banks with their E-Doc codes
const NIGERIAN_BANKS = [
  { code: 'GTB', name: 'Guaranty Trust Bank' },
  { code: 'UBA', name: 'United Bank for Africa' },
  { code: 'ACCESS', name: 'Access Bank' },
  { code: 'ZENITH', name: 'Zenith Bank' },
  { code: 'FCMB', name: 'First City Monument Bank' },
  { code: 'FBN', name: 'First Bank of Nigeria' },
  { code: 'STERLING', name: 'Sterling Bank' },
  { code: 'UNION', name: 'Union Bank' },
  { code: 'WEMA', name: 'Wema Bank' },
  { code: 'POLARIS', name: 'Polaris Bank' },
  { code: 'STANBIC', name: 'Stanbic IBTC Bank' },
  { code: 'FIDELITY', name: 'Fidelity Bank' },
  { code: 'ECOBANK', name: 'Ecobank Nigeria' },
  { code: 'KEYSTONE', name: 'Keystone Bank' },
  { code: 'UNITY', name: 'Unity Bank' }
];

interface BankConnectionFormProps {
  onSuccess: () => void;
}

export const BankConnectionForm: React.FC<BankConnectionFormProps> = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { initializeBankConsent } = useEdocIntegration();
  const { user } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bankCode: '',
      email: user?.email || '',
      consent: false
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setError(null);

      const bankName = NIGERIAN_BANKS.find(bank => bank.code === data.bankCode)?.name || data.bankCode;
      
      const result = await initializeBankConsent(data.email, data.bankCode, bankName);
      
      if (result?.authorization_url) {
        // Open the bank authorization page in a new window
        window.open(result.authorization_url, '_blank', 'width=600,height=700');
        
        // Close the form and refresh the parent
        setOpen(false);
        form.reset();
        onSuccess();
      } else {
        setError('Failed to initialize bank connection. Please try again.');
      }
    } catch (err) {
      console.error('Error connecting bank:', err);
      setError('Failed to connect to bank. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Connect Bank
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Your Bank Account</DialogTitle>
          <DialogDescription>
            Securely connect your Nigerian bank account to enable transaction analysis and financial insights.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="bankCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Your Bank</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your bank" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {NIGERIAN_BANKS.map((bank) => (
                        <SelectItem key={bank.code} value={bank.code}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="email" 
                      placeholder="Enter your email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Privacy & Security:</strong> We use bank-grade encryption and only access your transaction data. 
                You can revoke access at any time. We never store your banking credentials.
              </AlertDescription>
            </Alert>

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm">
                      I consent to SEFTEC accessing my bank transaction data for analysis purposes
                    </FormLabel>
                    <p className="text-xs text-muted-foreground">
                      This consent is required under Nigerian data protection regulations. 
                      You can withdraw consent at any time.
                    </p>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Connect Bank
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};