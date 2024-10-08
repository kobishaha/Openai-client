import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, LogIn, UserPlus } from 'lucide-react';
import { handleError, showSuccess, showError } from '../utils/errorHandler';
import { registerUser, loginUser } from '../utils/localDatabase';

interface AuthProps {
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const Auth: React.FC<AuthProps> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const result = await registerUser(email, password);
        if (result.success) {
          showSuccess('Registration successful! Please log in.');
          setIsSignUp(false);
        } else {
          showError(result.error || 'Registration failed');
        }
      } else {
        const result = await loginUser(email, password);
        if (result.success) {
          showSuccess('Login successful!');
          localStorage.setItem('user', JSON.stringify(result.user));
          setUser(result.user);
          navigate('/');
        } else {
          showError(result.error || 'Login failed');
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </h2>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isSignUp ? <UserPlus className="inline-block mr-2" size={16} /> : <LogIn className="inline-block mr-2" size={16} />}
              {isSignUp ? 'Sign Up' : 'Log In'}
            </button>
          </div>
          <div className="text-center mt-4">
            <button
              className="text-fuchsia-500 hover:text-fuchsia-700"
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;