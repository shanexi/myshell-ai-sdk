import React, { createContext, useContext, ReactNode } from 'react';
import { Container, interfaces } from 'inversify';
type ContextType = {
  container: Container;
};

const InversifyContext = createContext<ContextType | null>(null);

interface InversifyProviderProps {
  children: ReactNode;
  container: Container;
}

export const InversifyProvider: React.FC<InversifyProviderProps> = ({
  children,
  container,
}) => {
  const value = {
    container,
  };

  return (
    <InversifyContext.Provider value={value}>
      {children}
    </InversifyContext.Provider>
  );
};

export function useInjection<T>(serviceId: interfaces.ServiceIdentifier<T>): T {
  const context = useContext(InversifyContext);
  if (!context) {
    throw new Error('Provider is not found');
  }
  return context.container.get(serviceId);
}
