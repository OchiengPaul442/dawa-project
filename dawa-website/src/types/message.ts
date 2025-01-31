export interface User {
  id: string;
  username: string;
}

export interface Item {
  id: string;
  name: string;
  price: number;
}

export interface Message {
  id: string;
  item: Item;
  sender: User;
  receiver: User;
  message: string;
  message_read: boolean;
  created_at: string;
}

export interface MessageGroup {
  item_id: string;
  item_name: string;
  item_price: number;
  messages: Message[];
}

export interface SendMessagePayload {
  receiver_id: string;
  item_id: string;
  message: string;
}

// Helper function to get the other user from a message
export const getOtherUser = (
  message: Message,
  currentUserId: string,
): User | null => {
  if (!message || !message.sender || !message.receiver) {
    return null;
  }
  return message.sender.id === currentUserId
    ? message.receiver
    : message.sender;
};

export interface OptimisticMessage extends Omit<Message, 'id'> {
  id: string;
  status: 'sending' | 'sent' | 'error';
}

export interface ChatContextType {
  messageGroups: MessageGroup[];
  selectedItemId: string | null;
  currentUser: User | null;
  selectItem: (itemId: string) => void;
  sendMessage: (payload: SendMessagePayload) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}
