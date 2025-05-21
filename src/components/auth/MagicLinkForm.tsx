
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from "@/components/icons";
import { Mail, CheckCircle } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
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

const MagicLinkSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

interface MagicLinkFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export function MagicLinkForm({ isLoading, setIsLoading }: MagicLinkFormProps) {
  const { signInWithMagicLink } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');

  const form = useForm<z.infer<typeof MagicLinkSchema>>({
    resolver: zodResolver(MagicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof MagicLinkSchema>) {
    setIsLoading(true);

    try {
      await signInWithMagicLink(values.email);
      setEmailSent(true);
      setEmailAddress(values.email);
    } catch (error) {
      console.error("Magic link error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (emailSent) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-lg font-medium">Check your email</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          We've sent a magic link to <strong>{emailAddress}</strong>.<br />
          Click the link in your email to sign in.
        </p>
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={() => setEmailSent(false)}
        >
          Back
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="email">Email</Label>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    {...field}
                    disabled={isLoading}
                  />
                </div>
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                We'll email you a magic link for a password-free sign in.
              </p>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Sending link...
            </>
          ) : (
            "Send Magic Link"
          )}
        </Button>
      </form>
    </Form>
  );
}
