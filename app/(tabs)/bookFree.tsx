import { useTheme } from "@/components/hooks/ThemeContext";
import BookCardItem from "@/components/ui/content/BookCardItem";

import { Book } from "@/types/book";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";

const Details = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const { theme, setTheme } = useTheme();

  const { width: screenWidth } = Dimensions.get("window");
  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = async () => {
    try {
      const res = await axios.get(`http://10.0.2.2:3001/books`);
      const data = res.data;
      const booksFromAPI = data.data.result;

      const formattedBooks: Book[] = booksFromAPI
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((item: any) => ({
          _id: item._id,
          title: item.title,
          author: item.author,
          cover: item.cover,
          isPremium: item.isPremium,
          rating: item.averageRating,
          tag: item.tags,
        }));
      const nonPremiumBooks = formattedBooks.filter(
        (book) => book.isPremium === false
      );
      console.log(nonPremiumBooks);
      setBooks(nonPremiumBooks);
    } catch (error) {
      console.error("Lỗi khi fetch sách:", error);
    }
  };

  return (
    <View
      className={`flex-1 w-full ${theme === "dark" ? "bg-primary" : "bg-white"} h-full px-4`}
    >
      <View className="flex-row items-center justify-between mb-4  ">
        <Ionicons
          name="arrow-back"
          size={24}
          color={theme === "dark" ? "white" : "black"}
          onPress={() => router.back()}
        />
        <Text
          className={`${theme === "dark" ? "text-white" : "text-black"} text-lg font-semibold`}
        >
          {"Sách Miễn phí"}
        </Text>
        <Ionicons
          name="search"
          size={24}
          color={theme === "dark" ? "white" : "black"}
        />
      </View>
      <FlatList
        style={{ width: screenWidth }}
        data={books}
        contentContainerStyle={{ paddingVertical: 10 }}
        columnWrapperStyle={{ marginBottom: 30 }}
        numColumns={2}
        renderItem={({ item }) => (
          <View className="mt-10">
            <BookCardItem book={item} widthItem={screenWidth * 0.45} />
          </View>
        )}
        keyExtractor={(item) => item._id}
        className="mt-4 "
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
