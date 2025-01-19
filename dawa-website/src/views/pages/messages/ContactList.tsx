import { useState } from 'react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, X, Users, AlertCircle } from 'lucide-react';
import type { User, Chat } from '@/data/chat';
import { EmptyState } from './EmptyState';

interface ContactListProps {
  contacts: User[];
  chats: Chat[];
  currentUserId: string;
  selectedContactId: string | null;
  onSelectContact: (id: string) => void;
}

export function ContactList({
  contacts,
  chats,
  currentUserId,
  selectedContactId,
  onSelectContact,
}: ContactListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const getLastMessage = (contactId: string) => {
    const chat = chats.find(
      (chat) =>
        chat.participants.includes(contactId) &&
        chat.participants.includes(currentUserId),
    );
    return chat?.messages[chat.messages.length - 1];
  };

  const getUnreadCount = (contactId: string) => {
    const chat = chats.find(
      (chat) =>
        chat.participants.includes(contactId) &&
        chat.participants.includes(currentUserId),
    );
    return (
      chat?.messages.filter(
        (msg) => msg.receiverId === currentUserId && !msg.read,
      ).length || 0
    );
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full md:w-[350px] border-r border-gray-200 flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
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
        {contacts.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No contacts yet"
            description="Start a conversation or wait for incoming messages."
          />
        ) : filteredContacts.length === 0 ? (
          <EmptyState
            icon={AlertCircle}
            title="No results found"
            description="Try adjusting your search terms."
          />
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredContacts.map((contact) => {
              const lastMessage = getLastMessage(contact.id);
              const unreadCount = getUnreadCount(contact.id);
              return (
                <button
                  key={contact.id}
                  onClick={() => onSelectContact(contact.id)}
                  className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors duration-150 ${
                    selectedContactId === contact.id ? 'bg-primary_2/40' : ''
                  }`}
                >
                  <Avatar className="h-10 w-10 rounded-full flex-shrink-0">
                    <AvatarImage
                      src={contact.avatar || '/placeholder.svg'}
                      alt={contact.name}
                    />
                    <AvatarFallback className="bg-primary_1 text-white">
                      {contact.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {contact.name}
                      </h3>
                      {lastMessage && (
                        <span className="text-xs text-gray-500">
                          {format(new Date(lastMessage.timestamp), 'HH:mm')}
                        </span>
                      )}
                    </div>
                    {lastMessage && (
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {lastMessage.content}
                      </p>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-primary_1 text-white text-xs font-medium">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
