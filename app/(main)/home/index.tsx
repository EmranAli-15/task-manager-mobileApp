import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useMyProvider } from '@/userProvider/Provider';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Button } from 'react-native';

export default function index() {
  const { setLoading } = useMyProvider();
  const ok = async () => {
    try { await SecureStore.deleteItemAsync("token"); }
    catch { }
    finally { setLoading(true); }
  }

  return (
    <ThemedView>
      <ThemedText>This is home page.</ThemedText>

      <Button onPress={ok} title='log out'></Button>
    </ThemedView>
  )
}