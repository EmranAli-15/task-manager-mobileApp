import React from 'react'
import { SafeAreaView } from 'react-native'
import { ThemedView } from './ThemedView'

export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <ThemedView style={{ padding: 10 }}>
            <SafeAreaView>
                {children}
            </SafeAreaView>
        </ThemedView>
    )
}