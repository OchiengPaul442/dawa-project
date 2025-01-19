import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
}

const users: User[] = [
  { id: '1', name: 'John Doe', avatar: '/avatars/john.jpg' },
  { id: '2', name: 'Jane Smith', avatar: '/avatars/jane.jpg' },
  { id: '3', name: 'Alice Johnson', avatar: '/avatars/alice.jpg' },
  { id: '4', name: 'Bob Williams', avatar: '/avatars/bob.jpg' },
];

const chats: Chat[] = [
  {
    id: '1',
    participants: ['1', '2'],
    messages: [
      {
        id: uuidv4(),
        senderId: '2',
        receiverId: '1',
        content: 'Hey John, how are you?',
        timestamp: '2023-06-01T10:00:00Z',
        read: true,
      },
      {
        id: uuidv4(),
        senderId: '1',
        receiverId: '2',
        content: "Hi Jane! I'm doing great, thanks for asking. How about you?",
        timestamp: '2023-06-01T10:05:00Z',
        read: true,
      },
    ],
  },
  {
    id: '2',
    participants: ['1', '3'],
    messages: [
      {
        id: uuidv4(),
        senderId: '3',
        receiverId: '1',
        content: 'John, do you have the project report ready?',
        timestamp: '2023-06-02T09:00:00Z',
        read: false,
      },
    ],
  },
  {
    id: '3',
    participants: ['1', '4'],
    messages: [
      {
        id: uuidv4(),
        senderId: '1',
        receiverId: '4',
        content: "Bob, let's catch up for lunch tomorrow.",
        timestamp: '2023-06-03T11:00:00Z',
        read: true,
      },
      {
        id: uuidv4(),
        senderId: '4',
        receiverId: '1',
        content: 'Sounds good! How about 12:30 at the usual place?',
        timestamp: '2023-06-03T11:15:00Z',
        read: false,
      },
    ],
  },
];

export const fakeDb = {
  users,
  chats,
  currentUserId: '1',
};
