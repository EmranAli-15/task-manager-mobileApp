import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ThemedText';

export default function Color({ colorPalettle, setColorPalettle, color, setColor }: { colorPalettle: boolean, setColorPalettle: Function, color: string, setColor: Function }) {
    return (
        <View>
            <TouchableOpacity onPress={() => setColorPalettle(!colorPalettle)} style={{ flexDirection: "row" }}>
                <View style={style.button}>
                    <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                        <ThemedText>Color</ThemedText>
                        <Ionicons name="color-palette-sharp" size={20} color={color} />
                    </View>
                </View>
            </TouchableOpacity>

            {
                colorPalettle && <View>
                    <ThemedText>Hello</ThemedText>
                </View>
            }

        </View>
    )
}


const style = StyleSheet.create({
    button: {
        borderColor: "blue",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "center"
    }
})