import ChatApp from '@/views/pages/messages/ChatApp';
import { ChatProvider } from '@/views/pages/messages/ChatContext';

const page = () => {
  return (
    <ChatProvider>
      <ChatApp />
    </ChatProvider>
  );
};

export default page;
