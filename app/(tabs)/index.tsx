import { useTheme } from "@/components/hooks/ThemeContext";
import BannerUi from "@/components/ui/banner/BannerUi";
import BookByTagUI from "@/components/ui/bookByTag/BookByTagUI";
import ContentUI from "@/components/ui/content/ContentUI";
import HeaderUi from "@/components/ui/header/HeaderUi";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";


const HomeScreen = () => {
    const { theme, setTheme } = useTheme();

  return (
    <View className={`flex-1 w-full ${theme === "dark" ? "bg-primary" : "bg-white"} h-full`}>
      <HeaderUi></HeaderUi>
      <ScrollView>
        <BannerUi></BannerUi>
        <View className="px-5">
          <ContentUI></ContentUI>
        </View>
        <View>
          <BookByTagUI></BookByTagUI>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
