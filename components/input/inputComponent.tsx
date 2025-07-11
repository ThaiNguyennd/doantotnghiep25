import { useTheme } from "@/components/hooks/ThemeContext";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const InputComponent = ({
  text,
  setText,
  placeholder,
  error,
  title
}: {
  text: any;
  setText: any;
  placeholder: string;
  error: string;
  title: string
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <View className="w-full">
      <Text
        className={` ${theme === "light" ? "text-black" : "text-white"}  text-xl mb-5`}
      >
        {title}
      </Text>
      <View
        className=" p-3 rounded-md"
        style={{ padding: 5, borderColor: "#e5e7eb", borderWidth: 1 }}
      >
        <TextInput
          className={` ${theme === "light" ? "text-black" : "text-white"}  py-3 rounded`}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
          keyboardType="email-address"
        />
      </View>
      <Text className={`text-lg text-red-500`}>{error}</Text>
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({});
