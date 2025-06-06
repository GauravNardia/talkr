import React, { use } from 'react';
import {auth} from "@/auth";
import { redirect } from 'next/navigation';
import { getUserById } from '@/lib/actions/user';
import DashboardHome from '@/components/dashboard/Home';

const Home = async() => {
  const session = await auth();

  if (!session || !session.user?.id) {
    return null;
  }
  
  const user = await getUserById({ id: session?.user.id });


  if (!user) {
    return <div>User not found</div>;
  }
    
  return (
    <main className="w-full">
      {/* @ts-ignore */}
       <DashboardHome name={user.fullName} nativeLanguage={user.nativeLanguage} language={user.targetLanguage} streak={user.streakCount} longestStreak={user.longestStreak} />
    </main>
  );
};

export default Home;
