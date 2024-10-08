import React from 'react';
import { MessageSquare, Trash } from 'lucide-react';
import { Conversation } from '../types';

interface ChatHistoryProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  switchConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  conversations,
  currentConversationId,
  switchConversation,
  deleteConversation,
}) => {
  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={`flex items-center justify-between p-2 rounded cursor-pointer ${
            conversation.id === currentConversationId
              ? 'bg-fuchsia-800 text-white'
              : 'text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => switchConversation(conversation.id)}
        >
          <div className="flex items-center">
            <MessageSquare size={16} className="mr-2" />
            <span className="truncate">{conversation.title}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteConversation(conversation.id);
            }}
            className="text-gray-500 hover:text-red-500"
          >
            <Trash size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;