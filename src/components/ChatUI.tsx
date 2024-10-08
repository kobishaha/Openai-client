import React, { useState } from 'react';
import { MessageSquare, Settings, LogOut, Mic, Paperclip, Send } from 'lucide-react';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import SettingsPanel from './Settings';
import { Conversation, Message, Settings as SettingsType } from '../types';

interface ChatUIProps {
  user: any;
  conversations: Conversation[];
  currentConversationId: string | null;
  settings: SettingsType;
  models: { id: string; name: string }[];
  handleSettingChange: (setting: keyof SettingsType, value: string | number) => void;
  startNewConversation: () => void;
  switchConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  handleSubmit: (message: string) => void;
}

const ChatUI: React.FC<ChatUIProps> = ({
  user,
  conversations = [],
  currentConversationId,
  settings,
  models = [],
  handleSettingChange,
  startNewConversation,
  switchConversation,
  deleteConversation,
  handleSubmit,
}) => {
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  const handleFileUpload = () => {
    // TODO: Implement file upload logic
    console.log('File upload clicked');
  };

  const handleVoiceInput = () => {
    // TODO: Implement voice input logic
    console.log('Voice input clicked');
  };

  const currentConversation = conversations.find(conv => conv.id === currentConversationId) || null;

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-white">ChatGPT Clone</h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-white hover:text-fuchsia-500"
          >
            <Settings size={20} />
          </button>
        </div>
        <button
          onClick={startNewConversation}
          className="bg-fuchsia-500 text-white py-2 px-4 rounded mb-4 hover:bg-fuchsia-600 transition-colors"
        >
          New Chat
        </button>
        <div className="flex-grow overflow-y-auto">
          <ChatHistory
            conversations={conversations}
            currentConversationId={currentConversationId}
            switchConversation={switchConversation}
            deleteConversation={deleteConversation}
          />
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 text-white hover:text-fuchsia-500 flex items-center"
        >
          <LogOut size={20} className="mr-2" />
          Logout
        </button>
      </div>

      {/* Main chat area */}
      <div className="flex-grow flex flex-col">
        <div className="flex-grow overflow-y-auto p-4">
          {currentConversation && currentConversation.messages.map((msg, index) => (
            <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-fuchsia-500 text-white' : 'bg-gray-700 text-white'}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <ChatInput
          handleSubmit={handleSubmit}
          handleFileUpload={handleFileUpload}
          handleVoiceInput={handleVoiceInput}
        />
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="w-64 bg-gray-800 p-4">
          <SettingsPanel
            settings={settings}
            models={models}
            handleSettingChange={handleSettingChange}
          />
        </div>
      )}
    </div>
  );
};

export default ChatUI;