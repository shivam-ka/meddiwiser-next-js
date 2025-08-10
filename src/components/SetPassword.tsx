"use client";
import { passwordSchema } from "@/schemas/passwordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Eye, EyeOff, Loader, Lock } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface SetPasswordProps {
  email: string;
}

export default function SetPassword({ email }: SetPasswordProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
    setIsSubmitting(true);
    try {
      const responnse = await axios.post("/api/set-password", {
        email,
        password: data.password,
      });

      if (responnse.data.success) router.replace("/sign-in");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-1">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-1">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="font-geist pr-10 pl-10 tracking-wide"
                    {...field}
                  />
                  <button
                    type="button"
                    className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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
              Please Wait...
            </>
          ) : (
            "Set Password"
          )}
        </Button>
      </form>
    </Form>
  );
}
