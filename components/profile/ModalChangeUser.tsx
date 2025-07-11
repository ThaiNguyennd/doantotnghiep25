import { useTheme } from "@/components/hooks/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useUser } from "../hooks/userContext";
import ModalCustom from "../modal/ModalCustom";

const ModalChangeUser = ({
  showModalChangeUser,
  setShowModalChangUser,
  user,
  setIschange,
}: any) => {
  const { setUser, setLoading, loading } = useUser();
  const { theme, setTheme } = useTheme();

  const [name, setName] = useState<string | undefined>(user.name);
  const [email, setEmail] = useState<string | undefined>(user.email);
  useEffect(() => {}, []);
  const handleChangeUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(`http://10.0.2.2:3001/users/${user?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      });

      if (res.ok) {
        try {
          const res = await axios.get<any>(
            `http://10.0.2.2:3001/users/${user._id}`
          );
          console.log("res", res.data.data);
          const result = res.data.data;
          console.log("user context", result.result);
          setUser(result);
          router.push("/profile");
        } catch (error) {
          console.error("Lỗi khi tải thông tin user:", error);
          setUser(null);
        } finally {
        }
      } else {
        const data = await res.json();
        alert(`Cập nhật thất bại: ${data.message || "Lỗi không xác định"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật người dùng");
    }
  };
  return (
    <View className="">
      <ModalCustom
        visible={showModalChangeUser}
        onRequestClose={() => showModalChangeUser(false)}
      >
        <Text className="text-xl font-semibold mb-4 mt-5">
          Sửa thông tin người đọc
        </Text>
        <View className="w-full">
          <Text
            className={`text-lg font-semibold ${theme === "light" ? "text-white" : "text-black"} mb-5 text-start`}
          >
            Tên người đọc
          </Text>
        </View>
        <TextInput
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 mb-10 text-black dark:text-white bg-white dark:bg-gray-800 "
          value={name}
          onChangeText={setName}
        />
        <View className="w-full">
          <Text
            className={`text-lg font-semibold ${theme === "light" ? "text-white" : "text-black"} mb-5 text-start`}
          >
            Email
          </Text>
        </View>
        <TextInput
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 text-black dark:text-white bg-white dark:bg-gray-800"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Pressable
          className="bg-red-500 px-4 py-2 rounded mt-8"
          onPress={() => {
            setShowModalChangUser(false);
            handleChangeUser();
          }}
        >
          <Text className="text-white">Lưu</Text>
        </Pressable>
      </ModalCustom>
    </View>
  );
};

export default ModalChangeUser;
