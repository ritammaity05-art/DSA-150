"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ZeroKnowledgeContextType {
  isZeroKnowledge: boolean;
  toggleZeroKnowledge: () => void;
}

const ZeroKnowledgeContext = createContext<ZeroKnowledgeContextType>({
  isZeroKnowledge: true,
  toggleZeroKnowledge: () => {},
});

export const ZeroKnowledgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isZeroKnowledge, setIsZeroKnowledge] = useState<boolean>(true);

  const toggleZeroKnowledge = () => {
    setIsZeroKnowledge((prev) => !prev);
  };

  return (
    <ZeroKnowledgeContext.Provider value={{ isZeroKnowledge, toggleZeroKnowledge }}>
      {children}
    </ZeroKnowledgeContext.Provider>
  );
};

export const useZeroKnowledge = () => useContext(ZeroKnowledgeContext);
