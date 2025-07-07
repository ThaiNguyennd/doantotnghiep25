import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import BannerUiItem from "./BannerUiItem";
const data = [
  {
    id: "1",
    image: require("@/assets/images/3811.png"), // banner bạn up
  },
  {
    id: "2",
    image: require("@/assets/images/4192.png"),
  },
  {
    id: "3",
    image: require("@/assets/images/4183.jpg"),
  },
];

const BannerUi = () => {
  const { width: screenWidth } = Dimensions.get("window");
  const [activeIndex, setActiveIndex] = useState(0);
  const progress = useSharedValue<number>(0);
  return (
    <View className="w-full items-center">
      <Carousel
        autoPlayInterval={5000}
        data={data}
        height={450}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={screenWidth*0.85}
        mode="parallax"
        autoPlay
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 60,
        }}
        onProgressChange={progress}
         renderItem={({ item, index }) => (
          <BannerUiItem item={item} isActive={index === activeIndex} />
        )}
      />
      
    </View>
  );
};

export default BannerUi;

const styles = StyleSheet.create({});
