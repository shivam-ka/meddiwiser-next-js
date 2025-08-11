"use client";
import { signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";

//icons
import { Mail, Loader, Check, ChevronDownIcon, User } from "lucide-react";

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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VerifyCode from "@/components/VeryfiyCode";
import SetPassword from "@/components/SetPassword";
import Link from "next/link";

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState<string>("");
  const [open, setOpen] = useState(false);

  const steps = ["Sign Up", "Verify Email", "Set Password"];

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      gender: undefined,
      dateOfBirth: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/sign-up", {
        fullName: data.fullName,
        email: data.email,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
      });

      if (response.data.success) setCurrentStep((prev) => prev + 1);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setIsSubmitting(false);
  };
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">
            {steps[currentStep]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StepProgress currentStep={currentStep} steps={steps} />
          {currentStep === 0 && (
            <Form {...signUpForm}>
              <form
                onSubmit={signUpForm.handleSubmit(onSubmit)}
                className="space-y-4 py-6"
              >
                <FormField
                  control={signUpForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute top-1/2 left-3 -translate-y-1/2">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input
                            placeholder="Enter Full Name"
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
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute top-1/2 left-3 -translate-y-1/2">
                            <Mail className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input
                            placeholder="Enter Email"
                            className="pl-10"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Of Birth</FormLabel>
                      <FormControl>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date"
                              className="w-full justify-between font-normal"
                            >
                              {field.value
                                ? field.value.toLocaleDateString()
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                field.onChange(date);
                                setOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slect Gender</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full cursor-pointer">
                            <SelectValue placeholder="Select a Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Gender</SelectLabel>
                              <SelectItem
                                className="cursor-pointer"
                                value="male"
                              >
                                Male
                              </SelectItem>
                              <SelectItem
                                className="cursor-pointer"
                                value="female"
                              >
                                Female
                              </SelectItem>
                              <SelectItem
                                className="cursor-pointer"
                                value="other"
                              >
                                Other
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>
          )}
          {currentStep === 1 && (
            <VerifyCode email={email} setCurrentStep={setCurrentStep} />
          )}
          {currentStep === 2 && <SetPassword email={email} />}
        </CardContent>
        <CardFooter className="text-muted-foreground flex flex-col items-start gap-2">
          <p className="text-sm">
            Already Have an Account?{" "}
            <Link
              href="/sign-in"
              className="text-primary font-medium hover:underline"
            >
              Login
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

interface StepProgressProps {
  steps: string[];
  currentStep: number;
}

function StepProgress({ steps, currentStep }: StepProgressProps) {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center gap-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-foreground flex items-center gap-2"
            >
              <BreadcrumbItem>
                <BreadcrumbLink
                  className={`flex size-8 items-center justify-center rounded-full border text-sm font-medium transition-colors ${
                    index < currentStep
                      ? "border-green-500 bg-green-500 text-green-50 dark:border-green-700 dark:bg-green-800 dark:text-green-50"
                      : index === currentStep
                        ? "border-primary bg-primary text-white"
                        : "border-muted bg-muted text-muted-foreground"
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <span
                className={
                  index <= currentStep ? "font-medium" : "text-muted-foreground"
                }
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <BreadcrumbSeparator className="text-muted-foreground mt-0.5 h-4 w-4" />
              )}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
