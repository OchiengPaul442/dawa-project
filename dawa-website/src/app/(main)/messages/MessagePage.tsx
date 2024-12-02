'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Fuse from 'fuse.js';
import {
  MessageSquare,
  Archive,
  AlertCircle,
  Plus,
  Search,
  PlusCircle,
} from 'lucide-react';
import Button from '@/components/common/Button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCard } from '@/components/messages/MessageCard';
import { MessageDialog } from '@/components/messages/MessageDialog';
import { MessageListSkeleton } from '@/components/messages/MessageSkeleton';
import {
  Message,
  FetchMessagesFunction,
  UpdateMessageFunction,
} from '@/types/message';

const fetchMessages: FetchMessagesFunction = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: '1',
      sender: {
        id: 'user1',
        name: 'Alice Johnson',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      content:
        "Hey, is the laptop still available? I'm interested in purchasing it if it's in good condition.",
      timestamp: '2023-06-10T14:30:00Z',
      isRead: false,
      isArchived: false,
      isSpam: false,
    },
    {
      id: '2',
      sender: {
        id: 'user2',
        name: 'Bob Smith',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      content:
        "I'm interested in the camera you posted. Can you provide more details about its specifications and overall condition?",
      timestamp: '2023-06-09T10:15:00Z',
      isRead: true,
      isArchived: false,
      isSpam: false,
    },
    {
      id: '3',
      sender: {
        id: 'user3',
        name: 'Charlie Brown',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      content:
        "Is the price negotiable for the bicycle? I'm looking for a good deal and I'm very interested in your listing.",
      timestamp: '2023-06-08T18:45:00Z',
      isRead: true,
      isArchived: false,
      isSpam: false,
    },
  ];
};

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
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquare className="h-8 w-8 text-primary_1" />
          Messages
        </h1>
        <div className="flex gap-4">
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
          <Link href="/post-ad">
            <Button icon={PlusCircle}>Post an Ad</Button>
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

function MessageList({
  messages,
  loading,
  selectedMessages,
  onSelect,
  onMessageClick,
}: {
  messages: Message[];
  loading: boolean;
  selectedMessages: string[];
  onSelect: (id: string) => void;
  onMessageClick: (message: Message) => void;
}) {
  if (loading) {
    return <MessageListSkeleton count={5} />;
  }

  if (messages.length === 0) {
    return (
      <EmptyState
        title="No messages yet"
        description="Start a conversation about items you're interested in"
        icon={<MessageSquare className="h-16 w-16 text-gray-400" />}
      />
    );
  }

  return (
    <ul className="space-y-4">
      {messages.map((message) => (
        <li key={message.id}>
          <MessageCard
            message={message}
            isSelected={selectedMessages.includes(message.id)}
            onSelect={onSelect}
            onClick={onMessageClick}
          />
        </li>
      ))}
    </ul>
  );
}

function EmptyState({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="text-center flex justify-center items-center flex-col py-12 bg-gray-50 rounded-lg">
      <div className="inline-block mb-4">{icon}</div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link href="/browse">
        <Button icon={Plus}>Find Things to Discuss</Button>
      </Link>
    </div>
  );
}
