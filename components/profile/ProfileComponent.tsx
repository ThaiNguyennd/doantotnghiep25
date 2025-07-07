import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../hooks/userContext";

const ProfileComponent = () => {
  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>("");
  const [token, setToken] = useState<string | null>();
  const [avatar, setAvatar] = useState<string | null>(null);
  const { setUser, user } = useUser();
  const [modalAvt, setModalAvt] = useState(false);
  const [image, setImage] = useState<string | null>("");

  const pickImage = async () => {
    // Yêu cầu quyền truy cập thư viện
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Cần cấp quyền truy cập thư viện ảnh");
      return;
    }

    // Mở thư viện ảnh
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0]);
      // Cập nhật ảnh
      setAvatar(result.assets[0].uri);
      setImage(result.assets[0].uri);
      const fileName = `avatar_${user?._id}`; // tự đặt tên file

      const formData = new FormData();
      formData.append("file", {
        uri: result.assets[0].uri,
        name: fileName,
        type: "image/jpeg",
      } as any);
      try {
        await axios.post(`http://192.168.0.101:3001/files/upload`, formData, {
          headers: {
            folder_type: `img/User/userId-${user?._id}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
      console.log("đã upload");
    }
  };
  useEffect(() => {
    const getitem = async () => {
      const idUser = await AsyncStorage.getItem("token");
      setToken(idUser);
      
    };
    getitem();
    setEmail(user?.email);
    setName(user?.name);
  }, []);

  console.log("r", image);
  const handleLogOut = async () => {
    try {
      if (token) {
        await axios.post(
          "http://192.168.0.101:3001/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("idUser");
      setUser(null);
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    }
  };
  return (
    <SafeAreaView className="flex-1   bg-primary dark:bg-primary px-7 mt-28 ">
      <View className="items-center">
        <TouchableOpacity
          onPress={() => {
            pickImage();
          }}
        >
          <Image
            source={{
              uri:
                avatar ||
                `http://192.168.0.101:3001/public/img/User/userId-${user?._id}/images/${user?.avatar}`,
            }}
            className="w-32 h-32 rounded-full mb-4 border-2 border-gray-300 items-center "
          />
          <Text className="text-center text-blue-500 mb-4 -ml-2">
            Thay đổi ảnh đại diện
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-lg font-semibold text-gray-700 dark:text-white mb-5 text-start">
        Tên
      </Text>
      <TextInput
        className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 mb-10 text-black dark:text-white bg-white dark:bg-gray-800 "
        value={name}
        onChangeText={setName}
      />

      <Text className="text-lg font-semibold text-gray-700 dark:text-white mb-1">
        Email
      </Text>
      <TextInput
        className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 text-black dark:text-white bg-white dark:bg-gray-800"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View className="flex items-center gap-2 mt-10 flex-row">
        <TouchableOpacity className="text-white p-3 bg-orange-400 rounded-md">
          <Text className="text-white">Sửa thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleLogOut();
          }}
        >
          <Text className="text-white p-3 bg-blue-400 rounded-md">
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileComponent;
