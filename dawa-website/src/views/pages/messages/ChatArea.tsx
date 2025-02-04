// src/views/pages/messages/ChatArea.tsx
'use client';

import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { format, isValid } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Check, AlertCircle } from 'lucide-react';
import type {
  Message,
  OptimisticMessage,
  User,
  MessageGroup,
} from '@/types/message';
import { useChat } from './ChatContext';
import { MessageInput } from './MessageInput';
import { EmptyState } from './EmptyState';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MessageItemProps {
  message: Message | OptimisticMessage;
  currentUser: User;
  otherUser: User;
}

/**
 * A single message bubble.
 * Right-aligned if currentUser is the sender;
 * left-aligned with an avatar if the otherUser is the sender.
 */
const MessageItem: React.FC<MessageItemProps> = React.memo(
  ({ message, currentUser, otherUser }) => {
    // Align right if the senderId matches the current user
    const isCurrentUserSender = message.senderId === currentUser.id;
    const isOptimistic = 'status' in message; // For the sending/error icons

    // Container alignment
    const containerClass = isCurrentUserSender
      ? 'justify-end'
      : 'justify-start';

    // If the current user is the sender, omit the avatar
    const showAvatar = !isCurrentUserSender;

    // For the left side messages, the avatar belongs to otherUser
    const avatarSrc = showAvatar ? otherUser.profile_picture : null;
    const avatarLetter = showAvatar ? otherUser.full_name?.[0] : null;

    // Format the date
    const messageDate = new Date(message.createdAt);
    const formattedTime = isValid(messageDate)
      ? format(messageDate, 'HH:mm')
      : '—';

    return (
      <div className={`flex ${containerClass} items-end mb-4`}>
        {/* Avatar on the left side only if not current user */}
        {showAvatar && (
          <div className="flex-shrink-0 mr-2">
            <Avatar className="h-6 w-6 rounded-full">
              {avatarSrc ? (
                <AvatarImage
                  src={avatarSrc}
                  alt={otherUser.full_name || 'User'}
                />
              ) : (
                <AvatarFallback className="bg-primary_1 text-white text-xs">
                  {avatarLetter?.toUpperCase() || '?'}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        )}

        <div
          className={`px-4 py-2 rounded-2xl max-w-[85%] ${
            isCurrentUserSender
              ? 'bg-primary_2 text-gray-900'
              : 'bg-gray-100 text-gray-900'
          } ${isOptimistic && message.status === 'sending' ? 'opacity-70' : ''}`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.message}
          </p>
          <div className="flex items-center justify-end gap-1">
            <p className="text-[10px] text-gray-500">{formattedTime}</p>
            {isOptimistic &&
              (message.status === 'sent' ? (
                <Check size={12} className="text-green-500" />
              ) : message.status === 'error' ? (
                <AlertCircle size={12} className="text-red-500" />
              ) : null)}
          </div>
        </div>
        {/* Optional spacing on the right if it's currentUser, to keep symmetrical */}
        {isCurrentUserSender && <div className="w-6 ml-2" />}
      </div>
    );
  },
);

MessageItem.displayName = 'MessageItem';

export function ChatArea() {
  const { messageGroups, selectedGroupId, currentUser, sendMessage } =
    useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Find the selected group by ID
  const selectedGroup: MessageGroup | undefined = useMemo(() => {
    return messageGroups.find(
      (group) => group.id.toString() === selectedGroupId,
    );
  }, [messageGroups, selectedGroupId]);

  // We assume exactly 2 participants; the 'other' one has an ID not equal to currentUser.id
  const otherUser: User | null = useMemo(() => {
    if (!currentUser || !selectedGroup) return null;
    if (selectedGroup.participants.length === 2) {
      return (
        selectedGroup.participants.find((p) => p.id !== currentUser.id) || null
      );
    }
    return null;
  }, [selectedGroup, currentUser]);

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, selectedGroup]);

  // Actually send the message: otherUser.id is the receiver.
  const handleSendMessage = useCallback(
    (content: string) => {
      if (content.trim() && selectedGroup && currentUser && otherUser) {
        sendMessage({
          receiver_id: otherUser.id, // Must be the other user’s ID
          item_id: selectedGroup.subject.item_id,
          message: content,
        });
        scrollToBottom();
      }
    },
    [sendMessage, selectedGroup, currentUser, otherUser, scrollToBottom],
  );

  // Various empty states or errors
  if (!selectedGroupId || !selectedGroup) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50/50">
        <EmptyState
          icon={MessageSquare}
          title="Your Messages"
          description="Select a chat to view your messages"
        />
      </div>
    );
  }

  if (!currentUser || !otherUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50/50">
        <EmptyState
          icon={MessageSquare}
          title="User Not Found"
          description="There was an error loading user info"
        />
      </div>
    );
  }

  if (!selectedGroup.messages.length) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50/50">
        <EmptyState
          icon={MessageSquare}
          title="No Messages"
          description="Start a conversation by sending a message"
        />
      </div>
    );
  }

  // Standard chat UI
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Top Bar: show the other user info */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center space-x-3">
        <Avatar className="h-9 w-9 rounded-full">
          {otherUser.profile_picture ? (
            <AvatarImage
              src={otherUser.profile_picture}
              alt={otherUser.full_name || 'User'}
            />
          ) : (
            <AvatarFallback className="bg-primary_1 text-white">
              {otherUser.full_name?.[0]?.toUpperCase() || '?'}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-gray-900 truncate">
            {otherUser.full_name || 'Unknown User'}
          </h2>
          <p className="text-xs text-gray-500 truncate">
            {selectedGroup.subject.item_name}
          </p>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-hidden" ref={scrollAreaRef}>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {selectedGroup.messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                currentUser={currentUser}
                otherUser={otherUser}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
