// ContactList.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, X, Users, AlertCircle } from 'lucide-react';
import type { MessageGroup, User } from '@/types/message';
import { EmptyState } from './EmptyState';
import { ChatSkeleton } from './chat-skeleton';
import { getOtherUser } from '@/types/message';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ContactListProps {
  messageGroups: MessageGroup[];
  selectedItemId: string | null;
  currentUser: User | null;
  onSelectItem: (itemId: string) => void;
  isLoading?: boolean;
}

const ContactItem: React.FC<{
  group: MessageGroup;
  currentUser: User;
  selectedItemId: string | null;
  onSelectItem: (itemId: string) => void;
}> = ({ group, currentUser, selectedItemId, onSelectItem }) => {
  if (!group.messages.length) return null;

  const lastMessage = group.messages[group.messages.length - 1];
  const otherUser = getOtherUser(lastMessage, currentUser.id);
  if (!otherUser) return null;

  const unreadCount = group.messages.filter(
    (msg) => msg.receiver.id === currentUser.id && !msg.message_read,
  ).length;

  return (
    <button
      onClick={() => onSelectItem(group.item_id.toString())}
      className={`w-full px-4 py-3 flex items-start space-x-3 hover:bg-gray-50 transition-colors duration-150 ${
        selectedItemId === group.item_id.toString() ? 'bg-primary_2/40' : ''
      }`}
    >
      <Avatar className="h-10 w-10 rounded-full flex-shrink-0">
        <AvatarImage
          src={`/placeholder.svg?text=${otherUser.username?.[0] || '?'}`}
          alt={otherUser.username || 'User'}
        />
        <AvatarFallback className="bg-primary_1 text-white">
          {otherUser.username?.[0]?.toUpperCase() || '?'}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-gray-900 truncate">
            {otherUser.username || 'Unknown User'}
          </p>
          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
            {format(new Date(lastMessage.created_at), 'HH:mm')}
          </span>
        </div>
        <p className="text-sm text-gray-600 truncate mt-0.5">
          {group.item_name}
        </p>
        <p className="text-sm text-gray-500 truncate mt-0.5">
          {lastMessage.message}
        </p>
      </div>
      {unreadCount > 0 && (
        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-primary_1 text-white text-xs font-medium">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

export function ContactList({
  messageGroups,
  selectedItemId,
  currentUser,
  onSelectItem,
  isLoading = false,
}: ContactListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const sortedAndFilteredGroups = useMemo(() => {
    if (!currentUser) return [];
    // Filter groups with at least one non-self message.
    const validGroups = messageGroups.filter((group) => {
      if (!group.messages.length) return false;
      return group.messages.some(
        (message) => message.sender.id !== message.receiver.id,
      );
    });

    // Create a unique conversation map (by other user and item).
    const uniqueConversations = new Map();
    validGroups.forEach((group) => {
      if (!group.messages.length) return;
      const otherUser = getOtherUser(group.messages[0], currentUser.id);
      if (otherUser && otherUser.id !== currentUser.id) {
        const key = `${otherUser.id}-${group.item_id}`;
        if (
          !uniqueConversations.has(key) ||
          new Date(group.messages[group.messages.length - 1].created_at) >
            new Date(
              uniqueConversations.get(key).messages[
                uniqueConversations.get(key).messages.length - 1
              ].created_at,
            )
        ) {
          uniqueConversations.set(key, group);
        }
      }
    });

    return Array.from(uniqueConversations.values())
      .filter((group) => {
        if (!group.messages.length) return false;
        const otherUser = getOtherUser(group.messages[0], currentUser.id);
        return (
          otherUser &&
          (group.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            otherUser.username
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.messages[a.messages.length - 1].created_at);
        const dateB = new Date(b.messages[b.messages.length - 1].created_at);
        return dateB.getTime() - dateA.getTime();
      });
  }, [messageGroups, searchQuery, currentUser]);

  if (!currentUser) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="Not Authenticated"
        description="Please sign in to view messages."
      />
    );
  }

  return (
    <div className="w-full md:w-[350px] border-r border-gray-200 flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary_1 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      <ScrollArea className="flex-1">
        {isLoading ? (
          <ChatSkeleton />
        ) : messageGroups.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No messages yet"
            description="Start a conversation about an item."
          />
        ) : sortedAndFilteredGroups.length === 0 ? (
          <EmptyState
            icon={AlertCircle}
            title="No results found"
            description="Try adjusting your search terms."
          />
        ) : (
          <div className="divide-y divide-gray-200">
            {sortedAndFilteredGroups.map((group) => (
              <ContactItem
                key={`${group.item_id}`}
                group={group}
                currentUser={currentUser}
                selectedItemId={selectedItemId}
                onSelectItem={onSelectItem}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
