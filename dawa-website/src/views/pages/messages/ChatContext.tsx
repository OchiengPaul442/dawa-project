// src/views/pages/messages/ChatContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMessages, useSendMessage } from '@core/hooks/useProductData';
import { useAuth } from '@core/hooks/use-auth';
import type {
  MessageGroup,
  User,
  SendMessagePayload,
  OptimisticMessage,
  ChatContextType,
  Message,
} from '@/types/message';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [optimisticMessages, setOptimisticMessages] = useState<
    OptimisticMessage[]
  >([]);
  const { user, loading: authLoading } = useAuth() as {
    user: User | null;
    loading: boolean;
  };
  const { messagesData, isLoading: messagesLoading, mutate } = useMessages();
  const { sendMessage: sendMessageMutation } = useSendMessage();

  const selectGroup = useCallback((groupId: string | number) => {
    setSelectedGroupId(groupId ? groupId.toString() : null);
  }, []);

  // 1. Convert API data to internal form
  const convertedGroups: MessageGroup[] = useMemo(() => {
    if (!messagesData) return [];
    return messagesData.map((group: any) => ({
      ...group,
      messages: group.messages.map((msg: any) => ({
        ...msg,
        // rename created_at to createdAt
        createdAt: msg.created_at,
        // also store itemId for internal usage
        itemId: group.subject.item_id,
      })),
    }));
  }, [messagesData]);

  // 2. Send a message with optimistic updates
  const sendMessage = useCallback(
    async (payload: SendMessagePayload) => {
      if (!user) return;

      // The current user must be the sender
      const optimisticMessage: OptimisticMessage = {
        id: uuidv4(),
        itemId: payload.item_id,
        senderId: user.id,
        receiverId: payload.receiver_id,
        message: payload.message,
        createdAt: new Date().toISOString(),
        read: false,
        status: 'sending',
      };

      setOptimisticMessages((prev) => [...prev, optimisticMessage]);

      try {
        // Actually call the API
        await sendMessageMutation(payload);
        // Update the message’s status upon success
        setOptimisticMessages((prev) =>
          prev.map((msg) =>
            msg.id === optimisticMessage.id ? { ...msg, status: 'sent' } : msg,
          ),
        );
        // Refresh the data from the server
        mutate();
      } catch (error) {
        // Mark the message as error if sending fails
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

  // 3. Merge optimistic messages with real data
  const combinedMessageGroups: MessageGroup[] = useMemo(() => {
    if (!convertedGroups) return [];
    return convertedGroups.map((group: MessageGroup) => {
      // Filter optimistic messages that belong to this group’s item ID
      const optimisticForGroup = optimisticMessages.filter(
        (msg) => msg.itemId === group.subject.item_id,
      );
      const updatedMessages: Message[] = [
        ...group.messages,
        ...optimisticForGroup,
      ].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      return { ...group, messages: updatedMessages };
    });
  }, [convertedGroups, optimisticMessages]);

  const contextValue: ChatContextType = useMemo(
    () => ({
      messageGroups: combinedMessageGroups,
      selectedGroupId,
      currentUser: user,
      selectGroup,
      sendMessage,
      isLoading: authLoading || messagesLoading,
      isAuthenticated: !!user,
    }),
    [
      combinedMessageGroups,
      selectedGroupId,
      user,
      selectGroup,
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
