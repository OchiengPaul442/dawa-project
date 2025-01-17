import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Message } from '@/types/message';

interface MessageCardProps {
  message: Message;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onClick: (message: Message) => void;
}

export function MessageCard({
  message,
  isSelected,
  onSelect,
  onClick,
}: MessageCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(message)}
    >
      <div className="flex items-center gap-4">
        {/* <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(message.id)}
          onClick={(e) => e.stopPropagation()}
        /> */}
        <Avatar>
          {/* Assuming sender has avatar and name properties */}
          <AvatarImage src={''} alt={message.sender.username} />
          <AvatarFallback>{message.sender.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold truncate">
              {message.sender.username}
            </h3>
            <time className="text-xs text-gray-500">
              {format(new Date(message.created_at), 'MMM d, h:mm a')}
            </time>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {message.message}
          </p>
        </div>
        {!message.message_read && (
          <span className="inline-block w-2 h-2 bg-primary_1 rounded-full flex-shrink-0"></span>
        )}
      </div>
    </div>
  );
}
