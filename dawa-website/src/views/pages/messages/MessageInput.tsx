import { useState } from 'react';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 border-t border-gray-100 bg-white">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-primary_1 focus:ring-1 focus:ring-primary_1"
        />
        <button
          type="submit"
          className="p-2 bg-primary_1 text-white rounded-full hover:bg-primary_1/90 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary_1 focus:ring-offset-2"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
