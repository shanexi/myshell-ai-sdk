import React, { createContext, useContext, ReactNode } from 'react';
import { Container, interfaces } from 'inversify';
import { RemarkableFactory } from '@myshell-run/common';

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

export function useRemarkable<T>(
  serviceId: interfaces.ServiceIdentifier<T>,
  id?: string,
): T {
  const context = useContext(InversifyContext);
  if (!context) {
    throw new Error('Provider is not found');
  }
  const factory = useInjection<RemarkableFactory>(RemarkableFactory);
  const model = factory(serviceId, id);
  return model as T;
}
