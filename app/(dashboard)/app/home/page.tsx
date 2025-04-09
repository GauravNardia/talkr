"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Globe2, Languages, MessageCircle, Sparkles, Trophy } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useConversation } from '@11labs/react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const featuredUsers = [
  { name: "Sarah Chen", xp: 15000, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop" },
  { name: "Alex Kim", xp: 14200, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=96&h=96&fit=crop" },
  { name: "Maria Garcia", xp: 13800, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop" },
];

const dailyGoals = [
  { label: "Complete 3 speaking exercises", progress: 2, total: 3 },
  { label: "Learn 10 new words", progress: 8, total: 10 },
  { label: "Complete 1 quiz", progress: 1, total: 1 },
];

export default function Home() {
      const websocketRef = useRef<string | null>(null);
      const reconnectTimeoutRef = useRef(null);
      const [isReconnecting, setIsReconnecting] = useState(false);
  
    const handleReconnect = async () => {
      try {
        setIsReconnecting(true);
  
        const response = await fetch('/api/signed-url');
        const data = await response.json();
  
        if (!data.signedUrl) {
          throw new Error('No signed URL received');
        }
  
        const conversationId = await conversation.startSession({
          signedUrl: data.signedUrl,
          dynamicVariables: {
            user_name: 'Gaurav Nardia',
            native_language: 'hindi',
            target_language: 'english',
          },
  
        });
  
        websocketRef.current = conversationId;
        console.log('Reconnected successfully with ID:', conversationId);
  
      } catch (error) {
  
        console.error('Reconnection failed:', error);
        // Try to reconnect again after 5 seconds
        // @ts-ignore
        reconnectTimeoutRef.current = setTimeout(handleReconnect, 5000);
      } finally {
        setIsReconnecting(false);
      }
  
    };
  
    const conversation = useConversation({
      onConnect: () => {
        console.log('Connected to agent');
  
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
  
      },
  
      onDisconnect: (event:any) => {
      console.log('Disconnected from agent', event);
              // If disconnected with error 1011, attempt to reconnect
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
  
      const startConversation = useCallback(async () => {
        try {
          // Request microphone permission
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
          // Get signed URL
          const response = await fetch('/api/signed-url');
          if (!response.ok) {
            throw new Error('Failed to get signed URL');
          }
    
          const data = await response.json();
    
          // Start conversation
          const conversationId = await conversation.startSession({
            signedUrl: data.signedUrl,
            dynamicVariables: {
              user_name: 'Gaurav Nardia',
              native_language: 'hindi',
              target_language: 'english',
            },
    
          });
    
          websocketRef.current = conversationId;
          // Cleanup audio stream
          stream.getTracks().forEach(track => track.stop());
    
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
          console.log('Conversation ended');
    
        } catch (error) {
    
          console.error('Error ending conversation:', error);
    
        }
    
      }, [conversation]);
  return (
    <main className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Welcome to Talkr, <span className="text-green-500">Jane!</span></h1>
            <p className="text-muted-foreground">Ready to continue your language learning journey?</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="col-span-2 p-6 bg-neutral-900 border-none">
            <h2 className="mb-4 text-2xl font-semibold text-white">Continue Learning Spanish</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                 <Button className="h-auto flex-col gap-2 p-6 bg-neutral-800 hover:bg-neutral-700 cursor-pointer">
                  <MessageCircle className="h-8 w-8 text-green-500" />
                  <div className="text-center">
                   <p className="font-semibold">Learn By Speaking</p>
                   <p className="text-sm text-muted-foreground">Learn with María</p>
                  </div>
              </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-md bg-zinc-900 text-white rounded-2xl shadow-2xl border border-zinc-800 backdrop-blur-lg p-8 text-center flex flex-col justify-center items-center space-y-6">
                 <AlertDialogHeader>
                   <AlertDialogTitle className="text-3xl font-semibold text-white">Your Speaking Partner</AlertDialogTitle>
                 </AlertDialogHeader>

                   <div className="relative flex flex-col justify-center items-center space-y-6">
                     {conversation.status === "connected" && conversation.isSpeaking && (
                       <div className="absolute w-20 h-20 rounded-full bg-green-500 animate-ping opacity-75" />
                     )}
                     <div className="w-20 h-20 rounded-full bg-green-500 z-10" />
                     <div className="text-lg font-medium mt-4">
                       {conversation.status === "connected"
                         ? conversation.isSpeaking
                           ? `Agent is speaking`
                           : "Agent is listening"
                         : "Click the Start Conversation button"}
                     </div>
                   </div>
                   <AlertDialogFooter className="w-full flex justify-center items-center gap-4 pt-4">
                     <AlertDialogCancel
                       disabled={conversation === null}
                       onClick={stopConversation}
                       className="w-40 py-3 rounded-full cursor-pointer border border-red-500 text-red-500 hover:bg-red-600 hover:text-white transition-colors duration-200"
                     >
                       Stop Conversation
                     </AlertDialogCancel>
                     <Button
                       onClick={startConversation}
                       disabled={conversation !== null && conversation.status === "connected"}
                       className="w-40 py-3 rounded-full cursor-pointer bg-green-500 hover:bg-green-600 text-white transition-colors duration-200"
                     >
                       Start Conversation
                     </Button>
                   </AlertDialogFooter>
                 </AlertDialogContent>
              </AlertDialog>
              <Button className="h-auto flex-col gap-2 p-6 bg-neutral-800 hover:bg-neutral-700 cursor-pointer">
                <Brain className="h-8 w-8 text-green-500" />
                <div className="text-left">
                  <p className="font-semibold">Vocabulary Quiz</p>
                  <p className="text-sm text-muted-foreground">Test your knowledge</p>
                </div>
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-neutral-900 text-white border-none">
            <h2 className="mb-4 text-2xl font-semibold">Daily Goals</h2>
            <div className="space-y-4">
              {dailyGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{goal.label}</span>
                    <span className="text-muted-foreground">
                      {goal.progress}/{goal.total}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all"
                      style={{ width: `${(goal.progress / goal.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="col-span-2 p-6 bg-neutral-900 text-white border-none ">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Recent Activity</h2>
              <Button variant="ghost" className="transition hover:bg-green-500">View All</Button>
            </div>
            <div className="space-y-4">
              {[
                { icon: MessageCircle, text: "Completed Spanish conversation practice", time: "2 hours ago" },
                { icon: Trophy, text: "Earned 'Quick Learner' achievement", time: "5 hours ago" },
                { icon: Brain, text: "Scored 95% on Basic Phrases quiz", time: "Yesterday" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <activity.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.text}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-neutral-900 text-white border-none">
            <h2 className="mb-4 text-2xl font-semibold">Top Learners</h2>
            <div className="space-y-4">
              {featuredUsers.map((user, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.xp.toLocaleString()} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}