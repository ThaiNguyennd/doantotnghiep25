import ButtonComponent from "@/components/button/ButtonComponent";
import { useTheme } from "@/components/hooks/ThemeContext";

import { useUser } from "@/components/hooks/userContext";
import InputComponent from "@/components/input/inputComponent";
import InputPasswordComponent from "@/components/input/InputPasswordComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const { setUser } = useUser();
  const { theme, setTheme } = useTheme();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://10.0.2.2:3001/auth/login",
        {
          username: email,
          password: password,
        }
      );
      if (response.status === 201) {
        const { access_token, user } = response.data.data;
        // ✅ Lưu vào localStorage
        await AsyncStorage.setItem("token", access_token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        await AsyncStorage.setItem("idUser", user._id);
        setUser(user);
        alert("bạn đã đăng nhập thành công");
        router.push("/(tabs)/profile");
      }
    } catch (err) {
      console.error("❌ Lỗi khi đăng nhập:", err);
      //   setError("Tài khoản hoặc mật khẩu không đúng");
    }
  };

  return (
    <View
      className={`flex-1 w-full ${theme === "dark" ? "bg-primary" : "bg-white"} h-full`}
    >
      <View className="w-full flex-1 rounded-xl p-6 shadow-lg px-5">
        {/* Close icon góc phải */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-4 right-4"
        >
          <Text
            className={`${theme === "dark" ? "text-white" : "text-black"} text-xl`}
          >
            ✕
          </Text>
        </TouchableOpacity>
        <View className="items-center">
          <Text
            className={`${theme === "dark" ? "text-white" : "text-black"} text-3xl font-semibold mb-6 mt-10 `}
          >
            Đăng Nhập
          </Text>
        </View>

        {/* Email input */}
        <View className="mb-4">
          <InputComponent
          title="Email"
            error={errEmail}
            text={email}
            setText={setEmail}
            placeholder="Email"
          ></InputComponent>
        </View>

        {/* Password input */}
        <View className="mb-6 mt-5">
          <InputPasswordComponent
            rePassword={false}
            placeholder="Mật khẩu"
            password={password}
            setPassword={setPassword}
          ></InputPasswordComponent>
        </View>

        <View className="mb-4 mt-10">
          <ButtonComponent
            onPress={() => {
              handleLogin();
            }}
            text="Đăng nhập"
          ></ButtonComponent>
        </View>

        {/* Đăng ký */}
        <Text className="text-gray-400 text-center">
          Chưa có tài khoản?{" "}
          <Text
            className="text-blue-400"
            onPress={() => router.push("/register")}
          >
            Đăng ký
          </Text>
        </Text>
      </View>
    </View>
  );
}
