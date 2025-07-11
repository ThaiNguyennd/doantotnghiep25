import { useLoading } from "@/components/hooks/LoadingContext";
import { useSetting } from "@/components/hooks/SettingContext";
import { useTheme } from "@/components/hooks/ThemeContext";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import * as Speech from "expo-speech";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const backgroundColors = [
  { key: "#000", color: "#000" },
  { key: "#fff", color: "#fff" },
];
const setting = () => {
  const { font, setFont } = useSetting();
  const [fontSize, setFontSize] = useState(font.fontSize);
  const [lineHeight, setLineHeight] = useState(font.lineHeight);
  const [selectedColor, setSelectedColor] = useState("auto");
  const [rate, setRate] = useState(font.rate);
  const [pitch, setPitch] = useState(font.pitch);
  const { setLoading } = useLoading();
  const testSpeech = () => {
    Speech.stop();
    Speech.speak("Xin chào! Đây là giọng đọc thử nghiệm.", {
      language: "vi-VN",
      pitch,
      rate,
    });
  };
  const { theme, setTheme } = useTheme();
  const ChangeSetting = async () => {
    const setting = {
      fontSize: fontSize, // mặc định tương đương text-base
      lineHeight: lineHeight,
      rate: rate,
      pitch: pitch,
    };
    setFont(setting);
    router.back();
    setLoading(true);
    if (selectedColor === "#000") {
      setTheme(theme === "dark" ? "light" : "dark");
    }
    if (selectedColor === "#fff") {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };
  return (
    <View
      className={`flex-1 w-full ${theme === "dark" ? "bg-primary" : "bg-white"} `}
    >
      <View className="w-full flex-row items-center justify-between rounded-xl p-6 shadow-lg px-5 fixed">
        <TouchableOpacity onPress={() => router.back()} className="">
          <Text
            className={`${theme === "dark" ? "text-white" : "text-black"} text-xl`}
          >
            ✕
          </Text>
        </TouchableOpacity>
        <Text
          className={`${theme === "dark" ? "text-white" : "text-black"} text-xl`}
        >
          Thiết lập giao diện
        </Text>
        <View className="flex-row gap-5">
          <TouchableOpacity
            onPress={() => {
              ChangeSetting();
            }}
            className=" "
          >
            <Text
              className={`${theme === "dark" ? "text-white" : "text-black"} text-xl`}
            >
              Lưu
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {/* {-- bground} */}
        <View className=" flex-row justify-between items-center px-10 mt-10">
          <Text
            className={`${theme === "dark" ? "text-white" : "text-black"} mb-5 font-semibold`}
          >
            MÀU NỀN
          </Text>
          <View className="flex-row flex-wrap gap-2 mb-6  items-center">
            {backgroundColors.map((item) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => setSelectedColor(item.key)}
                className={`w-10 h-10 rounded border-2
              ${selectedColor === item.key ? "border-red-500" : "border-gray-400"}
              ${item.color === "transparent" ? "bg-transparent" : ""}`}
                style={{
                  backgroundColor:
                    item.color === "transparent" ? undefined : item.color,
                }}
              ></TouchableOpacity>
            ))}
          </View>
        </View>

        {/* {-- fontSize} */}
        <View className=" flex-row justify-between items-center px-10 mt-10">
          <Text
            className={`${theme === "dark" ? "text-white" : "text-black"} font-bold mb-1`}
          >
            KÍCH THƯỚC CHỮ
          </Text>
          <View className="flex-row items-center ">
            <Text
              className={`${theme === "dark" ? "text-white" : "text-black"} mr-4`}
            >
              {fontSize}
            </Text>
            <TouchableOpacity
              onPress={() => setFontSize(fontSize - 1)}
              className="px-3 py-1 bg-gray-500 rounded mr-2"
            >
              <Text
                className={`${theme === "dark" ? "text-white" : "text-black"}`}
              >
                −
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFontSize(fontSize + 1)}
              className="px-3 py-1 bg-gray-500 rounded"
            >
              <Text
                className={`${theme === "dark" ? "text-white" : "text-black"}`}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* {-- lineHeight} */}
        <View className="flex-row justify-between items-center px-10 mt-10">
          <Text
            className={`${theme === "dark" ? "text-white" : "text-black"} font-bold mb-1`}
          >
            Khoảng cách dòng
          </Text>
          <View className="flex-row items-center ">
            <Text
              className={`${theme === "dark" ? "text-white" : "text-black"} mr-4`}
            >
              {lineHeight.toFixed(1)}
            </Text>
            <TouchableOpacity
              onPress={() =>
                setLineHeight((prev) =>
                  Math.max(1, parseFloat((prev - 0.1).toFixed(1)))
                )
              }
              className="px-3 py-1 bg-gray-500 rounded mr-2"
            >
              <Text
                className={`${theme === "dark" ? "text-white" : "text-black"}`}
              >
                −
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setLineHeight((prev) => parseFloat((prev + 0.1).toFixed(1)))
              }
              className="px-3 py-1 bg-gray-500 rounded"
            >
              <Text
                className={`${theme === "dark" ? "text-white" : "text-black"}`}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* {-- lineHeight} */}
        <View className="px-3 mt-10">
          <Text
            className={`${theme === "dark" ? "text-white" : "text-black"} font-bold mt-6 mb-3 text-lg`}
          >
            TUỲ CHỈNH GIỌNG ĐỌC
          </Text>
          <View className="flex-row justify-between items-center px-10">
            <Text
              className={`${theme === "dark" ? "text-white" : "text-black"} mt-4`}
            >
              Tốc độ
            </Text>
            <Slider
              style={{ width: "100%", height: 40 }}
              value={rate}
              onValueChange={setRate}
              minimumValue={0.1}
              maximumValue={1.5}
              step={0.1}
              minimumTrackTintColor="red"
              maximumTrackTintColor="gray"
              thumbTintColor="red"
            />
          </View>
          <View className="flex-row justify-between items-center px-10 mt-10">
            <Text
              className={`${theme === "dark" ? "text-white" : "text-black"} mt-4`}
            >
              Cao độ
            </Text>
            <Slider
              style={{ width: "100%", height: 40 }}
              value={pitch}
              onValueChange={setPitch}
              minimumValue={0}
              maximumValue={2}
              step={0.1}
              minimumTrackTintColor="red"
              maximumTrackTintColor="gray"
              thumbTintColor="red"
            />
          </View>

          <TouchableOpacity onPress={testSpeech} className="mt-4 items-center">
            <Text className="text-red-500 text-base font-bold">
              Nghe Thử Giọng
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default setting;
