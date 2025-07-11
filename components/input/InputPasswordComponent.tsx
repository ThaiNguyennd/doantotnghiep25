import { useTheme } from "@/components/hooks/ThemeContext";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const InputPasswordComponent = ({
  password,
  setPassword,
  placeholder,
  rePassword,
}: {
  password: string;
  setPassword: any;
  placeholder: string;
  rePassword: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <View>
      <Text
        className={` ${theme === "dark" ? "text-gray-300" : "text-gray-600"}  text-xl mb-5`}
      >
        {rePassword ? "Nhập lại mật khẩu" : "Mật khẩu"}
      </Text>
      <View className="flex-row items-center  rounded-md border border-gray-300 relative ">
        <TextInput
          className={` ${theme === "dark" ? "text-white" : "text-black"}  py-3 w-full px-5`}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          className="absolute right-3"
        >
          {showPassword ? (
            <Feather name="eye" size={22}  color={theme === "dark" ? "white" : "black"} />
          ) : (
            <Feather name="eye-off" size={22}  color={theme === "dark" ? "white" : "black"} />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default InputPasswordComponent;
