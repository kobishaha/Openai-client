import initSqlJs from 'sql.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { Conversation, Message, Settings } from '../types';

let db: any;

export const initDatabase = async () => {
  if (db) return db;

  const SQL = await initSqlJs();
  db = new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      password_hash TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME
    );

    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      title TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      conversation_id TEXT,
      role TEXT,
      content TEXT,
      tokens INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (conversation_id) REFERENCES conversations (id)
    );

    CREATE TABLE IF NOT EXISTS settings (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE,
      api_key TEXT,
      selected_model TEXT,
      system_prompt TEXT,
      temperature REAL,
      max_tokens INTEGER,
      top_p REAL,
      frequency_penalty REAL,
      presence_penalty REAL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `);

  return db;
};

export const registerUser = async (username: string, email: string, password: string) => {
  await initDatabase();
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  try {
    db.run(
      'INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)',
      [id, username, email, hashedPassword]
    );
    return { success: true, userId: id };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, error: 'Username or email already exists' };
  }
};

export const loginUser = async (email: string, password: string) => {
  await initDatabase();
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  const result = stmt.getAsObject([email]);
  stmt.free();

  if (!result.id) {
    return { success: false, error: 'User not found' };
  }

  const isPasswordValid = await bcrypt.compare(password, result.password_hash);

  if (!isPasswordValid) {
    return { success: false, error: 'Invalid password' };
  }

  db.run('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [result.id]);

  return { success: true, user: { id: result.id, username: result.username, email: result.email } };
};

export const loadConversations = async (userId: string): Promise<Conversation[]> => {
  await initDatabase();
  const stmt = db.prepare(
    'SELECT * FROM conversations WHERE user_id = ? ORDER BY updated_at DESC'
  );
  const conversations = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    conversations.push(row);
  }
  stmt.free();

  return conversations.map((conv: any) => {
    const msgStmt = db.prepare('SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at');
    const messages = [];
    while (msgStmt.step()) {
      const msgRow = msgStmt.getAsObject();
      messages.push({
        id: msgRow.id,
        role: msgRow.role,
        content: msgRow.content,
        tokens: msgRow.tokens,
      });
    }
    msgStmt.free();
    return {
      ...conv,
      messages,
    };
  });
};

export const saveNewConversation = async (userId: string, conversation: Conversation) => {
  await initDatabase();
  db.run(
    'INSERT INTO conversations (id, user_id, title) VALUES (?, ?, ?)',
    [conversation.id, userId, conversation.title]
  );
};

export const saveMessage = async (conversationId: string, message: Message) => {
  await initDatabase();
  db.run(
    'INSERT INTO messages (id, conversation_id, role, content, tokens) VALUES (?, ?, ?, ?, ?)',
    [message.id, conversationId, message.role, message.content, message.tokens]
  );
};

export const updateConversationTitle = async (conversationId: string, newTitle: string) => {
  await initDatabase();
  db.run(
    'UPDATE conversations SET title = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [newTitle, conversationId]
  );
};

export const deleteConversation = async (conversationId: string) => {
  await initDatabase();
  db.run('DELETE FROM messages WHERE conversation_id = ?', [conversationId]);
  db.run('DELETE FROM conversations WHERE id = ?', [conversationId]);
};

export const saveSettings = async (userId: string, settings: Settings) => {
  await initDatabase();
  db.run(`
    INSERT OR REPLACE INTO settings 
    (id, user_id, api_key, selected_model, system_prompt, temperature, max_tokens, top_p, frequency_penalty, presence_penalty)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    uuidv4(), userId, settings.apiKey, settings.selectedModel, settings.systemPrompt,
    settings.temperature, settings.maxTokens, settings.topP, settings.frequencyPenalty, settings.presencePenalty
  ]);
};

export const loadSettings = async (userId: string): Promise<Settings | null> => {
  await initDatabase();
  const stmt = db.prepare('SELECT * FROM settings WHERE user_id = ?');
  const result = stmt.getAsObject([userId]);
  stmt.free();
  
  if (!result.id) return null;

  return {
    apiKey: result.api_key,
    selectedModel: result.selected_model,
    systemPrompt: result.system_prompt,
    temperature: result.temperature,
    maxTokens: result.max_tokens,
    topP: result.top_p,
    frequencyPenalty: result.frequency_penalty,
    presencePenalty: result.presence_penalty,
  };
};