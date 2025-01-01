import { Notification } from '@/types/notifications';

export const fetchNotifications = async (): Promise<Notification[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: '1',
      type: 'message',
      title: 'New message from John Doe',
      description: "Hey, I'm interested in your product...",
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      type: 'system',
      title: 'System maintenance scheduled',
      description: 'The platform will be down for maintenance on...',
      time: '3 days ago',
      read: false,
    },
    {
      id: '3',
      type: 'classified',
      title: 'New Classified Ad Posted',
      description: 'A new classified ad has been posted in your category.',
      time: '1 day ago',
      read: true,
    },
    {
      id: '4',
      type: 'message',
      title: 'New message from Jane Smith',
      description: 'Thanks for the quick response...',
      time: '1 week ago',
      read: true,
    },
    {
      id: '5',
      type: 'classified',
      title: 'Your Classified Ad is Trending',
      description: 'Your ad has reached the trending section.',
      time: '2 weeks ago',
      read: false,
    },
  ];
};
