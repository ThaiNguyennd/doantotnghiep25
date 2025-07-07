import BookCardItem from "@/components/ui/content/BookCardItem";
import { Book } from "@/types/book";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,

  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Details = () => {
  const { id, name } = useLocalSearchParams();
  const { width: screenWidth } = Dimensions.get("window");

  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        `http://192.168.0.101:3001/books/by-tags/${id}`
      );
      const data = res.data;
      const booksFromAPI = data.data;

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

      setBooks(formattedBooks);
    } catch (error) {
      console.error("Lỗi khi fetch sách:", error);
    }
  };
  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="flex-row items-center justify-between mb-4 px-4">
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => router.back()}
        />
        <Text className="text-white text-lg font-semibold">{name}</Text>
        <Ionicons name="search" size={24} color="white" />
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
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({});
