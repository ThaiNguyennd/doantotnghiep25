import { useLoading } from "@/components/hooks/LoadingContext";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import * as Speech from "expo-speech";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReadChapter() {
  const { id, currentIndex } = useLocalSearchParams();
  const [index, setIndex] = useState(0);
  const [chapters, setChapters] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [voicing, setVoicing] = useState(false);
  const { height: screenWidth } = Dimensions.get("window");
  const [fontSize, setFontSize] = useState<string | null>("17");
  const [lineHeight, setLineHeight] = useState<string | null>("1.6");
  const [selectedColor, setSelectedColor] = useState("#030014");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1.0);
  const { isLoading } = useLoading();
  useEffect(() => {
    getItem();
  }, []);
  useEffect(() => {
    getItem();
  }, [isLoading]);
  console.log("first",isLoading)
  console.log("rate",isLoading)
  console.log("font",fontSize)
  const getItem = async () => {
    const fontSize = await AsyncStorage.getItem("fontSize");
    const lineHeight = await AsyncStorage.getItem("lineHeight");
    const bgr = await AsyncStorage.getItem("bgr");
    const rate = await AsyncStorage.getItem("rate");
    const pitch = await AsyncStorage.getItem("pitch");

    setFontSize(fontSize);
    setLineHeight(lineHeight);
    setSelectedColor(bgr);
    setRate(parseInt(rate));
    setPitch(pitch);
  };
  const fetchChap = async () => {
    try {
      const res = await axios.get(
        `http://192.168.0.101:3001/chapters/by-book/${id}`
      );
      const result = await res.data.data.reverse();
      setChapters(result);
      setChapterIndex(result[index]);
    } catch (error) {
      console.error("Lỗi lấy chương:", error);
    }
  };
  useEffect(() => {
    fetchChap();
  }, [id]);
  useEffect(() => {
    fetchChap();
  }, [index]);

  const handleVoice = () => {
    setVoicing(true);
    Speech.speak(chapterIndex?.title + chapterIndex.content, {
      language: "vi-VN",
      rate: rate,
      pitch: pitch,
      onDone: () => {
        setVoicing(false);
      },
    });
  };
  const handleVoicePause = () => {
    setVoicing(false);
    Speech.stop();
  };
  return (
    <View
      className=" flex-1 bg-primary relative  "
      style={{ height: screenWidth }}
    >
      <View className="flex-row items-center justify-between mb-4 px-4 mt-4">
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => router.back()}
        />
        <Text className={`text-white text-xl font-bold`}>
          {chapterIndex?.title}
        </Text>
        <View className="flex-row gap-5">
          {voicing ? (
            <TouchableOpacity onPress={handleVoicePause}>
              <AntDesign name="pausecircle" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleVoice}>
              <SimpleLineIcons name="earphones-alt" size={24} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              router.push("/setting");
            }}
          >
            <AntDesign name="setting" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className="flex-1 bg-primary px-10 py-20 relative mt-5 h-full ">
        <View>
          <Text
            className={`text-[${fontSize}px] text-gray-200 leading-[${lineHeight}]`}
          >
            {chapterIndex?.content}
          </Text>
        </View>
      </ScrollView>
      <View className="flex flex-row items-center justify-between  w-full -mt-10 absolute bottom-[50%] ">
        <TouchableOpacity
          onPress={() => {
            if (index > 0) {
              setIndex(index - 1);
            }
          }}
        >
          <AntDesign name="banckward" size={18} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (index < chapters.length - 1) {
              setIndex(index + 1);
            }
          }}
        >
          <AntDesign name="forward" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
