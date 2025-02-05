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

const ChatContext = createContext<ChatContextType | undefined>(undefined);

/**
 * Returns true if both messages have the same sender, same item id,
 * and exactly the same trimmed message text.
 * This check is used for deduplication.
 */
const isSimilarMessage = (msg1: Message, msg2: Message): boolean => {
  return (
    msg1.senderId === msg2.senderId &&
    msg1.itemId === msg2.itemId &&
    msg1.message.trim() === msg2.message.trim()
  );
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State for the selected conversation/group
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  // State for optimistic messages (pending, error, or confirmed "sent")
  const [optimisticMessages, setOptimisticMessages] = useState<
    OptimisticMessage[]
  >([]);

  // Get logged-in user from the auth hook
  const { user, loading: authLoading } = useAuth() as {
    user: User | null;
    loading: boolean;
  };

  // Fetch messages via your SWR hook
  const { messagesData, isLoading: messagesLoading, mutate } = useMessages();
  // Use your SWR mutation hook to send messages
  const { sendMessage: sendMessageMutation } = useSendMessage();

  // Handler to set the active conversation
  const selectGroup = useCallback((groupId: string | number) => {
    setSelectedGroupId(groupId ? groupId.toString() : null);
  }, []);

  // Convert the API data to our internal format:
  // - Rename "created_at" to "createdAt"
  // - Force senderId and receiverId to numbers
  // - Attach the subject's item_id as itemId on each message
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

  // Helper: given a group, return the other participant (the one that is not the current user)
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
  // Instead of removing the optimistic message on success, we update its status to "sent".
  const sendMessage = useCallback(
    async (payload: SendMessagePayload) => {
      if (!user) return;

      // Determine the proper receiver:
      // If payload.receiver_id is missing or equals the logged-in user, derive from the selected group.
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

      // Final safety check: do not allow self-messaging.
      if (Number(finalReceiverId) === Number(user.id)) {
        console.error('You cannot send a message to yourself.');
        return;
      }

      // Create an optimistic message that appears immediately.
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

      // Add the optimistic message to state.
      setOptimisticMessages((prev) => [...prev, optimisticMessage]);

      try {
        // Send the message via your SWR mutation hook.
        await sendMessageMutation({ ...payload, receiver_id: finalReceiverId });
        // On success, update the optimistic message status to "sent"
        setOptimisticMessages((prev) =>
          prev.map((msg) =>
            msg.id === optimisticMessage.id ? { ...msg, status: 'sent' } : msg,
          ),
        );
        // Revalidate the messages data in the background.
        mutate();
      } catch (error) {
        // Mark the optimistic message as errored.
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

  // Merge optimistic messages with the fetched messages.
  // For each group, if a fetched message is a duplicate of a confirmed optimistic message,
  // omit the fetched one.
  const combinedMessageGroups: MessageGroup[] = useMemo(() => {
    if (!convertedGroups) return [];
    return convertedGroups.map((group: MessageGroup) => {
      // Get optimistic messages for this group.
      const optimisticForGroup = optimisticMessages.filter(
        (optim) => optim.itemId === group.subject.item_id,
      );
      // Filter fetched messages: if a confirmed optimistic message is duplicate, omit it.
      const dedupedFetched = group.messages.filter((fetchedMsg) => {
        return !optimisticForGroup.some(
          (optim) =>
            optim.status === 'sent' && isSimilarMessage(fetchedMsg, optim),
        );
      });
      // Merge the deduped fetched messages with all optimistic messages.
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

  // Sort groups so that the conversation with the most recent message appears first.
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

  // Compute a count of unread messages for the current user.
  const newMessagesCount = useMemo(() => {
    if (!user) return 0;
    let count = 0;
    sortedMessageGroups.forEach((group) => {
      group.messages.forEach((msg) => {
        // Consider messages unread if the current user is the receiver and read is false.
        if (Number(msg.receiverId) === Number(user.id) && !msg.read) {
          count++;
        }
      });
    });
    return count;
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
      newMessagesCount, // expose the unread messages count
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
