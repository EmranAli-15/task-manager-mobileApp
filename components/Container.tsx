import React from 'react'
import { SafeAreaView, View } from 'react-native'

export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <View style={{ padding: 10, flex: 1 }}>
            <SafeAreaView>
                {children}
            </SafeAreaView>
        </View>
    )
}