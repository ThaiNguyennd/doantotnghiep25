// ThemeContext.tsx
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useColorScheme, View } from 'react-native';

type ThemeMode = 'light' | 'dark';

interface ThemeContextProps {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  useEffect(() => {
    if (systemColorScheme === 'dark') {
      setThemeMode('dark');
    } else {
      setThemeMode('light');
    }
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setThemeMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {/* ✅ Bọc toàn app bằng View có className */}
      <View className={themeMode === 'dark' ? 'dark flex-1' : 'flex-1'}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
