import React, { createContext, useContext, useEffect } from 'react';
import { useAppStore } from './index';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const initialize = useAppStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppProvider;