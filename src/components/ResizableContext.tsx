import React, { createContext, useContext } from 'react';
import { ResizableContextValue } from '../types';
const ResizableContext = createContext<ResizableContextValue | null>(null);

export const useResizableContext = () => {
  const context = useContext(ResizableContext);
  if (!context) {
    throw new Error('useResizableContext must be used within a ResizableProvider');
  }
  return context;
};

export const ResizableProvider: React.FC<ResizableContextValue & { children: React.ReactNode }> = ({
  children,
  ...value
}) => {
  return <ResizableContext.Provider value={value}>{children}</ResizableContext.Provider>;
};
