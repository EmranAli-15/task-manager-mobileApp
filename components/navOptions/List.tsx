import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function List({ list, setList }: { list: string[], setList: Function }) {
    const handleChange = (text: string, index: number) => {
        let currentLists = [...list];
        currentLists[index] = text; // simpler than splice
        setList(currentLists);
    };

    const handleDelete = (index: number) => {
        setList((prev: string[]) => prev.filter((_, i) => i !== index));
    };

    return (
        <View>
            <FlatList
                data={list}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={style.row}>
                        <TextInput
                            style={[style.input, { flex: 1 }]}
                            onChangeText={(text) => handleChange(text, index)}
                            value={item}
                            multiline
                        />
                        <TouchableOpacity style={style.deleteButton} onPress={() => handleDelete(index)}>
                            <Text style={style.deleteText}>✕</Text>
                        </TouchableOpacity>
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
        marginHorizontal: 12,
        marginVertical: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "blue",
        borderRadius: 5,
        padding: 10,
        color: "blue",
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: "red",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    deleteText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
