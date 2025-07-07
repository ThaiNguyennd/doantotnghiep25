import { useLoading } from "@/components/hooks/LoadingContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import * as Speech from "expo-speech";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const backgroundColors = [
  { key: "#000", color: "#000" },
  { key: "#fff", color: "#fff" },
];
const setting = () => {
  const [fontSize, setFontSize] = useState(22);
  const [lineHeight, setLineHeight] = useState(2.8);
  const [selectedColor, setSelectedColor] = useState("auto");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1.0);
  const { setLoading } = useLoading();
  const testSpeech = () => {
    Speech.stop();
    Speech.speak("Xin chào! Đây là giọng đọc thử nghiệm.", {
      language: "vi-VN",
      pitch,
      rate,
    });
  };
  const ChangeSetting = async () => {
    await AsyncStorage.setItem("fontSize", String(fontSize));
    await AsyncStorage.setItem("lineHeight", String(lineHeight));
    await AsyncStorage.setItem("bgr", String(selectedColor));
    await AsyncStorage.setItem("rate", String(rate));
    await AsyncStorage.setItem("pitch", String(pitch));
    router.back();
    setLoading(true);
  };

  return (
    <View className="flex-1 w-full bg-primary 8">
      <View className="w-full flex-row items-center justify-between rounded-xl p-6 shadow-lg px-5 fixed">
        <TouchableOpacity onPress={() => router.back()} className="">
          <Text className="text-white text-xl">✕</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl">Thiết lập giao diện</Text>
        <View className="flex-row gap-5">
          <TouchableOpacity
            onPress={() => {
              ChangeSetting();
            }}
            className=" "
          >
            <Text className="text-white text-xl">Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {/* {-- bground} */}
        <View className=" flex-row justify-between items-center px-10 mt-10">
          <Text className="text-white mb-5 font-semibold">MÀU NỀN</Text>
          <View className="flex-row flex-wrap gap-2 mb-6  items-center">
            {backgroundColors.map((item) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => setSelectedColor(item.key)}
                className={`w-10 h-10 rounded border-2
              ${selectedColor === item.key ? "border-red-500" : "border-white"}
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
          <Text className="text-white font-bold mb-1">KÍCH THƯỚC CHỮ</Text>
          <View className="flex-row items-center ">
            <Text className="text-white mr-4">{fontSize}</Text>
            <TouchableOpacity
              onPress={() => setFontSize(fontSize - 1)}
              className="px-3 py-1 bg-gray-500 rounded mr-2"
            >
              <Text className="text-white">−</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFontSize(fontSize + 1)}
              className="px-3 py-1 bg-gray-500 rounded"
            >
              <Text className="text-white">+</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* {-- lineHeight} */}
        <View className="flex-row justify-between items-center px-10 mt-10">
          <Text className="text-white font-bold mb-1">Kích Thước</Text>
          <View className="flex-row items-center ">
            <Text className="text-white mr-4">{lineHeight.toFixed(1)}</Text>
            <TouchableOpacity
              onPress={() =>
                setLineHeight((prev) =>
                  Math.max(1, parseFloat((prev - 0.1).toFixed(1)))
                )
              }
              className="px-3 py-1 bg-gray-500 rounded mr-2"
            >
              <Text className="text-white">−</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setLineHeight((prev) => parseFloat((prev + 0.1).toFixed(1)))
              }
              className="px-3 py-1 bg-gray-500 rounded"
            >
              <Text className="text-white">+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* {-- lineHeight} */}
        <View className="px-3 mt-10">
          <Text className="text-white font-bold mt-6 mb-3 text-lg">
            TUỲ CHỈNH GIỌNG ĐỌC
          </Text>
          <View className="flex-row justify-between items-center px-10">
            <Text className="text-white mt-4">Tốc độ</Text>
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
            <Text className="text-white mt-4">Cao độ</Text>
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

const styles = StyleSheet.create({});
