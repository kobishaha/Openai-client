import toast from 'react-hot-toast';

export const handleError = (error: any) => {
  console.error('An error occurred:', error);
  
  let errorMessage = 'An unexpected error occurred. Please try again.';
  
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else if (error && typeof error === 'object' && 'message' in error) {
    errorMessage = error.message as string;
  }

  showError(errorMessage);
};

export const showError = (message: string) => {
  toast.error(message, {
    duration: 5000,
    style: {
      background: '#333',
      color: '#fff',
    },
  });
};

export const showSuccess = (message: string) => {
  toast.success(message, {
    duration: 3000,
    style: {
      background: '#333',
      color: '#fff',
    },
  });
};