'use client';

import React, { useState, useCallback } from 'react';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = React.memo(
  ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
          onSendMessage(message);
          setMessage('');
        }
      },
      [message, onSendMessage],
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
      },
      [],
    );

    return (
      <div className="p-4 border-t border-gray-100 bg-white">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary_1 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-2 bg-primary_1 text-white rounded-full hover:bg-primary_1/90 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary_1 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    );
  },
);

MessageInput.displayName = 'MessageInput';
