import "@/global.css";
import { useFonts } from "expo-font";
import "react-native-reanimated";

import { LoadingProvider } from "@/components/hooks/LoadingContext";
import { SettingProvider } from "@/components/hooks/SettingContext";
import { ThemeProvider } from "@/components/hooks/ThemeContext";
import { UserProvider } from "@/components/hooks/userContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView, StyleSheet } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider>
      <UserProvider>
        <SettingProvider>
          <LoadingProvider>
            <SafeAreaView style={styles.androidSafeArea}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
                <Stack.Screen
                  name="tagScreen"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="tag/[id]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="bookScreen"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="chapterScreen"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen
                  name="register"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="setting" options={{ headerShown: false }} />
              </Stack>
              <StatusBar style="auto" hidden />
            </SafeAreaView>
          </LoadingProvider>
        </SettingProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 50 : 0,
    backgroundColor: "#030014",
  },
});
