import { useTheme } from "@/components/hooks/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";


const BookCardItem = ({ book, widthItem }: any) => {
    const { theme, setTheme } = useTheme();

  return (
    <View>
      <TouchableOpacity
        className={`mr-4 `}
        style={{ width: widthItem }}
        onPress={() => {
          router.push({
            pathname: "/bookScreen",
            params: { id: book._id },
          });
        }}
      >
        <View className="relative w-full">
          <Image
            source={{
              uri: `http://10.0.2.2:3001/public/img/books/${book.title
                .normalize("NFD") // Bỏ dấu
                .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu tiếng Việt
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, "") // Bỏ ký tự đặc biệt
                .replace(/\s+/g, "-") // Thay khoảng trắng bằng "-"
                .replace(/-+/g, "-")}/images/${book.cover}`,
            }}
            className="w-full h-[150px] rounded-lg border-white border"
            resizeMode="cover"
          />
          <View
            className={`absolute right-0 top-0 px-2 ${book.isPremium ? "bg-orange-500 rounded-lg" : "bg-green-500 rounded-md"}  `}
          >
            <Text
              className={`text-base text-white  ${book.isPremium ? "text-black" : "text-white"}`}
            >
              {book.isPremium ? "HỘI VIÊN" : "MIỄN PHÍ"}
            </Text>
          </View>
        </View>
        <Text className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-black"} mt-2`} numberOfLines={1}>
          {book.title}
        </Text>

        <View className="flex-row items-center justify-between ">
          <Text className="text-xs font-medium text-light-300 ">
            {book.tag.name}
          </Text>
          <View className="flex flex-row gap-1 items-center">
            <Text className="text-xs text-light-300 font-medium mt-1">
              {book?.rating}
            </Text>
            <AntDesign name="star" size={14} color="yellow" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BookCardItem;
