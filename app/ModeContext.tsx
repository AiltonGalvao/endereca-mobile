import React, { createContext, useState, useEffect, SetStateAction, Dispatch } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ModeContext {
  isOffline: boolean;
  setIsOffline: Dispatch<SetStateAction<boolean>>;
}

export const ModeContext = createContext<ModeContext>({
  isOffline: false,
  setIsOffline: () => {},
});

export const ModeProvider = ({ children }: any) => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const loadMode = async () => {
      const storedMode = await AsyncStorage.getItem('isOffline');
      if (storedMode !== null) {
        setIsOffline(JSON.parse(storedMode));
      }
    };

    loadMode();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('isOffline', JSON.stringify(isOffline));
  }, [isOffline]);

  return (
    <ModeContext.Provider value={{ isOffline, setIsOffline }}>
      {children}
    </ModeContext.Provider>
  );
};
