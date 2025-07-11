import ButtonComponent from "@/components/button/ButtonComponent";
import { useTheme } from "@/components/hooks/ThemeContext";
import InputComponent from "@/components/input/inputComponent";
import InputPasswordComponent from "@/components/input/InputPasswordComponent";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const { theme, setTheme } = useTheme();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://10.0.2.2:3001/auth/register", {
        name: name,
        email: email,
        password: password,
      });
      if (response.status === 201) {
        alert("bạn đã đăng ký tài khoản thành công");
        router.push("/(tabs)/profile");
      }
    } catch (err) {
      console.error("❌ Lỗi khi đăng ký:", err);
      console.log(name,email, password)
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
            Đăng ký tài khoản
          </Text>
        </View>

        <View className="mb-4">
          <InputComponent
            title="Email"
            error=""
            text={email}
            setText={setEmail}
            placeholder="Email"
          ></InputComponent>
        </View>

        <View className="mb-4">
          <InputComponent
            title="Tên"
            error=""
            text={name}
            setText={setName}
            placeholder="Name"
          ></InputComponent>
        </View>

        {/* Password input */}
        <View className="mb-6">
          <InputPasswordComponent
            rePassword={false}
            placeholder="Mật khẩu"
            password={password}
            setPassword={setPassword}
          ></InputPasswordComponent>
        </View>

        <View className="mb-6">
          <InputPasswordComponent
            rePassword
            placeholder="Nhập lại mật khẩu"
            password={rePassword}
            setPassword={setRePassword}
          ></InputPasswordComponent>
        </View>

        {/* Login button */}
        <View className=" mb-4 mt-20">
          <ButtonComponent
            onPress={() => {
              handleRegister();
            }}
            text="Đăng ký"
          ></ButtonComponent>
        </View>

        {/* Đăng ký */}
        <Text className="text-gray-400 text-center">
          đã có tài khoản?{" "}
          <Text className="text-blue-400" onPress={() => router.push("/login")}>
            Đăng nhập
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default register;

const styles = StyleSheet.create({});
