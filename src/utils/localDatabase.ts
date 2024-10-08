import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { handleError } from './errorHandler';
import { Conversation, Message, Settings } from '../types';

let db: IDBDatabase;

export const initDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ChatAppDB', 3);

    request.onerror = (event) => {
      console.error('Error opening database:', event);
      reject(new Error('Could not open database'));
    };

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('users')) {
        const userStore = db.createObjectStore('users', { keyPath: 'id' });
        userStore.createIndex('email', 'email', { unique: true });
      }
      if (!db.objectStoreNames.contains('conversations')) {
        db.createObjectStore('conversations', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('messages')) {
        const messageStore = db.createObjectStore('messages', { keyPath: 'id' });
        messageStore.createIndex('conversationId', 'conversationId', { unique: false });
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'userId' });
      }
    };
  });
};

export const registerUser = async (email: string, password: string) => {
  await initDatabase();
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['users'], 'readwrite');
    const store = transaction.objectStore('users');

    const request = store.add({ id, email, password: hashedPassword });

    request.onerror = () => {
      reject({ success: false, error: 'User already exists' });
    };

    request.onsuccess = () => {
      resolve({ success: true, userId: id });
    };
  });
};

export const loginUser = async (email: string, password: string) => {
  await initDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['users'], 'readonly');
    const store = transaction.objectStore('users');
    const emailIndex = store.index('email');

    const request = emailIndex.get(email);

    request.onerror = () => {
      reject({ success: false, error: 'An error occurred while logging in' });
    };

    request.onsuccess = async () => {
      const user = request.result;
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          resolve({ success: true, user: { id: user.id, email: user.email } });
        } else {
          resolve({ success: false, error: 'Invalid password' });
        }
      } else {
        resolve({ success: false, error: 'User not found' });
      }
    };
  });
};

// ... (rest of the file with other CRUD operations)

export const loadConversations = async (userId: string): Promise<Conversation[]> => {
  // Implementation
};

export const saveNewConversation = async (userId: string, conversation: Conversation) => {
  // Implementation
};

export const saveMessage = async (conversationId: string, message: Message) => {
  // Implementation
};

export const updateConversationTitle = async (conversationId: string, newTitle: string) => {
  // Implementation
};

export const deleteConversation = async (conversationId: string) => {
  // Implementation
};

export const saveSettings = async (userId: string, settings: Settings) => {
  // Implementation
};

export const loadSettings = async (userId: string): Promise<Settings | null> => {
  // Implementation
};