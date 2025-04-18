
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from "@/components/icons";
import { useAuth } from '@/context/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SignInAuthFormSchema } from '@/lib/validations/auth';

interface SignInFormProps {
  onSuccess?: () => void;
  onForgotPassword: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export function SignInForm({ 
  onSuccess, 
  onForgotPassword, 
  isLoading, 
  setIsLoading 
}: SignInFormProps) {
  const { toast } = useToast();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the intended destination from state, or default to dashboard
  const from = location.state?.from || '/profile/dashboard';

  const form = useForm<z.infer<typeof SignInAuthFormSchema>>({
    resolver: zodResolver(SignInAuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof SignInAuthFormSchema>) {
    setIsLoading(true);

    try {
      await signIn(values.email, values.password);
      toast({
        title: "Successfully signed in",
      });
      
      // Redirect to the intended destination or dashboard
      navigate(from, { replace: true });
      
      // Still call onSuccess if provided (for potential modal closing, etc.)
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "There was an error signing in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="email">Email</Label>
              <FormControl>
                <Input
                  id="email"
                  placeholder="shadcn@example.com"
                  {...field}
                  type="email"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="password">Password</Label>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-right">
          <Button 
            type="button" 
            variant="link" 
            size="sm" 
            className="px-0 font-normal"
            onClick={onForgotPassword}
          >
            Forgot password?
          </Button>
        </div>
        <Button disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign In
        </Button>
      </form>
    </Form>
  );
}
