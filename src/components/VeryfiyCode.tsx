"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifySchema } from "@/schemas/verifySchema";
import * as z from "zod";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface VerifyCodeProps {
  email: string;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}
export default function VerifyCode({ email, setCurrentStep }: VerifyCodeProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      verifyCode: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/verify-email", {
        email,
        verifyCode: data.verifyCode,
      });
      if (response.data.success) setCurrentStep((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "");
    }
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-6">
        <FormField
          control={form.control}
          name="verifyCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-1">Verify Code</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} onChange={field.onChange}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
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
            "Please Wait"
          )}
        </Button>
      </form>
    </Form>
  );
}
