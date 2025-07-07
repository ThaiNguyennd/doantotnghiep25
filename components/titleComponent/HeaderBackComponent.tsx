import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const HeaderBackComponent = () => {
  return (
    <View className="flex-row items-center justify-between mb-4 px-4 mt-4 fixed">
      <Ionicons
        name="arrow-back"
        size={24}
        color="white"
        onPress={() => router.back()}
      />
      <Ionicons name="search" size={24} color="white" />
    </View>
  );
};

export default HeaderBackComponent;

const styles = StyleSheet.create({});
