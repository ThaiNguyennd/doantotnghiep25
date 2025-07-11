import { useSetting } from "@/components/hooks/SettingContext";
import { useTheme } from "@/components/hooks/ThemeContext";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
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
  const { theme, setTheme } = useTheme();
  const { id, currentIndex } = useLocalSearchParams();
  const [index, setIndex] = useState(0);
  const [chapters, setChapters] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [voicing, setVoicing] = useState(false);
  const { height: screenWidth } = Dimensions.get("window");
  const { font, setFont } = useSetting();

  const fetchChap = async () => {
    try {
      const res = await axios.get(
        `http://10.0.2.2:3001/chapters/by-book/${id}`
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
      rate: font.rate,
      pitch: font.pitch,
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
      className={`flex-1 w-full ${theme === "dark" ? "bg-primary" : "bg-white"} h-full relative`}
      style={{ height: screenWidth }}
    >
      <View className="flex-row items-center justify-between mb-4 px-4 mt-4">
        <Ionicons
          name="arrow-back"
          size={24}
          color={theme === "dark" ? "white" : "black"}
          onPress={() => router.back()}
        />
        <Text
          className={`${theme === "dark" ? "text-white" : "text-black"} text-xl font-bold`}
        >
          {chapterIndex?.title}
        </Text>
        <View className="flex-row gap-5">
          {voicing ? (
            <TouchableOpacity onPress={handleVoicePause}>
              <AntDesign
                name="pausecircle"
                size={24}
                color={theme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleVoice}>
              <SimpleLineIcons
                name="earphones-alt"
                size={24}
                color={theme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              router.push("/setting");
            }}
          >
            <AntDesign
              name="setting"
              size={24}
              color={theme === "dark" ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        className={`flex-1 ${theme === "dark" ? "bg-primary" : "bg-white"} px-10 py-20 relative h-full `}
      >
        <View>
          <Text
            style={{
              fontSize: font.fontSize,
              lineHeight: font.lineHeight,
              textAlign: "justify",
            }}
            className={` ${theme === "dark" ? "text-gray-200" : "text-gray-500"} `}
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
          <AntDesign
            name="banckward"
            size={18}
            color={theme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (index < chapters.length - 1) {
              setIndex(index + 1);
            }
          }}
        >
          <AntDesign
            name="forward"
            size={18}
            color={theme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
