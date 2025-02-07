'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import type {
  MessageGroup,
  User,
  SendMessagePayload,
  OptimisticMessage,
  ChatContextType,
  Message,
} from '@/types/message';
import { useMessages, useSendMessage } from '@core/hooks/useProductData';
import { useAuth } from '@core/hooks/use-auth';

// Create a context to hold all chat-related state and logic.
const ChatContext = createContext<ChatContextType | undefined>(undefined);

/**
 * Returns true if both messages have the same sender, same item id,
 * and exactly the same trimmed message text.
 */
const isSimilarMessage = (msg1: Message, msg2: Message): boolean =>
  msg1.senderId === msg2.senderId &&
  msg1.itemId === msg2.itemId &&
  msg1.message.trim() === msg2.message.trim();

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [optimisticMessages, setOptimisticMessages] = useState<
    OptimisticMessage[]
  >([]);

  // Get the authenticated user.
  const { user, loading: authLoading } = useAuth() as {
    user: User | null;
    loading: boolean;
  };

  // Fetch messages from the API via SWR.
  const { messagesData, isLoading: messagesLoading, mutate } = useMessages();

  // SWR mutation hook to send messages.
  const { sendMessage: sendMessageMutation } = useSendMessage();

  // Handler to set the active conversation.
  const selectGroup = useCallback((groupId: string | number) => {
    setSelectedGroupId(groupId ? groupId.toString() : null);
  }, []);

  // Convert and normalize fetched messages.
  const convertedGroups: MessageGroup[] = useMemo(() => {
    if (!messagesData) return [];
    return messagesData.map((group: any) => ({
      ...group,
      messages: group.messages.map((msg: any) => ({
        ...msg,
        createdAt: msg.created_at,
        itemId: group.subject.item_id,
        senderId: Number(msg.senderId),
        receiverId: Number(msg.receiverId),
      })),
    }));
  }, [messagesData]);

  // Helper: Get the other participant in a conversation.
  const getOtherParticipant = useCallback(
    (group: MessageGroup): User | null => {
      if (!user) return null;
      return (
        group.participants.find((p) => Number(p.id) !== Number(user.id)) || null
      );
    },
    [user],
  );

  // Send a message with an optimistic update.
  const sendMessage = useCallback(
    async (payload: SendMessagePayload) => {
      if (!user) return;

      // Determine the proper receiver.
      let finalReceiverId = payload.receiver_id;
      if (!finalReceiverId || Number(finalReceiverId) === Number(user.id)) {
        const selectedGroup = convertedGroups.find(
          (group) => group.id.toString() === selectedGroupId,
        );
        if (selectedGroup) {
          const otherUser = getOtherParticipant(selectedGroup);
          if (otherUser) {
            finalReceiverId = Number(otherUser.id);
          } else {
            console.error('Other participant not found.');
            return;
          }
        } else {
          console.error('Selected group not found.');
          return;
        }
      }

      if (Number(finalReceiverId) === Number(user.id)) {
        console.error('Self-messaging is not allowed.');
        return;
      }

      // Create an optimistic message.
      const optimisticMessage: OptimisticMessage = {
        id: uuidv4(),
        itemId: payload.item_id,
        senderId: Number(user.id),
        receiverId: Number(finalReceiverId),
        message: payload.message,
        createdAt: new Date().toISOString(),
        read: false,
        status: 'sending',
      };

      // Add the optimistic message.
      setOptimisticMessages((prev) => [...prev, optimisticMessage]);

      try {
        // Trigger the API call.
        await sendMessageMutation({ ...payload, receiver_id: finalReceiverId });
        // Update optimistic message status to "sent" on success.
        setOptimisticMessages((prev) =>
          prev.map((msg) =>
            msg.id === optimisticMessage.id ? { ...msg, status: 'sent' } : msg,
          ),
        );
        // Revalidate messages in the background.
        mutate();
      } catch (error) {
        // Mark the message as errored.
        setOptimisticMessages((prev) =>
          prev.map((msg) =>
            msg.id === optimisticMessage.id ? { ...msg, status: 'error' } : msg,
          ),
        );
        console.error('Failed to send message:', error);
      }
    },
    [
      user,
      sendMessageMutation,
      mutate,
      convertedGroups,
      selectedGroupId,
      getOtherParticipant,
    ],
  );

  // Merge optimistic messages with fetched messages and deduplicate.
  const combinedMessageGroups: MessageGroup[] = useMemo(() => {
    return convertedGroups.map((group: MessageGroup) => {
      const optimisticForGroup = optimisticMessages.filter(
        (optim) => optim.itemId === group.subject.item_id,
      );
      const dedupedFetched = group.messages.filter(
        (fetchedMsg) =>
          !optimisticForGroup.some(
            (optim) =>
              optim.status === 'sent' && isSimilarMessage(fetchedMsg, optim),
          ),
      );
      const mergedMessages: Message[] = [
        ...dedupedFetched,
        ...optimisticForGroup,
      ].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      return { ...group, messages: mergedMessages };
    });
  }, [convertedGroups, optimisticMessages]);

  // Sort groups so that the conversation with the most recent message is first.
  const sortedMessageGroups = useMemo(() => {
    return combinedMessageGroups.slice().sort((a, b) => {
      const aLast = new Date(
        a.messages[a.messages.length - 1].createdAt,
      ).getTime();
      const bLast = new Date(
        b.messages[b.messages.length - 1].createdAt,
      ).getTime();
      return bLast - aLast;
    });
  }, [combinedMessageGroups]);

  // Compute unread messages count.
  const newMessagesCount = useMemo(() => {
    if (!user) return 0;
    return sortedMessageGroups.reduce((acc, group) => {
      const unread = group.messages.filter(
        (msg) => Number(msg.receiverId) === Number(user.id) && !msg.read,
      ).length;
      return acc + unread;
    }, 0);
  }, [sortedMessageGroups, user]);

  const contextValue: ChatContextType = useMemo(
    () => ({
      messageGroups: sortedMessageGroups,
      selectedGroupId,
      currentUser: user,
      selectGroup,
      sendMessage,
      isLoading: authLoading || messagesLoading,
      isAuthenticated: !!user,
      newMessagesCount,
    }),
    [
      sortedMessageGroups,
      selectedGroupId,
      user,
      selectGroup,
      sendMessage,
      authLoading,
      messagesLoading,
      newMessagesCount,
    ],
  );

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
