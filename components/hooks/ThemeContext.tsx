// ThemeContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemTheme = useColorScheme(); // hệ thống
  const [theme, setThemeState] = useState<Theme>(systemTheme ?? "light");

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    await AsyncStorage.setItem("appTheme", newTheme);
  };

  const loadTheme = async () => {
    const saved = await AsyncStorage.getItem("appTheme");
    if (saved === "light" || saved === "dark") {
      setThemeState(saved);
    } else {
      setThemeState(systemTheme ?? "light");
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <View
        className={`flex-1 w-full ${theme === "dark" ? "bg-primary" : "bg-white"} h-full`}
      >
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
