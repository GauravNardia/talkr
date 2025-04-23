'use client';

import React, { useCallback, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Brain, MessageCircle, Trophy } from 'lucide-react';
import { useConversation } from '@11labs/react';
import { dailyGoals, featuredUsers, icons } from '@/constants';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Streak from './Streak';
import Image from 'next/image';
import Link from 'next/link';
import RecentActivity from './RecentActivity';
import { capitalizeName } from '@/lib/utils';

interface Props {
  name: string;
  nativeLanguage: string;
  language: string;
  streak: number;
  longestStreak:number;

}

export default function DashboardHome({name, nativeLanguage, language, streak, longestStreak}: Props) {
  const websocketRef = useRef<string | null>(null);
  const reconnectTimeoutRef = useRef(null);
  const [isReconnecting, setIsReconnecting] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to agent');
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    },
    onDisconnect: (event: any) => {
      console.log('Disconnected from agent', event);
      if (event?.code === 1011) {
        handleReconnect();
      }
    },
    onError: (error) => {
      console.error('Conversation error:', error);
    },
    onMessage: (message) => {
      console.log('Received message:', message);
    },
  });

  const handleReconnect = async () => {
    try {
      setIsReconnecting(true);
      const response = await fetch('/api/signed-url');
      const data = await response.json();

      if (!data.signedUrl) throw new Error('No signed URL received');

      const conversationId = await conversation.startSession({
        signedUrl: data.signedUrl,
        dynamicVariables: {
          user_name: "gaurav",
          native_language: "hindi",
          target_language: "english",
        },
      });

      websocketRef.current = conversationId;
    } catch (error) {
      console.error('Reconnection failed:', error);
      // @ts-ignore
      reconnectTimeoutRef.current = setTimeout(handleReconnect, 5000);
    } finally {
      setIsReconnecting(false);
    }
  };

  const startConversation = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const response = await fetch('/api/signed-url');
      if (!response.ok) throw new Error('Failed to get signed URL');

      const data = await response.json();
      const conversationId = await conversation.startSession({
        signedUrl: data.signedUrl,
        dynamicVariables: {
          user_name: "gaurav",
          native_language: "hindi",
          target_language: "english",
        },
      });

      websocketRef.current = conversationId;
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error('Error starting conversation:', error);
      alert('Failed to start conversation. Check console for details.');
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    try {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      await conversation.endSession();
    } catch (error) {
      console.error('Error ending conversation:', error);
    }
  }, [conversation]);

  return (
<main className="min-h-screen w-full flex flex-col justify-center bg-neutral-950 text-white px-4 sm:px-6">
  <div className="mx-auto w-full space-y-10">
    
    {/* Welcome Section */}
    <div className="w-full flex flex-col sm:flex-row items-start justify-between gap-4 pt-5">
      <div className="w-full space-y-2 mt-5">
        <h1 className="text-4xl sm:text-4xl md:text-4xl font-bold leading-snug">
          Welcome to Talkr, <span className="text-green-600">{capitalizeName(name)}</span>
        </h1>
        <p className="text-md sm:text-base md:text-lg text-muted-foreground">
          Ready to continue your language learning journey?
        </p>
      </div>
    </div>

    {/* Main Learning Grid */}
    <div>
    <div className="w-full grid gap-6 grid-cols-1 lg:grid-cols-3">

      {/* Continue Learning Section */}
     <Card className="w-full col-span-1 lg:col-span-2 p-6 bg-neutral-900 border-none text-white">        
      <h2 className="mb-4 text-xl sm:text-2xl font-semibold">Continue Learning {language}</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {/* Speak With Partner */}
          <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button className="h-auto flex flex-col items-center text-center gap-2 p-6 bg-neutral-800 hover:bg-neutral-700 hover:cursor-pointer">
      <Image src="/assets/icons/waveform.svg" width={45} height={45} alt="wave" />
      <div className="p-3 text-center">
        <p className="text-xl sm:text-2xl font-semibold">Learn By Speaking</p>
        <p className="text-base text-muted-foreground">Learn with kizzi</p>
      </div>
    </Button>
  </AlertDialogTrigger>

  <AlertDialogContent className="w-full max-w-md bg-neutral-900 text-white rounded-2xl shadow-2xl border border-neutral-800 backdrop-blur-lg p-8 flex flex-col items-center justify-center space-y-6 text-center">
    <AlertDialogHeader className="w-full flex flex-col items-center text-center">
      <AlertDialogTitle className="text-2xl sm:text-3xl font-semibold font-dm-serif">Hey, I'm Kizzi</AlertDialogTitle>
    </AlertDialogHeader>

    <div className="flex flex-col items-center justify-center space-y-6">
      <Image
        src="/assets/gifs/voice.gif"
        width={200}
        height={200}
        alt="wave"
        className="mix-blend-screen select-none"
      />
      <div className="text-lg font-medium text-center">
        {conversation.status === "connected"
          ? conversation.isSpeaking
            ? "Kizzi is speaking"
            : "Kizzi is listening"
          : "Click to start"}
      </div>
    </div>

  <AlertDialogFooter className="w-full max-w-[100px] flex justify-center items-center p-3 text-center">
  {conversation.status === "connected" ? (
    <AlertDialogCancel
      disabled={conversation === null}
      onClick={stopConversation}
      className="w-20 h-20 flex justify-center items-center rounded-full bg-red-500 border border-red-500 hover:bg-red-600 hover:cursor-pointer transition"
    >
      <Image
        src="/assets/icons/hungup.svg"
        width={55}
        height={55}
        alt="hung-up"
      />
    </AlertDialogCancel>
  ) : (
    <Button
      onClick={startConversation}
      className="w-20 h-20 flex justify-center items-center rounded-full bg-green-500 hover:bg-green-600 hover:cursor-pointer transition"
    >
      <Image
        src="/assets/icons/call.svg"
        width={55}
        height={55}
        alt="call"
      />
    </Button>
  )}
</AlertDialogFooter>

  </AlertDialogContent>
          </AlertDialog>


          {/* Vocabulary Quiz */}
          <Link href="/app/practice" className="h-auto flex flex-col items-center text-center gap-2 p-6 bg-neutral-800 rounded-md hover:bg-neutral-700 hover:cursor-pointer">
            <Image 
            src='/assets/icons/chat.svg' 
            width={45} 
            height={45} 
            alt='wave' 
            />
                <div className='p-3'>
                  <p className="text-xl sm:text-2xl font-semibold">Vocabulary Quiz</p>
                  <p className="text-base text-muted-foreground">Test your knowledge</p>
                </div>
          </Link>
             </div>
      </Card>

      {/* Daily Streak */}
        <Streak streak={streak} longestStreak={longestStreak} />
    </div>
    </div>

    {/* Activity & Top Learners */}
     <RecentActivity/>

  </div>
</main>

  );
}
