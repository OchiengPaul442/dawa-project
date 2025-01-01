'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Fuse from 'fuse.js';
import {
  MessageSquare,
  Archive,
  AlertCircle,
  PlusCircle,
  Search,
  MoreVertical,
} from 'lucide-react';
import Button from '@/components/shared/Button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageDialog } from './MessageDialog';
import { Message, UpdateMessageFunction } from '@/types/message';
import { MessageList } from './MessageList';
import { fetchMessages } from '@/data/messages';

const updateMessage: UpdateMessageFunction = async (id, updates) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { id, ...updates } as Message;
};

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [activeMessage, setActiveMessage] = useState<Message | null>(null);
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
  });
  const queryClient = useQueryClient();

  const updateMessageMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Message> }) =>
      updateMessage(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  const fuse = new Fuse(messages, {
    keys: ['sender.name', 'content'],
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

  const handleArchive = () => {
    selectedMessages.forEach((id) => {
      updateMessageMutation.mutate({ id, updates: { isArchived: true } });
    });
    setSelectedMessages([]);
  };

  const handleMarkAsSpam = () => {
    selectedMessages.forEach((id) => {
      updateMessageMutation.mutate({ id, updates: { isSpam: true } });
    });
    setSelectedMessages([]);
  };

  return (
    <div className="my-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquare className="h-8 w-8 text-primary_1" />
          Messages
        </h1>
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button icon={Archive} variant="outline" className="h-10">
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={handleArchive}
                  className="h-10 cursor-pointer"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archive selected
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleMarkAsSpam}
                  className="h-10 cursor-pointer"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Mark as spam
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link href="/post-ad" className="w-full sm:w-auto">
            <Button icon={PlusCircle} className="w-full sm:w-auto bg-gray-700">
              Post an Ad
            </Button>
          </Link>
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 px-2">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={handleArchive}
                  className="h-10 cursor-pointer"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archive selected
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleMarkAsSpam}
                  className="h-10 cursor-pointer"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Mark as spam
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
        <TabsList className="grid w-full grid-cols-3 mb-8 h-auto">
          <TabsTrigger value="all" className="h-10">
            All
          </TabsTrigger>
          <TabsTrigger value="unread" className="h-10">
            Unread
          </TabsTrigger>
          <TabsTrigger value="archived" className="h-10">
            Archived
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <MessageList
            messages={filteredMessages.filter(
              (m) => !m.isArchived && !m.isSpam,
            )}
            loading={isLoading}
            selectedMessages={selectedMessages}
            onSelect={handleSelect}
            onMessageClick={setActiveMessage}
          />
        </TabsContent>
        <TabsContent value="unread">
          <MessageList
            messages={filteredMessages.filter(
              (m) => !m.isRead && !m.isArchived && !m.isSpam,
            )}
            loading={isLoading}
            selectedMessages={selectedMessages}
            onSelect={handleSelect}
            onMessageClick={setActiveMessage}
          />
        </TabsContent>
        <TabsContent value="archived">
          <MessageList
            messages={filteredMessages.filter((m) => m.isArchived)}
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
