import { Message } from '@/types/message';
import { MessageCard } from './MessageCard';
import { MessageListSkeleton } from './MessageSkeleton';
import { EmptyState } from './EmptyState';
import { MessageSquare } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  loading?: boolean;
  selectedMessages: string[];
  onSelect: (id: string) => void;
  onMessageClick: (message: Message) => void;
}

export function MessageList({
  messages,
  loading,
  selectedMessages,
  onSelect,
  onMessageClick,
}: MessageListProps) {
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
