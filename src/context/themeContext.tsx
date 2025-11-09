// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '../themes/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeType = 'light' | 'dark';

interface ThemeContextProps {
  theme: typeof lightTheme;
  themeName: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeType>('light');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('@user_theme');
      if (saved === 'dark') setThemeName('dark');
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@user_theme', themeName);
  }, [themeName]);

  const toggleTheme = () => {
    setThemeName(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = themeName === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}
