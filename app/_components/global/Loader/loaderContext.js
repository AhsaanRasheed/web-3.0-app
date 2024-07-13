"use client"
import React, { createContext, useState, useContext } from 'react';

const LoaderContext = createContext();

export function useLoader() {
  return useContext(LoaderContext);
}

export function LoaderProvider({ children }) {
  const [loader, setLoader] = useState(false);

  const toggleLoader = (value) => {
    setLoader(value);
  };

  return (
    <LoaderContext.Provider value={{ loader, toggleLoader }}>
      {children}
    </LoaderContext.Provider>
  );
}
