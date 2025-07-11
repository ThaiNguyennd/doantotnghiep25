import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../hooks/userContext";
import ModalCustom from "./ModalCustom";

const ModalMember = ({
  showModalMember,
  setShowModalMember,
  setIschange,
}: any) => {
  const { setUser, user } = useUser();
  const handleChangMember = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(`http://10.0.2.2:3001/users/${user?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isPremium: true,
        }),
      });

      if (res.ok) {
        setIschange();
        setShowModalMember(false);
        alert("Bạn đã trở thành hội viên của Waka");
      } else {
        const data = await res.json();
        alert(`Cập nhật thất bại: ${data.message || "Lỗi không xác định"}`);
      }
    } catch (err: any) {
      console.error(err.message);
      alert("Lỗi khi cập nhật người dùng");
    }
  };
  return (
    <View>
      <ModalCustom
        visible={showModalMember}
        onRequestClose={() => setShowModalMember(false)}
      >
        <Text className="text-xl font-bold">
          Bạn có chắc muốn đăng ký tham giá hội viên
        </Text>
        <View className="flex items-center gap-2 mt-10 flex-row">
          <TouchableOpacity
            className="text-white p-3 bg-orange-400 rounded-md"
            onPress={() => {
              setShowModalMember(false);
            }}
          >
            <Text className="text-white">Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleChangMember();
            }}
          >
            <Text className="text-white p-3 bg-blue-500 rounded-md">
              Đăng Ký
            </Text>
          </TouchableOpacity>
        </View>
      </ModalCustom>
    </View>
  );
};

export default ModalMember;

const styles = StyleSheet.create({});
