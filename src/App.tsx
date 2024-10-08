import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Auth from './components/Auth';
import ChatUI from './components/ChatUI';
import { Conversation, Message, Settings as SettingsType } from './types';
import { fetchModels, sendMessage } from './utils/api';
import { initDatabase, loadConversations, saveNewConversation, saveMessage, updateConversationTitle, deleteConversation, saveSettings, loadSettings } from './utils/localDatabase';
import { estimateTokens } from './utils/tokenEstimator';
import { v4 as uuidv4 } from 'uuid';
import { handleError, showError, showSuccess } from './utils/errorHandler';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [settings, setSettings] = useState<SettingsType>({
    apiKey: '',
    selectedModel: 'gpt-3.5-turbo',
    systemPrompt: 'You are a helpful assistant.',
    temperature: 0.7,
    maxTokens: 150,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  });
  const [models, setModels] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    initDatabase();
  }, []);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      const loadedConversations = await loadConversations(user.id);
      setConversations(loadedConversations);
      const loadedSettings = await loadSettings(user.id);
      if (loadedSettings) {
        setSettings(loadedSettings);
      }
      const fetchedModels = await fetchModels(settings.apiKey);
      setModels(fetchedModels);
    } catch (error) {
      handleError(error);
    }
  };

  const handleSettingChange = async (setting: keyof SettingsType, value: string | number) => {
    const newSettings = { ...settings, [setting]: value };
    setSettings(newSettings);
    try {
      await saveSettings(user.id, newSettings);
      showSuccess('Settings saved successfully');
    } catch (error) {
      handleError(error);
    }
  };

  const startNewConversation = async () => {
    const newConversation: Conversation = {
      id: uuidv4(),
      title: 'New Conversation',
      messages: [],
    };
    try {
      await saveNewConversation(user.id, newConversation);
      setConversations([...conversations, newConversation]);
      setCurrentConversationId(newConversation.id);
    } catch (error) {
      handleError(error);
    }
  };

  const switchConversation = (id: string) => {
    setCurrentConversationId(id);
  };

  const handleDeleteConversation = async (id: string) => {
    try {
      await deleteConversation(id);
      setConversations(conversations.filter(conv => conv.id !== id));
      if (currentConversationId === id) {
        setCurrentConversationId(null);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleSubmit = async (message: string) => {
    if (!currentConversationId) {
      showError('No active conversation. Please start a new one.');
      return;
    }

    const newMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: message,
      tokens: estimateTokens(message),
    };

    try {
      const updatedConversation = conversations.find(conv => conv.id === currentConversationId);
      if (!updatedConversation) {
        throw new Error('Conversation not found');
      }

      updatedConversation.messages.push(newMessage);
      await saveMessage(currentConversationId, newMessage);

      const response = await sendMessage(settings.apiKey, updatedConversation.messages, settings);
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response.content,
        tokens: estimateTokens(response.content),
      };

      updatedConversation.messages.push(assistantMessage);
      await saveMessage(currentConversationId, assistantMessage);

      setConversations([...conversations]);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Toaster position="bottom-left" />
        <Routes>
          <Route path="/auth" element={!user ? <Auth setUser={setUser} /> : <Navigate to="/" />} />
          <Route
            path="/"
            element={
              user ? (
                <ChatUI
                  user={user}
                  conversations={conversations}
                  currentConversationId={currentConversationId}
                  settings={settings}
                  models={models}
                  handleSettingChange={handleSettingChange}
                  startNewConversation={startNewConversation}
                  switchConversation={switchConversation}
                  deleteConversation={handleDeleteConversation}
                  handleSubmit={handleSubmit}
                />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;