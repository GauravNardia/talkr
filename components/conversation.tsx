'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';



export function ConvAI() {
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



  // Cleanup on unmount
  // useEffect(() => {
  //   return () => {
  //     if (conversation) {
  //       conversation.endSession();
  //     }
  //   };
  // }, [conversation]);



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
    <div className={"flex justify-center items-center gap-x-4"}>
      <Card className={"rounded-3xl w-full border-none shadow-none"}>
        <CardContent>
          <CardHeader>
            <CardTitle className={"text-center"}>

            </CardTitle>
          </CardHeader>
          <div className={"flex flex-col gap-y-4 text-center"}>
            <div className='w-full flex justify-center items-center mt-20'>
            {/* <Image
              src="/assets/images/ai-avatar.png"
              alt="AI Avatar"
              width={65}
              height={54}
              className="object-cover"
              /> */}
            </div>
            <div
              className={cn(
                "orb my-16 mx-12",
                conversation.status === "connected" && conversation.isSpeaking
                  ? "orb-active animate-orb"
                  : conversation.status === "connected"
                  ? "animate-orb-slow orb-inactive"
                  : "orb-inactive"
              )}
            ></div>
{/* 
           <div className='flex gap-3'>
           <Button
              variant={"outline"}
              className={"rounded-full"}
              size={"lg"}
              disabled={
                conversation !== null && conversation.status === "connected"
              }
              onClick={startConversation}
            >
              Start conversation
            </Button>
            <Button
              variant={"outline"}
              className={"rounded-full"}
              size={"lg"}
              disabled={conversation === null}
              onClick={stopConversation}
            >
              End conversation
            </Button>
           </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}