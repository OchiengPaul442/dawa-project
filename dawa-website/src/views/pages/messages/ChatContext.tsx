// ChatContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMessages, useSendMessage } from '@core/hooks/useProductData';
import { useAuth } from '@core/hooks/use-auth';
import type {
  Message,
  MessageGroup,
  User,
  SendMessagePayload,
  OptimisticMessage,
  ChatContextType,
} from '@/types/message';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [optimisticMessages, setOptimisticMessages] = useState<
    OptimisticMessage[]
  >([]);
  const { user, loading: authLoading } = useAuth() as {
    user: User | null;
    loading: boolean;
  };
  const { messagesData, isLoading: messagesLoading, mutate } = useMessages();
  const { sendMessage: sendMessageMutation } = useSendMessage();

  const selectItem = useCallback((itemId: string | number) => {
    setSelectedItemId(itemId ? itemId.toString() : null);
  }, []);

  const sendMessage = useCallback(
    async (payload: SendMessagePayload) => {
      if (!user) return;

      const optimisticMessage: OptimisticMessage = {
        id: uuidv4(),
        item: { id: payload.item_id, name: '', price: 0 },
        sender: user,
        receiver: { id: payload.receiver_id, username: '' },
        message: payload.message,
        message_read: false,
        created_at: new Date().toISOString(),
        status: 'sending',
      };

      setOptimisticMessages((prev) => [...prev, optimisticMessage]);

      try {
        await sendMessageMutation(payload);
        setOptimisticMessages((prev) =>
          prev.map((msg) =>
            msg.id === optimisticMessage.id ? { ...msg, status: 'sent' } : msg,
          ),
        );
        mutate(); // Refresh messages
      } catch (error) {
        setOptimisticMessages((prev) =>
          prev.map((msg) =>
            msg.id === optimisticMessage.id ? { ...msg, status: 'error' } : msg,
          ),
        );
        console.error('Failed to send message:', error);
      }
    },
    [user, sendMessageMutation, mutate],
  );

  // (Optional) Real-time update: for example, poll every 5 seconds.
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     mutate();
  //   }, 5000);
  //   return () => clearInterval(intervalId);
  // }, [mutate]);

  const combinedMessageGroups = useMemo(() => {
    if (!messagesData) return [];
    return messagesData.map((group: MessageGroup) => {
      const optimisticForGroup = optimisticMessages.filter(
        (msg) => msg.item.id.toString() === group.item_id.toString(),
      );
      const updatedMessages = [...group.messages, ...optimisticForGroup].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
      return { ...group, messages: updatedMessages };
    });
  }, [messagesData, optimisticMessages]);

  const contextValue = useMemo(
    () => ({
      messageGroups: combinedMessageGroups,
      selectedItemId,
      currentUser: user,
      selectItem,
      sendMessage,
      isLoading: authLoading || messagesLoading,
      isAuthenticated: !!user,
    }),
    [
      combinedMessageGroups,
      selectedItemId,
      user,
      selectItem,
      sendMessage,
      authLoading,
      messagesLoading,
    ],
  );

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
