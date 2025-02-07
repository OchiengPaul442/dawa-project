'use client';

import React from 'react';
import { ChatProvider, useChat } from './ChatContext';
import { ContactList } from './ContactList';
import { ChatArea } from './ChatArea';
import { Card, CardContent } from '@/components/ui/card';
import Loader from '@/components/Loader';

function ChatAppContent() {
  const {
    messageGroups,
    selectedGroupId,
    currentUser,
    selectGroup,
    isLoading,
  } = useChat();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader />
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

export default function ChatApp() {
  return (
    <ChatProvider>
      <ChatAppContent />
    </ChatProvider>
  );
}
