import { Book } from "@/types/book";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import BookCardItem from "../content/BookCardItem";

const BookByTagUiItem = ({ TagId }: any) => {
  const [books, setBooks] = useState<Book[]>([]);
  const { width: screenWidth } = Dimensions.get("window");

  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        `http://192.168.0.101:3001/books/by-tags/${TagId}`
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
    <View className="px-5 justify-between">
      <FlatList
        data={books}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <BookCardItem book={item} widthItem={screenWidth * 0.3} />
        )}
        keyExtractor={(item) => item._id}
        className="mt-4"
      />
    </View>
  );
};

export default BookByTagUiItem;

const styles = StyleSheet.create({});
