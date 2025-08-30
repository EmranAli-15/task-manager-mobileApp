import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }} edges={['top', 'left', 'right']}>
            {children}
        </SafeAreaView>
    )
}