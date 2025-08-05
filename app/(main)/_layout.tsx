import { useMyProvider } from '@/userProvider/Provider';
import { Stack } from 'expo-router';
export default function MainLayout() {
    const { user } = useMyProvider();

    return (
        <Stack screenOptions={{ headerShown: false }}>

            <Stack.Protected guard={!user}>
                <Stack.Screen name="auth/index" />
            </Stack.Protected>

            <Stack.Protected guard={user}>
                <Stack.Screen name="home/index" />
            </Stack.Protected>

        </Stack>
    );
}
