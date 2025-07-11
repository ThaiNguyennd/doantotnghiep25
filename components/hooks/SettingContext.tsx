import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type Setting = {
  fontSize: number;
  lineHeight: number;
  rate: number;
  pitch: number;
};

const defaultValue: Setting = {
  fontSize: 16, // mặc định tương đương text-base
  lineHeight: 24,
  rate: 1,
  pitch: 1,
};

const SettingContext = createContext<{
  font: Setting;
  setFont: (font: Setting) => void;
}>({
  font: defaultValue,
  setFont: () => {},
});

export const SettingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [font, setFontState] = useState<Setting>(defaultValue);

  const setFont = async (value: Setting) => {
    setFontState(value);
    await AsyncStorage.setItem("font-setting", JSON.stringify(value));
  };

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("font-setting");
      if (stored) {
        try {
          setFontState(JSON.parse(stored));
        } catch (e) {
          console.log("Lỗi parse font:", e);
        }
      }
    })();
  }, []);

  return (
    <SettingContext.Provider value={{ font, setFont }}>
      {children}
    </SettingContext.Provider>
  );
};

export const useSetting = () => useContext(SettingContext);
