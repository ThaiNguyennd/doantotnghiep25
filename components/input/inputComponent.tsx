import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const InputComponent = ({
  text,
  setText,
  placeholder,
  error,
}: {
  text: string;
  setText: any;
  placeholder: string;
  error: string;
}) => {
  return (
    <View className="">
      <Text className="text-gray-300  text-2xl mb-5">Email</Text>
      <View
        className=" p-3 rounded-md"
        style={{ padding: 5, borderColor: "#e5e7eb", borderWidth: 1 }}
      >
        <TextInput
          className=" text-white  py-3 rounded"
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
