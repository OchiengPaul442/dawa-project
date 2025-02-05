// src/views/pages/messages/ChatApp.tsx
'use client';

import React from 'react';
import { useChat } from './ChatContext';
import { ContactList } from './ContactList';
import { ChatArea } from './ChatArea';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function ChatApp() {
  const {
    messageGroups,
    selectedGroupId,
    currentUser,
    selectGroup,
    isLoading,
    isAuthenticated,
  } = useChat();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-gray-500">Please sign in to access messages</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Loader2 className="w-8 h-8 text-primary_1 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-xl overflow-hidden max-w-7xl mx-auto h-[80vh] flex flex-col md:flex-row">
          <ContactList
            messageGroups={messageGroups}
            selectedGroupId={selectedGroupId}
            currentUser={currentUser}
            onSelectGroup={selectGroup}
          />
          <ChatArea />
        </div>
      </CardContent>
    </Card>
  );
}
