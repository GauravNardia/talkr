'use client';

import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useConversation } from '@11labs/react';

interface StartLearningCardProps {
  title: string;
  iconSrc: string;
  cardTitle: string;
}

export const StartLearningCard: React.FC<StartLearningCardProps> = ({
  title,
  iconSrc,
  cardTitle,
}) => {
  const websocketRef = useRef<string | null>(null);
  const reconnectTimeoutRef = useRef<any>(null);
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
          user_name: 'Gaurav Nardia',
          native_language: 'hindi',
          target_language: 'english',
        },
      });

      websocketRef.current = conversationId;
      console.log('Reconnected with ID:', conversationId);
    } catch (error) {
      console.error('Reconnection failed:', error);
      reconnectTimeoutRef.current = setTimeout(handleReconnect, 5000);
    } finally {
      setIsReconnecting(false);
    }
  };

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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="bg-neutral-100 hover:bg-neutral-200 transition duration-500 cursor-pointer rounded-xl w-40 h-40 flex flex-col justify-center items-center text-center">
            <div className="w-full flex justify-center items-center">
              <Image src={iconSrc} width={65} height={35} alt="speaking icon" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-800 font-medium">{title}</div>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-full text-center flex flex-col justify-center items-center">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl w-full">{cardTitle}</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex flex-col justify-center items-center mt-8 mb-4">
          {conversation?.status === 'connected' && conversation?.isSpeaking && (
            <div className="bg-green-500 w-16 h-16 rounded-full animate-ping" />
          )}
          <div className="mt-6">
            {conversation?.status === 'connected'
              ? conversation?.isSpeaking
                ? `Agent is speaking`
                : 'Agent is listening'
              : 'Click start conversation button'}
          </div>
        </div>

        <AlertDialogFooter className="w-full flex justify-center items-center gap-3 mt-5">
          <AlertDialogCancel
            disabled={conversation === null}
            onClick={stopConversation}
            className="border border-red-500 hover:bg-red-100 hover:text-red-500 text-red-500 text-md w-40 rounded-full py-2"
          >
            Stop conversation
          </AlertDialogCancel>
          <Button
            onClick={startConversation}
            disabled={conversation !== null && conversation.status === 'connected'}
            className="bg-green-500 hover:bg-green-600 text-white text-md w-40 rounded-full py-2"
          >
            Start Conversation
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
