import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResetPasswordForm } from './ResetPasswordForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { useAuth } from '@/context/AuthContext';
import { SignUpAuthFormSchema } from '@/lib/validations/auth';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'react-router-dom';

interface AuthFormProps {
  onSuccess?: () => void
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const { toast } = useToast()
  const { signIn, signUp } = useAuth();
  const [searchParams] = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")

  const form = useForm<z.infer<typeof SignUpAuthFormSchema>>({
    resolver: zodResolver(SignUpAuthFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function handleSubmit(values: z.infer<typeof SignUpAuthFormSchema>) {
    setIsLoading(true)

    try {
      if (isSignUp) {
        await signUp(values.email, values.password, {
          first_name: values.name,
        });
        toast({
          title: "Successfully created your account",
          description: "Please check your email for verification.",
        })
      } else {
        await signIn(values.email, values.password);
        toast({
          title: "Successfully signed in",
        })
      }
      onSuccess?.()
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "There was an error signing in. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isResetPassword) {
    return <ResetPasswordForm onBack={() => setIsResetPassword(false)} />;
  }
  
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <Button
            variant="link"
            className="gap-x-1 pl-0 capitalize"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </Button>
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
          {isSignUp && (
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
          )}
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
          {!isSignUp && (
            <div className="text-right">
              <Button 
                type="button" 
                variant="link" 
                size="sm" 
                className="px-0 font-normal"
                onClick={() => setIsResetPassword(true)}
              >
                Forgot password?
              </Button>
            </div>
          )}
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}
        Github
      </Button>
    </div>
  );
}
