import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const isLoggedIn = false;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>

        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="login" />
        </Stack.Protected>

      </Stack>
      <StatusBar></StatusBar>
    </ThemeProvider>
  );
}
