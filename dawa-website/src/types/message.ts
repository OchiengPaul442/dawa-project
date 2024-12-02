export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Message {
  id: string;
  sender: User;
  content: string;
  timestamp: string;
  isRead: boolean;
  isArchived: boolean;
  isSpam: boolean;
}

export type FetchMessagesFunction = () => Promise<Message[]>;

export type UpdateMessageFunction = (
  id: string,
  updates: Partial<Message>,
) => Promise<Message>;
