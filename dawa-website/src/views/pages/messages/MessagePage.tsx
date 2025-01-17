'use client';

import { useState } from 'react';
import Fuse from 'fuse.js';
import { MessageSquare, PlusCircle, Search } from 'lucide-react';
import Button from '@/components/shared/Button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageDialog } from './MessageDialog';
import { Message } from '@/types/message';
import { MessageList } from './MessageList';
import { useMessages } from '@core/hooks/useProductData';

export default function MessagesPage() {
  const { messagesData, isLoading, isError } = useMessages();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [activeMessage, setActiveMessage] = useState<Message | null>(null);

  // Flatten messages from items
  const messages: Message[] = messagesData
    ? messagesData.flatMap((item: any) => item.messages)
    : [];

  const fuse = new Fuse(messages, {
    keys: ['sender.username', 'message'],
    threshold: 0.3,
  });

  const filteredMessages = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : messages;

  const handleSelect = (id: string) => {
    setSelectedMessages((prev) =>
      prev.includes(id)
        ? prev.filter((messageId) => messageId !== id)
        : [...prev, id],
    );
  };

  if (isError) {
    return <div>Error loading messages.</div>;
  }

  return (
    <div className="my-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquare className="h-8 w-8 text-primary_1" />
          Messages
        </h1>
        <div className="flex gap-4 w-full sm:w-auto">
          <Link href="/post-ad" className="w-full sm:w-auto">
            <Button icon={PlusCircle} className="w-full sm:w-auto bg-gray-700">
              Post an Ad
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6 relative">
        <Input
          type="search"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-auto">
          <TabsTrigger value="all" className="h-10">
            All
          </TabsTrigger>
          <TabsTrigger value="unread" className="h-10">
            Unread
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <MessageList
            messages={filteredMessages}
            loading={isLoading}
            selectedMessages={selectedMessages}
            onSelect={handleSelect}
            onMessageClick={setActiveMessage}
          />
        </TabsContent>

        <TabsContent value="unread">
          <MessageList
            messages={filteredMessages.filter((m) => !m.message_read)}
            loading={isLoading}
            selectedMessages={selectedMessages}
            onSelect={handleSelect}
            onMessageClick={setActiveMessage}
          />
        </TabsContent>
      </Tabs>

      <MessageDialog
        message={activeMessage}
        onClose={() => setActiveMessage(null)}
      />
    </div>
  );
}
