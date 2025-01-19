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
  message: string;
  sender: {
    username: string;
  };
  created_at: string;
  message_read: boolean;
}

export interface Contact {
  id: string;
  name: string;
  image: string | null;
  price: number;
  lastMessage: string;
  unreadCount: number;
  timestamp: string;
}

export type FetchMessagesFunction = () => Promise<Message[]>;

export type UpdateMessageFunction = (
  id: string,
  updates: Partial<Message>,
) => Promise<Message>;

export interface SendMessagePayload {
  receiver_id: string;
  item_id: string;
  message: string;
}
