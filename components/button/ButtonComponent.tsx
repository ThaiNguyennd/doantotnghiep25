import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ButtonComponent = ({ text, onPress }: { text: string; onPress: any }) => {
  return (
    <TouchableOpacity
      className="bg-blue-600 rounded-md py-3"
      onPress={onPress}
    >
      <Text className="text-center text-white font-semibold text-base">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({});
