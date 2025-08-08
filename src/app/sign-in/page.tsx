"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas/signInSchema";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

//icons
import { Mail, Lock, Loader2, Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";

// Shac sn
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.input<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          toast.error("Invalid credentials. Please try again.");
        } else {
          toast.error(result.error);
        }
      }

      if (result?.url) {
        router.replace("/");
      }
    } catch (error: any) {
      console.log(error);
      toast.error("An unexpected error occurred. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">
            Good to see you again !
          </CardTitle>
          <CardDescription>
            Enter your Details to login into your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Phone</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute top-1/2 left-3 -translate-y-1/2">
                          <Mail className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          placeholder="E-mail or Phone"
                          className="pl-10"
                          {...field}
                        />
                      </div>
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute top-1/2 left-3 -translate-y-1/2">
                          <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="font-geist pr-10 pl-10 tracking-wide"
                          {...field}
                        />
                        <button
                          type="button"
                          className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mt-0.5 size-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-muted-foreground mt-5 flex flex-col items-start gap-2">
          <p className="text-sm">
            New to Meddiwiser?{" "}
            <Link
              href="/sign-up"
              className="text-primary font-medium hover:underline"
            >
              Create Account
            </Link>
          </p>

          <p className="text-sm">
            Forgot or set up your password?{" "}
            <Link
              href="/forgot-password"
              className="text-primary font-medium hover:underline"
            >
              Set Password
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
