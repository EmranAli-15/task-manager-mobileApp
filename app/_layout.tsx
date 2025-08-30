import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { MyProvider } from '@/userProvider/Provider';
import { StatusBar } from 'react-native';





function InnerLayout({ colorScheme }: { colorScheme: string }) {
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
      <StatusBar backgroundColor="black"></StatusBar>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <MyProvider>
      <InnerLayout colorScheme={colorScheme as string} />
    </MyProvider>
  );
}

