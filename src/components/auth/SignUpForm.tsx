
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
import { SignUpAuthFormSchema } from '@/lib/validations/auth';

interface SignUpFormProps {
  onSuccess?: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export function SignUpForm({ onSuccess, isLoading, setIsLoading }: SignUpFormProps) {
  const { toast } = useToast();
  const { signUp } = useAuth();

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

    try {
      await signUp(values.email, values.password, {
        first_name: values.name,
      });
      toast({
        title: "Successfully created your account",
        description: "Please check your email for verification.",
      });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "There was an error signing up. Please try again.",
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
        <Button disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
