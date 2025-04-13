
import { onboardingSchema } from '@/lib/validations'
import { auth } from '@/auth'
import OnboardingForm from '@/components/forms/OnboardingForm'
import { onboardingUser } from '@/lib/actions/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async () => {
    const session = await auth();
    if(!session) redirect('/sign-in');
    const email = JSON.parse(JSON.stringify(session.user?.email));
    const fullName = JSON.parse(JSON.stringify(session.user?.name));

    return(
        <OnboardingForm
        defaultValues={{
          email: email!,
          fullName: fullName!,
          nativeLanguage: "",
          targetLanguage: ""
        }}
      />
    )
}

export default Page