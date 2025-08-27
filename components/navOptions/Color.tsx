import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ThemedText';

export default function Color({ colorPalettle, setColorPalettle, color, setColor }: { colorPalettle: boolean, setColorPalettle: Function, color: { header: string, body: string }, setColor: Function }) {


    const handleColorCode = (color: string) => {
        if (color == 'yellow') {
            setColor({ header: "#ffdf20", body: "#fff085" })
        }
        else if (color == 'green') {
            setColor({ header: "#05df72", body: "#7bf1a8" })
        }
        else if (color == 'red') {
            setColor({ header: "#ff6467", body: "#ffa2a2" })
        }
        else if (color == 'white') {
            setColor({ header: "#fff", body: "#e2e8f0" })
        }
        else {
            setColor({ header: "#314158", body: "#1d293d" })
        }
        setColorPalettle(false);
    }


    return (
        <View>
            <TouchableOpacity onPress={() => setColorPalettle(!colorPalettle)} style={style.buttonWidth}>
                <View style={style.button}>
                    <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                        <ThemedText>Color</ThemedText>
                        <Ionicons name="color-palette-sharp" size={20} color={color.header} />
                    </View>
                </View>
            </TouchableOpacity>

            {
                colorPalettle && <View>
                    <TouchableOpacity onPress={() => handleColorCode("yellow")} style={style.buttonWidth}>
                        <View style={[style.colorButton, { backgroundColor: "yellow" }]}>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleColorCode("green")} style={style.buttonWidth}>
                        <View style={[style.colorButton, { backgroundColor: "green" }]}>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleColorCode("red")} style={style.buttonWidth}>
                        <View style={[style.colorButton, { backgroundColor: "red" }]}>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleColorCode("white")} style={style.buttonWidth}>
                        <View style={[style.colorButton, { backgroundColor: "#e2e8f0" }]}>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleColorCode("black")} style={style.buttonWidth}>
                        <View style={[style.colorButton, { backgroundColor: "#314158" }]}>
                        </View>
                    </TouchableOpacity>
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
    },
    colorButton: {
        flexDirection: 'row',
        columnGap: 5,
        alignItems: 'center',
        height: 30,
        width: 85
    },
    buttonWidth: {
        alignSelf: "flex-start"
    }
})