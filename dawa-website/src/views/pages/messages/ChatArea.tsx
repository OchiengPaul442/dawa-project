// ChatArea.tsx
'use client';

import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Check, AlertCircle } from 'lucide-react';
import type {
  User,
  Message,
  MessageGroup,
  OptimisticMessage,
} from '@/types/message';
import { useChat } from './ChatContext';
import { MessageInput } from './MessageInput';
import { EmptyState } from './EmptyState';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatAreaProps {
  selectedItemId: string | null;
  currentUser: User | null;
}

const MessageItem: React.FC<{
  message: Message | OptimisticMessage;
  currentUserId: string;
}> = React.memo(({ message, currentUserId }) => {
  const isCurrentUser =
    message.sender.id.toString() === currentUserId.toString();
  const isOptimistic = 'status' in message;
  const isSelfMessage =
    message.sender.id.toString() === message.receiver.id.toString();
  const showAvatar = !isCurrentUser && !isSelfMessage;

  return (
    <div
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} items-end mb-4`}
    >
      {showAvatar && (
        <div className="flex-shrink-0 mr-2">
          <Avatar className="h-6 w-6 rounded-full">
            <AvatarImage
              src={`/placeholder.svg?text=${message.sender.username?.[0] || '?'}`}
              alt={message.sender.username || 'User'}
            />
            <AvatarFallback className="bg-primary_1 text-white text-xs">
              {message.sender.username?.[0]?.toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      <div
        className={`px-4 py-2 rounded-2xl max-w-[85%] ${
          isCurrentUser
            ? 'bg-primary_2 text-gray-900'
            : 'bg-gray-100 text-gray-900'
        } ${isOptimistic && message.status === 'sending' ? 'opacity-70' : ''}`}
      >
        {isSelfMessage && (
          <p className="text-xs text-gray-500 mb-1">Note to self</p>
        )}
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.message}
        </p>
        <div className="flex items-center justify-end gap-1">
          <p className="text-[10px] text-gray-500">
            {format(new Date(message.created_at), 'HH:mm')}
          </p>
          {isOptimistic &&
            (message.status === 'sent' ? (
              <Check size={12} className="text-green-500" />
            ) : message.status === 'error' ? (
              <AlertCircle size={12} className="text-red-500" />
            ) : null)}
        </div>
      </div>
    </div>
  );
});

MessageItem.displayName = 'MessageItem';

export function ChatArea({ selectedItemId, currentUser }: ChatAreaProps) {
  const { messageGroups, sendMessage } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const selectedGroup = useMemo(() => {
    return messageGroups.find(
      (group) => group.item_id.toString() === selectedItemId,
    );
  }, [messageGroups, selectedItemId]);

  // Determine the other participant in the chat.
  const otherUser = useMemo(() => {
    if (!currentUser || !selectedGroup || !selectedGroup.messages.length)
      return null;
    const firstMessage = selectedGroup.messages[0];
    if (
      firstMessage.sender.id.toString() === firstMessage.receiver.id.toString()
    )
      return currentUser;
    return firstMessage.sender.id.toString() === currentUser.id.toString()
      ? firstMessage.receiver
      : firstMessage.sender;
  }, [selectedGroup, currentUser]);

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, selectedGroup]);

  const handleSendMessage = useCallback(
    (content: string) => {
      if (content.trim() && selectedItemId && currentUser && otherUser) {
        sendMessage({
          receiver_id: otherUser.id,
          item_id: selectedItemId,
          message: content,
        });
        scrollToBottom();
      }
    },
    [sendMessage, selectedItemId, currentUser, otherUser, scrollToBottom],
  );

  if (!selectedItemId || !selectedGroup) {
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
          description="There was an error loading the user information"
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

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center space-x-3">
        <Avatar className="h-9 w-9 rounded-full">
          <AvatarImage
            src={`/placeholder.svg?text=${otherUser.username?.[0] || '?'}`}
            alt={otherUser.username || 'User'}
          />
          <AvatarFallback className="bg-primary_1 text-white">
            {otherUser.username?.[0]?.toUpperCase() || '?'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-gray-900 truncate">
            {otherUser.id === currentUser.id
              ? 'Note to self'
              : otherUser.username || 'Unknown User'}
          </h2>
          <p className="text-xs text-gray-500 truncate">
            {selectedGroup.item_name}
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-hidden" ref={scrollAreaRef}>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {selectedGroup.messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                currentUserId={currentUser.id.toString()}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
