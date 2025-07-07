import "@/global.css";
import { useFonts } from "expo-font";
import "react-native-reanimated";

import { ThemeProvider } from "@/components/hooks/ThemeContext";
import { UserProvider } from "@/components/hooks/userContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { LoadingProvider } from "@/components/hooks/LoadingContext";

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
        <LoadingProvider>
          <SafeAreaView
            className="bg-primary flex-1"
            style={styles.androidSafeArea}
          >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
              <Stack.Screen name="tagScreen" options={{ headerShown: false }} />
              <Stack.Screen name="tag/[id]" options={{ headerShown: false }} />
              <Stack.Screen
                name="bookScreen"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="chapterScreen"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
              <Stack.Screen name="setting" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" hidden />
          </SafeAreaView>
        </LoadingProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
});
