import React from "react";
import { Image, View } from "react-native";

const BannerUiItem = ({ item, isActive }: any) => {
  return (
    <View
      className={`rounded-2xl overflow-hidden shadow-md bg-white ${isActive ? "scale-100 -translate-y-1 shadow-lg" : "scale-95 translate-y-0 h-full"}`}
    >
      <Image source={item.image} className="w-full h-full object-contain" />
    </View>
  );
};

export default BannerUiItem;
