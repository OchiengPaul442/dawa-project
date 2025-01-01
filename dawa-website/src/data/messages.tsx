import { FetchMessagesFunction } from '@/types/message';

export const fetchMessages: FetchMessagesFunction = async () => {
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
