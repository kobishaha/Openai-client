import React, { useState } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';

interface ChatInputProps {
  handleSubmit: (message: string) => void;
  handleFileUpload: () => void;
  handleVoiceInput: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ handleSubmit, handleFileUpload, handleVoiceInput }) => {
  const [message, setMessage] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      handleSubmit(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-gray-800 p-4 flex items-center">
      <button
        type="button"
        onClick={handleFileUpload}
        className="text-gray-400 hover:text-white mr-2"
      >
        <Paperclip size={20} />
      </button>
      <button
        type="button"
        onClick={handleVoiceInput}
        className="text-gray-400 hover:text-white mr-2"
      >
        <Mic size={20} />
      </button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow bg-gray-700 text-white rounded-l px-4 py-2 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-fuchsia-500 text-white rounded-r px-4 py-2 hover:bg-fuchsia-600 transition-colors"
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;