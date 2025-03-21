
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SignUpAuthFormSchema } from '@/lib/validations/auth';

interface SignUpFormProps {
  onSuccess?: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export function SignUpForm({ onSuccess, isLoading, setIsLoading }: SignUpFormProps) {
  const { toast } = useToast();
  const { signUp } = useAuth();
  const [formError, setFormError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof SignUpAuthFormSchema>>({
    resolver: zodResolver(SignUpAuthFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof SignUpAuthFormSchema>) {
    setIsLoading(true);
    setFormError(null);

    try {
      await signUp(values.email, values.password, {
        first_name: values.name,
      });
      toast({
        title: "Successfully created your account",
        description: "Please check your email for verification.",
      });
      onSuccess?.();
    } catch (error: any) {
      console.error("Signup error:", error);
      
      let errorMessage = "There was an error signing up. Please try again.";
      if (error.message) {
        // Extract more specific error messages
        if (error.message.includes("User already registered")) {
          errorMessage = "This email is already registered. Please use a different email or try signing in.";
        } else if (error.message.includes("Password should be")) {
          errorMessage = error.message;
        } else if (error.message.includes("captcha")) {
          errorMessage = "We're experiencing technical difficulties with our signup process. Please try again later.";
        }
      }
      
      setFormError(errorMessage);
      
      toast({
        title: "Something went wrong.",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
        {formError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="name">Name</Label>
              <FormControl>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="email">Email</Label>
              <FormControl>
                <Input
                  id="email"
                  placeholder="example@email.com"
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
        <Button disabled={isLoading} type="submit">
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
