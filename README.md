# ChatGPT-like Frontend

A React-based frontend application that mimics the functionality of ChatGPT, allowing users to have conversations with an AI assistant powered by OpenAI's API.

## Features

- Chat interface with AI-powered responses
- Conversation history
- Voice input support
- File attachment capability
- Customizable AI model settings
- Responsive design
- User authentication (Google, GitHub, Email/Password)
- Admin functionality for database management

## Technology Stack

This project is built using modern web technologies and frameworks to ensure high performance, scalability, and maintainability. Here's an overview of the main technologies used:

### Frontend
- **React**: A JavaScript library for building user interfaces, providing a component-based architecture for efficient UI development.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, adding optional static typing and other features to enhance code quality and developer productivity.
- **Vite**: A build tool that provides a faster and leaner development experience for modern web projects, offering instant server start and optimized builds.

### Styling
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces, allowing for highly customizable and responsive designs with minimal CSS.

### State Management
- **React Hooks**: Utilized for managing component-level state and side effects, providing a more straightforward way to use state and other React features without writing a class.

### Authentication
- **Firebase Authentication**: Provides backend services and ready-made UI libraries to authenticate users, supporting multiple authentication methods including Google, GitHub, and email/password.

### Database
- **Firebase Firestore**: A flexible, scalable NoSQL cloud database to store and sync data in real-time, used for storing conversation history and user data.

### Icons
- **Lucide React**: A collection of simply beautiful open-source icons, providing a consistent and customizable icon set for the application.

### API Integration
- **Axios**: A promise-based HTTP client for making API requests to the OpenAI API and other services.

### Development Tools
- **ESLint**: A static code analysis tool for identifying problematic patterns in JavaScript code, ensuring code quality and consistency.
- **Prettier**: An opinionated code formatter that enforces a consistent style across the entire codebase.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- An OpenAI API key
- Firebase project credentials

## Installation and Setup

Follow these steps to get your development environment set up:

1. **Clone the repository**

   ```
   git clone https://github.com/yourusername/chatgpt-like-frontend.git
   cd chatgpt-like-frontend
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory of the project and add the following variables:

   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

   Replace the placeholder values with your actual OpenAI API key and Firebase configuration details.

4. **Firebase Setup**

   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Create a new project (or select an existing one)
   - In the project settings, add a new web app
   - Copy the configuration details provided and use them to fill in the `.env` file
   - Enable Authentication in the Firebase Console and set up the sign-in methods you want to use (Email/Password, Google, GitHub)
   - Set up Firestore Database in the Firebase Console

5. **Authentication Configuration**

   For Google Sign-In:
   - In the Google Cloud Console, add your app's domain to the authorized domains list in the OAuth consent screen settings.
   - Add your app's URL (including localhost for development) to the Authorized JavaScript origins in the Credentials section.

   For GitHub Sign-In:
   - Register a new OAuth application in your GitHub account settings
   - Set the Authorization callback URL to `https://<YOUR_AUTH_DOMAIN>/auth/github/callback`
   - Add the Client ID and Client Secret to your Firebase project's GitHub authentication settings

   CORS Configuration:
   - In the Firebase Console, go to Authentication > Settings > Authorized domains
   - Add your app's domain (including localhost for development)

6. **OpenAI API Setup**

   - Sign up for an account at [OpenAI](https://openai.com/)
   - Navigate to the API section and create a new API key
   - Copy this key and add it to your `.env` file

## Running the Application

To start the development server, run:

```
npm run dev
```

This will start the Vite development server. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal) to view the application.

## Building for Production

To create a production build, run:

```
npm run build
```

This will generate a `dist` directory with your compiled assets, ready for deployment.

## Deployment

You can deploy this application to various platforms. Here are a few options:

1. **Firebase Hosting**:
   - Install Firebase CLI: `npm install -g firebase-tools`
   - Login to Firebase: `firebase login`
   - Initialize your project: `firebase init`
   - Deploy: `firebase deploy`

2. **Vercel**:
   - Install Vercel CLI: `npm install -g vercel`
   - Run: `vercel`

3. **Netlify**:
   - Install Netlify CLI: `npm install -g netlify-cli`
   - Run: `netlify deploy`

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

If you encounter any problems or have any questions, please open an issue in the GitHub repository.