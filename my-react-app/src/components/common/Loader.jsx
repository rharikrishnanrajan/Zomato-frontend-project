import React from 'react';

export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <svg
        className="animate-spin text-zomato-red"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

export const LoadingScreen = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <Spinner size="xl" />
      <p className="mt-4 text-gray-600 text-lg">{message}</p>
    </div>
  );
};

export const PageLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
      <Spinner size="lg" />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};

export const InlineLoader = ({ size = 'md' }) => {
  return (
    <div className="flex items-center justify-center py-4">
      <Spinner size={size} />
    </div>
  );
};

const Loader = ({ type = 'spinner', size = 'md', message, className = '' }) => {
  switch (type) {
    case 'screen':
      return <LoadingScreen message={message} />;
    case 'page':
      return <PageLoader message={message} />;
    case 'inline':
      return <InlineLoader size={size} />;
    case 'spinner':
    default:
      return <Spinner size={size} className={className} />;
  }
};

export default Loader;
