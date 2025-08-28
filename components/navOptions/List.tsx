import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function List({ list, setList }: { list: string[], setList: Function }) {
    const colorScheme = useColorScheme();
    let color = "white";

    if (colorScheme == "dark") color = "white"
    else color = "black"

    const handleChange = (text: string, index: number) => {
        let currentLists = [...list];
        currentLists[index] = text;
        setList(currentLists);
    };

    const [focus, setFocus] = useState<null | number>(null)

    const handleDelete = (index: number) => {
        setList((prev: string[]) => prev.filter((_, i) => i !== index));
        setFocus(null)
    };

    return (
        <View>
            <FlatList
                scrollEnabled={false}
                data={list}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={style.row}>
                        <TextInput
                            style={[style.input, { flex: 1, color: color }]}
                            onChangeText={(text) => handleChange(text, index)}
                            value={item}
                            onFocus={() => setFocus(index)}
                            multiline
                            placeholder='type here'
                            placeholderTextColor="grey"
                        />
                        {
                            <TouchableOpacity style={style.deleteButton} onPress={() => handleDelete(index)}>
                                <Text style={style.deleteText}>✕</Text>
                            </TouchableOpacity>
                        }
                    </View>
                )}
            />
        </View>
    );
}

const style = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 6,
    },
    input: {
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: "blue",
        borderRadius: 5,
        padding: 5,
        fontSize: 16,
        textAlign: "justify",
        marginRight: 1
    },
    deleteButton: {
        backgroundColor: "red",
        borderRadius: 5,
        paddingHorizontal: 6,
        paddingVertical: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    deleteText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
