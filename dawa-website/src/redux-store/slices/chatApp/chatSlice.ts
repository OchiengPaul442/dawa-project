import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fakeDb, type User, type Chat, type Message } from '@/data/chat';

interface ChatState {
  users: User[];
  chats: Chat[];
  currentUserId: string;
  selectedChatId: string | null;
}

const initialState: ChatState = {
  users: fakeDb.users,
  chats: fakeDb.chats,
  currentUserId: fakeDb.currentUserId,
  selectedChatId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectChat: (state, action: PayloadAction<string>) => {
      state.selectedChatId = action.payload;
    },
    sendMessage: (
      state,
      action: PayloadAction<{ content: string; receiverId: string }>,
    ) => {
      const { content, receiverId } = action.payload;
      const chatId = state.chats.find(
        (chat) =>
          chat.participants.includes(state.currentUserId) &&
          chat.participants.includes(receiverId),
      )?.id;

      if (chatId) {
        const newMessage: Message = {
          id: Date.now().toString(),
          senderId: state.currentUserId,
          receiverId,
          content,
          timestamp: new Date().toISOString(),
          read: false,
        };

        const chatIndex = state.chats.findIndex((chat) => chat.id === chatId);
        state.chats[chatIndex].messages.push(newMessage);
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      const chat = state.chats.find((c) => c.id === chatId);
      if (chat) {
        chat.messages.forEach((message) => {
          if (message.receiverId === state.currentUserId) {
            message.read = true;
          }
        });
      }
    },
  },
});

export const { selectChat, sendMessage, markAsRead } = chatSlice.actions;
export default chatSlice.reducer;
