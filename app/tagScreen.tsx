import { Tag } from "@/types/book";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const TagScreen = () => {
  const router = useRouter();
  const [tags, setTags] = useState<Tag[]>([]);
  const fetchTags = async () => {
    try {
      const res = await axios.get("http://192.168.0.101:3001/tags");
      setTags(res.data?.data?.result);
    } catch (err) {
      console.error("Lỗi khi lấy tags:", err);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);
  return (
    <View className="bg-primary flex-1 h-full">
      <View className="flex-row items-center justify-between mb-4 px-4">
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => router.back()}
        />
        <Text className="text-white text-lg font-semibold">Thể loại</Text>
        <Ionicons name="search" size={24} color="white" />
      </View>
      <FlatList
        data={tags}
        renderItem={({ item }: any) => (
          <View className="mt-5 px-4 border border-t-0 border-l-0 border-r-0 py-2 border-gray-700 ">
            <Text
              className="text-white text-3xl"
              onPress={() =>
                router.push({
                  pathname: "/tag/[id]",
                  params: { id: String(item._id),
                    name:item.name
                   },
                })
              }
            >
              {item.name}
            </Text>
          </View>
        )}
        keyExtractor={(item: any) => item._id}
        className="mt-4"
      />
    </View>
  );
};

export default TagScreen;

const styles = StyleSheet.create({});
