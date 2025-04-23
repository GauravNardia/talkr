"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

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
import Image from "next/image";


// Form field labels and input types
const FIELD_NAMES: Record<string, string> = {
  fullName: "Full Name",
  email: "Email",
  password: "Password",
};

const FIELD_TYPES: Record<string, string> = {
  fullName: "text",
  email: "email",
  password: "password",
};

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast("Success",{
        description: isSignIn
          ? "You have successfully signed in."
          : "You have successfully signed up.",
      });

      if (isSignIn) {
        router.push("/app/home");
      } else {
        router.push("/onboarding");
      }

    } else {
      toast(`Error ${isSignIn ? "signing in" : "signing up"}`,{
        description: result.error ?? "An error occurred.",
      });
    }
  };

  return (
    <div className=" w-75 sm:w-96 flex flex-col justify-center gap-4 text-neutral-200">
      <div className=" flex justify-center text-center">
        <Image src="/assets/icons/logo.svg" width={45} height={45} alt="logo" />
      </div>
      <h1 className="text-center text-2xl font-semibold">
        {isSignIn ? "Welcome back to Talkr" : "Create your account"}
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
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

          <Button type="submit" className="bg-white text-black cursor-pointer hover:bg-neutral-400">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? "New to Talkr?" : "Already have an account? "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-semibold ml-2 text-green-500"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
