import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const InputPasswordComponent = ({
  password,
  setPassword,
  placeholder,
}: {
  password: string;
  setPassword: any;
  placeholder: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <Text className="text-gray-300  text-2xl mb-5 ">Mật khẩu</Text>
      <View
        className="flex-row items-center  rounded-md border border-zinc-700 px-3"
        style={{ padding: 5, borderColor: "#e5e7eb", borderWidth: 1 }}
      >
        <TextInput
          className="flex-1 text-white py-3"
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Feather name="eye" size={22} color="white" />
          ) : (
            <Feather name="eye-off" size={22} color="white" />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default InputPasswordComponent;
