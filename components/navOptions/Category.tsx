import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { ThemedText } from '../ThemedText';

export default function Category({ category, setCategory }: { category: { value: string, key: string }, setCategory: Function }) {
    const colorScheme = useColorScheme();
    let themeColor = "white";
    if (colorScheme == "dark") themeColor = "black"
    else themeColor = "white"

    const [categoryOps, setCategoryOps] = useState(false);

    const handleCategory = (data: { value: string, key: string }) => {
        setCategory(data)
        setCategoryOps(false);
    }

    return (
        <View>

            <TouchableOpacity onPress={() => setCategoryOps(!categoryOps)} style={style.buttonWidth}>
                <View style={style.button}>
                    <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                        <ThemedText>{category.value}</ThemedText>
                        <AntDesign name="down" size={15} color="blue" />
                    </View>
                </View>
            </TouchableOpacity>

            {
                categoryOps &&
                // <option value="687231b05282890fad825d83">Home work</option>
                // <option value="687231b05282890fad825d82">Exams</option>
                // <option value="687231b05282890fad825d85">Work space</option>
                // <option value="687231b05282890fad825d84">Idea</option>
                // <option value="687231b05282890fad825d87">Hobby</option>
                // <option value="687231b05282890fad825d86">Business</option>
                <View style={[style.categoryBox, {backgroundColor: themeColor}]}>
                    <TouchableOpacity
                        onPress={() => handleCategory({ value: "Home work", key: "687231b05282890fad825d83" })}>
                        <ThemedText style={style.categoryLists}>Home work</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleCategory({ value: "Exams", key: "687231b05282890fad825d82" })}>
                        <ThemedText style={style.categoryLists}>Exams</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleCategory({ value: "Work space", key: "687231b05282890fad825d85" })}>
                        <ThemedText style={style.categoryLists}>Work space</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleCategory({ value: "Idea", key: "687231b05282890fad825d84" })}>
                        <ThemedText style={style.categoryLists}>Idea</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleCategory({ value: "Hobby", key: "687231b05282890fad825d87" })}>
                        <ThemedText style={style.categoryLists}>Hobby</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleCategory({ value: "Business", key: "687231b05282890fad825d86" })}>
                        <ThemedText style={style.categoryLists}>Business</ThemedText>
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
    categoryLists: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        height: 30,
        borderColor: "grey",
        borderRadius: 3,
        borderWidth: 1
    },
    categoryBox: {
        position: "absolute",
        borderRadius: 5,
        zIndex: 999,
        top: 40,
    },
    buttonWidth: {
        alignSelf: "flex-start"
    }
})