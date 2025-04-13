"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { onboardingSchema } from "@/lib/validations";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { z } from "zod";
import { onboardingUser } from "@/lib/actions/auth";

const FIELD_NAMES: Record<string, string> = {
  fullName: "Full Name",
  email: "Email",
  nativeLanguage: "Native Language",
  targetLanguage: "Target Language",
};

const FIELD_TYPES: Record<string, string> = {
  fullName: "text",
  email: "email",
  nativeLanguage: "text",
  targetLanguage: "text",
};

// ✅ Infer type from schema
type OnboardingFormValues = z.infer<typeof onboardingSchema>;

interface Props {
  defaultValues: OnboardingFormValues;
}

const OnboardingForm = ({ defaultValues }: Props) => {
  const router = useRouter();

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues,
  });

  const handleSubmit = async (data: OnboardingFormValues) => {
    const result = await onboardingUser(data);

    if (result.success) {
      toast("Success", {
        description: "Your onboarding is complete.",
      });
      router.push("/app/home");
    } else {
      toast("Onboarding Error", {
        description: result.error ?? "An error occurred.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        Finish Setting Up Your Profile
      </h1>
      <p className="text-light-100">
        Please complete the following to tailor your learning experience.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as keyof OnboardingFormValues}
              render={({ field: fieldProps }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[fieldProps.name] || fieldProps.name}
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      type={FIELD_TYPES[fieldProps.name] || "text"}
                      {...fieldProps}
                      className="form-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="form-btn">
            Complete Onboarding
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OnboardingForm;
