import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare } from 'lucide-react';
import type { Chat, User } from '@/data/chat';
import { sendMessage } from '@redux-store/slices/chatApp/chatSlice';
import { MessageInput } from './MessageInput';
import { EmptyState } from './EmptyState';

interface ChatAreaProps {
  chat: Chat | undefined;
  currentUserId: string;
  users: User[];
}

export function ChatArea({ chat, currentUserId, users }: ChatAreaProps) {
  const dispatch = useDispatch();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chat?.messages]);

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50/50">
        <EmptyState
          icon={MessageSquare}
          title="Your Messages"
          description="Select a conversation to start messaging"
        />
      </div>
    );
  }

  const otherUser = users.find(
    (user) => user.id !== currentUserId && chat.participants.includes(user.id),
  );

  const handleSendMessage = (content: string) => {
    if (otherUser) {
      dispatch(sendMessage({ content, receiverId: otherUser.id }));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center space-x-3">
        <Avatar className="h-9 w-9 rounded-full">
          <AvatarImage
            src={otherUser?.avatar || '/placeholder.svg'}
            alt={otherUser?.name}
          />
          <AvatarFallback className="bg-primary_1 text-white">
            {otherUser?.name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-gray-900 truncate">
            {otherUser?.name}
          </h2>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-3">
          {chat.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-2 rounded-2xl ${
                  message.senderId === currentUserId
                    ? 'bg-primary_1 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    message.senderId === currentUserId
                      ? 'text-white/70'
                      : 'text-gray-500'
                  }`}
                >
                  {format(new Date(message.timestamp), 'HH:mm')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
