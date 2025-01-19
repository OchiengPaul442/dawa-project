'use client';

import { useEffect } from 'react';
import { ContactList } from './ContactList';
import { ChatArea } from './ChatArea';
import { selectChat, markAsRead } from '@redux-store/slices/chatApp/chatSlice';
import { useDispatch, useSelector } from '@/redux-store/hooks';

export default function ChatApp() {
  const dispatch = useDispatch();
  const { users, chats, currentUserId, selectedChatId } = useSelector(
    (state) => state.chat,
  ) as any;

  const selectedChat = chats.find((chat: any) => chat.id === selectedChatId);
  const contacts = users.filter((user: any) => user.id !== currentUserId);

  useEffect(() => {
    if (selectedChatId) {
      dispatch(markAsRead(selectedChatId));
    }
  }, [selectedChatId, dispatch]);

  const handleSelectContact = (userId: string) => {
    const chat = chats.find(
      (chat: any) =>
        chat.participants.includes(userId) &&
        chat.participants.includes(currentUserId),
    );
    if (chat) {
      dispatch(selectChat(chat.id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-6xl mx-auto h-[80vh] flex flex-col md:flex-row">
        <ContactList
          contacts={contacts}
          chats={chats}
          currentUserId={currentUserId}
          selectedContactId={
            selectedChat?.participants.find(
              (id: any) => id !== currentUserId,
            ) || null
          }
          onSelectContact={handleSelectContact}
        />
        <ChatArea
          chat={selectedChat}
          currentUserId={currentUserId}
          users={users}
        />
      </div>
    </div>
  );
}
