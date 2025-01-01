'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Bell,
  CheckCircle,
  MessageSquare,
  Settings,
  Trash2,
  ShoppingCart, // Icon for 'classified' notifications
} from 'lucide-react';

// Define the Notification type with 'message', 'classified', and 'system' types
interface Notification {
  id: number;
  type: 'message' | 'classified' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

// Initial notifications data containing 'message', 'classified', and 'system' types
const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'message',
    title: 'New message from John Doe',
    description: "Hey, I'm interested in your product...",
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'system',
    title: 'System maintenance scheduled',
    description: 'The platform will be down for maintenance on...',
    time: '3 days ago',
    read: false,
  },
  {
    id: 3,
    type: 'classified',
    title: 'New Classified Ad Posted',
    description: 'A new classified ad has been posted in your category.',
    time: '1 day ago',
    read: true,
  },
  {
    id: 4,
    type: 'message',
    title: 'New message from Jane Smith',
    description: 'Thanks for the quick response...',
    time: '1 week ago',
    read: true,
  },
  {
    id: 5,
    type: 'classified',
    title: 'Your Classified Ad is Trending',
    description: 'Your ad has reached the trending section.',
    time: '2 weeks ago',
    read: false,
  },
  // Add more notifications as needed
];

export default function NotificationsPage() {
  // State to manage notifications
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  // State to manage the current filter
  const [filter, setFilter] = useState<
    'all' | 'unread' | 'message' | 'classified' | 'system'
  >('all');

  // Filter notifications based on the selected filter
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  // Function to mark a notification as read
  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  // Function to delete a notification
  const deleteNotification = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id),
    );
  };

  // Function to get the appropriate icon based on notification type
  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'classified':
        return <ShoppingCart className="h-5 w-5 text-purple-500" />; // Icon for 'classified'
      case 'system':
        return <Settings className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 my-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Notifications</h2>
          <p className="text-gray-600">
            Stay updated with your latest activities
          </p>
        </div>
        {/* Filter Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilter('all')}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter('unread')}>
              Unread
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter('message')}>
              Messages
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter('classified')}>
              Classified
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter('system')}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Notifications Card */}
      <Card>
        <CardContent className="p-6">
          {filteredNotifications.length === 0 ? (
            // No Notifications Placeholder
            <div className="text-center py-8">
              <Bell className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                No notifications
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You&#39;re all caught up!
              </p>
            </div>
          ) : (
            // Notifications List
            <ul className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <li key={notification.id} className="py-4">
                  <div className="flex items-start space-x-4">
                    {/* Notification Icon */}
                    <div className="flex-shrink-0">
                      {getIcon(notification.type)}
                    </div>
                    {/* Notification Content */}
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                        {!notification.read && (
                          <Badge variant="secondary" className="ml-2">
                            New
                          </Badge>
                        )}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex-shrink-0 flex space-x-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCircle className="h-4 w-4 text-primary_1" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
