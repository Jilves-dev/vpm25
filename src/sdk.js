import React, { createContext, useContext } from 'react';

const SdkContext = createContext(null);

export const SdkProvider = ({ children }) => {
  const sdk = {}; // Alusta SDK täällä

  return (
    <SdkContext.Provider value={sdk}>
      {children}
    </SdkContext.Provider>
  );
};

export const useSdk = () => {
  const context = useContext(SdkContext);
  if (context === null) {
    throw new Error('SDK not found. useSdk must be called from within a provider');
  }
  return context;
};