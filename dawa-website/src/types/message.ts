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
