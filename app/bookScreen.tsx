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
  const { id } = useLocalSearchParams();
  console.log("idddd", id);
  const [book, setBook] = useState<any | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`http://192.168.0.101:3001/books/${id}`);
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
    router.push({
      pathname: "/chapterScreen",
      params: { id: book._id, currentIndex: 0 },
    });
  };
  return (
    <ScrollView className="bg-black flex-1 h-full">
      {/* Ảnh nền mờ */}
      <Image
        source={{
          uri: `http://192.168.0.101:3001/public/img/books/${book?.title
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
              uri: `http://192.168.0.101:3001/public/img/books/${book?.title
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
          <Text className="text-white text-4xl font-bold">{book?.title}</Text>
          <Text className="text-gray-300 mt-2 text-xl pb-2">
            {book?.author}
          </Text>
        </View>

        {/* Nút hành động */}
        <View className="flex-row mt-10 space-x-3">
          <TouchableOpacity
            className="flex-1 bg-blue-600 py-4 rounded-full items-center"
            onPress={handleChapter}
          >
            <Text className="text-white">ĐỌC</Text>
          </TouchableOpacity>
        </View>

        {/* Đánh giá, lượt đọc, nút */}
        <View className="flex-row items-center justify-between mt-4">
          <View className="flex flex-row gap-1 items-center">
            <Text className="text-xs text-light-300 font-medium mt-1">
              {book?.averageRating}
            </Text>
            <AntDesign name="star" size={14} color="yellow" />
          </View>
          <Text className="text-gray-300">👁 2.2M</Text>
        </View>

        {/* Tabs sách */}

        {/* Mô tả sách */}
        <Text className="text-gray-200 pt-8 pb-32 leading-relaxed text-xl">
          {book?.description}
        </Text>
      </View>
      <CommentComponent bookId={id}></CommentComponent>
    </ScrollView>
  );
};

export default BookScreen;

const styles = StyleSheet.create({});
