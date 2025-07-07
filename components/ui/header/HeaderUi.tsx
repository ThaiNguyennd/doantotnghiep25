import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const HeaderUi = () => {
  return (
    <View className="flex-row items-center justify-between bg-[rgb(44,59,40)] px-4 py-4 rounded fixed">
      {/* Menu grid icon */}
      <Link href={"/tagScreen"}>
        <Ionicons name="grid" size={24} color="#fff" />
      </Link>

      {/* Button Gói cước */}
      <TouchableOpacity className="flex-row items-center border border-yellow-400 px-8 py-1 rounded-full">
        <MaterialIcons name="emoji-events" size={16} color="#facc15" />
        <Text className="text-yellow-300 ml-2 font-semibold text-xl">Waka</Text>
      </TouchableOpacity>

      {/* Giỏ hàng và tìm kiếm */}
      <View className="flex-row items-center space-x-4 gap-2">
        <Feather name="search" size={20} color="#fff" />
      </View>
    </View>
  );
};

export default HeaderUi;
