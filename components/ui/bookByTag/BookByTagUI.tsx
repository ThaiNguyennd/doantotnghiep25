import TitleComponent from "@/components/titleComponent/TitleComponent";
import { Tag } from "@/types/book";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import BookByTagUiItem from "./BookByTagUiItem";

const BookByTagUI = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const fetchTags = async () => {
    try {
      const res = await axios.get("http://10.0.2.2:3001/tags");
      setTags(res.data?.data?.result);
    } catch (err) {
      console.error("Lỗi khi lấy tags:", err);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);
  return (
    <View className="pb-32">
      <FlatList
        data={tags}
        renderItem={({ item }) =>
          item ? (
            <View className="">
              <TitleComponent
                titleText={`Sách ${item.name}`}
                onPess={() => {
                  router.push({
                    pathname: "/tag/[id]",
                    params: { id: String(item._id), name: item.name },
                  });
                }}
              ></TitleComponent>
              <BookByTagUiItem TagId={item._id} />
            </View>
          ) : (
            <View></View>
          )
        }
        keyExtractor={(item) => item._id}
        className="mt-4"
      />
    </View>
  );
};

export default BookByTagUI;

const styles = StyleSheet.create({});
