import { auth } from '@/auth'
import { getUserById } from '@/lib/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'

const Dashboard = async() => {
  const session = await auth();

  if (!session || !session.user?.id) {
    return null;
  }

  const user = await getUserById({ id: session.user.id });

  if (!user) {
    return <div>User not found</div>;
  }

  if (!user.onboarded) {
    redirect('/onboarding');
  } else {
    redirect('/app/home')
  }

  
  return (
    <div>
      {user?.onboarded!}
      Dashboard
      </div>
  )
}

export default Dashboard