import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from '@/types/message';

interface MessageDialogProps {
  message: Message | null;
  onClose: () => void;
}

export function MessageDialog({ message, onClose }: MessageDialogProps) {
  if (!message) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Message from {message.sender.username}</DialogTitle>
          <DialogDescription>
            Sent on {format(new Date(message.created_at), 'MMM d, yyyy h:mm a')}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarImage src={''} alt={message.sender.username} />
              <AvatarFallback>
                {message.sender.username.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{message.sender.username}</h4>
              {/* <p className="text-sm text-gray-500">{message.sender.id}</p> */}
            </div>
          </div>
          <p className="text-sm text-gray-700">{message.message}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
