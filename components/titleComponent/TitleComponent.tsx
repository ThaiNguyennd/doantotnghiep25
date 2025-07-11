import { useTheme } from "@/components/hooks/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const TitleComponent = ({
  titleText,
  onPess,
}: {
  titleText: string;
  onPess: any;
}) => {
    const { theme, setTheme } = useTheme();

  return (
    <View className="flex flex-row items-center justify-between px-3 mt-3" >
      <Text className={`${theme === "dark" ? "text-white" : "text-black"} font-bold text-xl`}>{titleText}</Text>
      <TouchableOpacity onPress={onPess}>
        <AntDesign name="doubleright" size={24} color={theme === "dark" ? "white" : "black"} />
      </TouchableOpacity>
    </View>
  );
};

export default TitleComponent;

const styles = StyleSheet.create({});
