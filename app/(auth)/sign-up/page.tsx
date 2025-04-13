"use client";

import { signUpSchema } from "@/lib/validations";
import AuthForm from "@/components/forms/AuthForm";
import { signUp } from "@/lib/actions/auth";

const Page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      email: "",
      password: "",
      fullName: "",
    }}
    onSubmit={signUp}
  />
);

export default Page;