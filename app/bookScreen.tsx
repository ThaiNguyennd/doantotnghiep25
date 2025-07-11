import { useTheme } from "@/components/hooks/ThemeContext";
import ModalCustom from "@/components/modal/ModalCustom";
import ModalMember from "@/components/modal/ModalMember";
import HeaderBackComponent from "@/components/titleComponent/HeaderBackComponent";
import CommentComponent from "@/components/ui/comment/CommentComponent";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BookScreen = () => {
  const { theme, setTheme } = useTheme();

  const { id } = useLocalSearchParams();
  const [book, setBook] = useState<any | null>(null);
  const [showModalIpremium, setShowModalIspremium] = useState(false);
  const [showModalMember, setModalMember] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`http://10.0.2.2:3001/books/${id}`);
        const json = await res.json();
        setBook(json.data);
      } catch (err) {
        console.log("Lỗi khi tải thông tin sách");
      } finally {
      }
    };

    fetchBookDetails();
  }, [id]);
  console.log("book", book);

  const handleChapter = async () => {
    if (!book.isPremium) {
      router.push({
        pathname: "/chapterScreen",
        params: { id: book._id, currentIndex: 0 },
      });
    } else {
      setShowModalIspremium(true);
    }
  };
  return (
    <ScrollView
      className={`flex-1 w-full ${theme === "dark" ? "bg-primary" : "bg-white"} h-full`}
    >
      {/* Ảnh nền mờ */}
      <Image
        source={{
          uri: `http://10.0.2.2:3001/public/img/books/${book?.title
            .normalize("NFD") // Bỏ dấu
            .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu tiếng Việt
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "") // Bỏ ký tự đặc biệt
            .replace(/\s+/g, "-") // Thay khoảng trắng bằng "-"
            .replace(/-+/g, "-")}/images/${book?.cover}`,
        }}
        className="absolute w-full h-full opacity-40 object-contain"
        blurRadius={30}
      />
      <HeaderBackComponent></HeaderBackComponent>

      {/* Ảnh chính + Huy hiệu */}
      <View className="items-center mt-10">
        <View className="relative">
          <Image
            source={{
              uri: `http://10.0.2.2:3001/public/img/books/${book?.title
                .normalize("NFD") // Bỏ dấu
                .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu tiếng Việt
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, "") // Bỏ ký tự đặc biệt
                .replace(/\s+/g, "-") // Thay khoảng trắng bằng "-"
                .replace(/-+/g, "-")}/images/${book?.cover}`,
            }}
            className="w-60 h-[300px] rounded-xl"
          />
          <View
            className={`absolute top-0 right-0 ${book?.isPremium ? "bg-orange-500" : "bg-green-500"}  px-2 py-1 rounded-bl-xl`}
          >
            <Text className="text-xs text-white font-semibold">
              {book?.isPremium ? "Hội viên" : "Miễn phí"}
            </Text>
          </View>
        </View>
      </View>

      {/* Thông tin sách */}
      <View className="px-4 mt-4">
        <View className="w-full flex items-center mt-10">
          <Text
            className={`${theme === "dark" ? "text-white" : "text-black"} text-2xl font-bold`}
          >
            {book?.title}
          </Text>
          <Text
            className={`${theme === "dark" ? "text-gray-300" : "text-gray-500"} mt-2 text-xl pb-2`}
          >
            {book?.author}
          </Text>
        </View>

        {/* Nút hành động */}
        <View className="flex-row mt-10 space-x-3">
          <TouchableOpacity
            className="flex-1 bg-blue-600 py-4 rounded-full items-center"
            onPress={handleChapter}
          >
            <Text className={`text-white font-bold text-lg`}>ĐỌC</Text>
          </TouchableOpacity>
        </View>

        {/* Đánh giá, lượt đọc, nút */}
        <View className="flex-row items-center justify-between mt-4 px-5">
          <View className="flex flex-row gap-1 items-center">
            <Text
              className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-500"} font-medium mt-1`}
            >
              {book?.averageRating}
            </Text>
            <AntDesign name="star" size={14} color="yellow" />
          </View>
          <Text
            className={`${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}
          >
            👁 2.2M
          </Text>
        </View>

        {/* Tabs sách */}

        {/* Mô tả sách */}
        <Text
          className={`${theme === "dark" ? "text-gray-300" : "text-gray-500"} pt-8 pb-32 leading-relaxed text-xl`}
        >
          {book?.description}
        </Text>
      </View>
      <CommentComponent bookId={id}></CommentComponent>
      {showModalIpremium && (
        <ModalCustom
          visible={showModalIpremium}
          onRequestClose={setShowModalIspremium}
        >
          <Text className="text-xl font-semibold mt-5">
            Đây là Sách dành cho hội viên của Waka
          </Text>
          <Text className="text-lg font-medium mt-3">
            Hãy đăng kí để đọc sách
          </Text>
          <View className="flex items-center gap-2 mt-10 flex-row">
            <TouchableOpacity
              className="text-white p-3 bg-orange-400 rounded-md"
              onPress={() => {
                setShowModalIspremium(false);
              }}
            >
              <Text className="text-white">Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalMember(true);
                setShowModalIspremium(false);
              }}
            >
              <Text className="text-white p-3 bg-blue-500 rounded-md">
                Đăng Ký
              </Text>
            </TouchableOpacity>
          </View>
        </ModalCustom>
      )}
      {showModalMember && (
        <ModalMember
          showModalMember={showModalMember}
          setShowModalMember={setModalMember}
        ></ModalMember>
      )}
    </ScrollView>
  );
};

export default BookScreen;

const styles = StyleSheet.create({});
