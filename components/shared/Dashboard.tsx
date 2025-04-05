"use client"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useConversation } from '@11labs/react';
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const Dashboard = () => {
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
    <main className="min-h-screen bg-white px-8 py-6 text-black">
       <div className="mt-20">
         <Link href="/feedback" className="flex w-[250px] text-left text-regular border rounded-full px-5 py-2">
           Please give your feedback <ChevronRight/>
         </Link>
       </div>

       <div className="mt-18 w-full">
       <h1 className="text-2xl font-bold mt-2">Good evening</h1>
       <p className="text-md text-neutral-500 dark:text-neutral-300">Your agent is ready to teach you.</p>
        <div className="flex">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="w-full flex flex-col justify-center items-center">
                <div className="bg-neutral-100 hover:bg-neutral-200 transition duration-500 cursor-pointer rounded-xl w-40 h-40 flex flex-col justify-center items-center text-center">
                  <div className="w-ful flex justify-center items-center">
                    <Image src="/assets/icons/start-learning2.svg" width={65} height={35} alt="speaking icon" />
                  </div>
                </div>
                  <div className="mt-2 text-sm text-gray-800 font-medium">Start learning</div>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full text-center flex flex-col justify-center items-center">
               <AlertDialogHeader>
                 <AlertDialogTitle className="text-2xl w-full">Your speaking partner</AlertDialogTitle>
               </AlertDialogHeader>
                <div className="flex flex-col justify-center items-center mt-17 mb-8">
                   {conversation.status === "connected"
                   && conversation.isSpeaking ? <div className=" bg-green-500 w-17 h-17 rounded-full animate-ping "/>
                   : ''
                   }
                   <div className="absolute -mt-[130px] bg-green-500 w-17 h-17 rounded-full animate-none"/>
                  <div className="mt-27">
                  {conversation.status === "connected"
                ? conversation.isSpeaking
                  ? `Agent is speaking`
                  : "Agent is listening"
                : "Click start conversation button"}
                  </div>
                </div>
                <AlertDialogFooter className="w-full text-center flex justify-center items-center gap-3  mt-5">
                  <AlertDialogCancel 
                  disabled={conversation === null}
                  onClick={stopConversation}
                  className="border border-red-500 hover:bg-red-100 hover:text-red-500 text-red-500 text-md w-40 rounded-full p-5">
                    Stop conversation
                  </AlertDialogCancel>
                  <Button
                  onClick={startConversation}
                  disabled={
                    conversation !== null && conversation.status === "connected"
                  }
                  className="bg-green-500 hover:bg-green-600 text-white text-md w-40 rounded-full p-5">
                    Start Conversation
                  </Button>
                </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialog>

            <Link href="/app/excercise" className="flex flex-col justify-center items-center">
            <div className="bg-neutral-100 hover:bg-neutral-200 transition duration-500 cursor-pointer rounded-xl w-40 h-40 flex flex-col justify-center items-center text-center">
              <div className="w-ful flex justify-center items-center">
                <Image src="/assets/icons/exercise.svg" width={65} height={35} alt="speaking icon" />
              </div>
                </div>
                  <div className="mt-2 text-sm text-gray-800 font-medium">Start exercise</div>
            </Link>

          </div>
        </div>
       </div>


    </main>
  );
};
