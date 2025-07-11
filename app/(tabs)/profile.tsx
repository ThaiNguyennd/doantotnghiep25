import { useUser } from "@/components/hooks/userContext";
import ProfileComponent from "@/components/profile/ProfileComponent";
import { router } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TabTwoScreen() {
  const { user } = useUser();

  return (
    <View className="flex-1 bg-primary">
      {/* Ảnh nền sách mờ */}
      {user?._id ? (
        <ProfileComponent></ProfileComponent>
      ) : (
        <ImageBackground
          source={{
            uri: "https://lh4.googleusercontent.com/proxy/5S9FWwPApzHltHyw8XM1SB33MVVCj7vRpJKwt9eRD5VpBH7onwjSS2B1fv09F2VF--OnYQFH1LFtalSNhpKT6dNzj5Q",
          }} // Thay bằng ảnh nền thực tế
          className="flex-1 items-center  justify-center object-contain"
          imageStyle={{ opacity: 0.2 }}
        >
          <View className="px-6  items-center">
            <Text className="text-white text-xl mb-2">
              Chào mừng bạn đến với
            </Text>
            <Text className="text-[60px] font-black text-white mt-5">WAKA</Text>

            <Text className="text-white text-xl font-bold mt-10">
              Tài khoản cá nhân
            </Text>
            <Text className="text-gray-300 text-center mt-2">
              Bạn phải đăng nhập để truy cập tài khoản cá nhân.{"\n"}Bạn có muốn
              tiếp tục?
            </Text>

            {/* Nút đăng nhập */}
            <View className="bg-blue-600 mt-6 px-10 py-3 rounded-full">
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text className="text-white font-semibold text-lg">
                  ĐĂNG NHẬP
                </Text>
              </TouchableOpacity>
            </View>

            {/* Nút hủy */}
            {/* <TouchableOpacity
            // onPress={() => navigation.goBack()}
            className="mt-4"
          >
            <Text className="text-emerald-400 text-base">Huỷ bỏ</Text>
          </TouchableOpacity> */}
          </View>
        </ImageBackground>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
