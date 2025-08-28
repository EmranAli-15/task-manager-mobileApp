import Container from '@/components/Container';
import Category from '@/components/navOptions/Category';
import Color from '@/components/navOptions/Color';
import List from '@/components/navOptions/List';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { baseURL } from '@/utils/baseURL';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function InsideNote() {
    const colorScheme = useColorScheme();
    let themeColor = "white";
    if (colorScheme == "dark") themeColor = "white"
    else themeColor = "black"

    const { id } = useLocalSearchParams();


    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [colorPattle, setColorPattle] = useState(false);
    const [title, setTitle] = useState("");
    const [color, setColor] = useState({ header: "#ffdf20", body: "#fff085" });
    const [category, setCategory] = useState({ value: "Home work", key: "687231b05282890fad825d83" });
    const [details, setDetails] = useState("");
    const [list, setList] = useState<string[]>([]);


    const handleList = () => {
        setList([...list, ""])
    }

    const handleFetchData = async () => {
        try {
            const response = await fetch(`${baseURL}/api/getSingleNote/${id}`);
            const result = await response.json();

            if (!response.ok) {
                throw new Error("Note not found!");
            }

            const categoryKey = result.data.categoryId;
            let categoryValue = ""

            // <option value="687231b05282890fad825d83">Home work</option>
            // <option value="687231b05282890fad825d82">Exams</option>
            // <option value="687231b05282890fad825d85">Work space</option>
            // <option value="687231b05282890fad825d84">Idea</option>
            // <option value="687231b05282890fad825d87">Hobby</option>
            // <option value="687231b05282890fad825d86">Business</option>

            if (categoryKey == "687231b05282890fad825d83") categoryValue = "Home work";
            else if (categoryKey == "687231b05282890fad825d82") categoryValue = "Exams";
            else if (categoryKey == "687231b05282890fad825d85") categoryValue = "Work space";
            else if (categoryKey == "687231b05282890fad825d84") categoryValue = "Idea";
            else if (categoryKey == "687231b05282890fad825d87") categoryValue = "Hobby";
            else categoryValue = "Business";

            setTitle(result.data.title);
            setDetails(result.data.details);
            setList(result.data.lists);
            setColor(result.data.color)
            setCategory({ value: categoryValue, key: result.data.categoryId })

        } catch (error: any) {
            setError("Something happened wrong!");
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        }
    }

    useEffect(() => {
        handleFetchData();
    }, [id])

    return (
        <Container>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
                style={{ overflow: "visible", zIndex: 1000 }}
            >
                <View>
                    <Color colorPalettle={colorPattle} setColorPalettle={setColorPattle} color={color} setColor={setColor}></Color>
                </View>

                <View>
                    <Category category={category} setCategory={setCategory}></Category>
                </View>

                <View>
                    <TouchableOpacity onPress={handleList} style={style.buttonWidth}>
                        <View style={style.button}>
                            <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                                <ThemedText>List</ThemedText>
                                <MaterialIcons name="checklist" size={20} color="blue" />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* THIS SECTION CAN SHRINK AND I NEED TO MAKE IT SCROLLABLE */}

            <ScrollView>
                <View style={{ marginTop: 20 }}>
                    <View>
                        <TextInput
                            style={[{ color: color.header }, style.title]}
                            onChangeText={(text) => setTitle(text)}
                            value={title}
                            textAlignVertical='top'
                            autoFocus={false}
                            multiline
                            placeholder='Title ...'
                            placeholderTextColor="grey"
                        />
                    </View>

                    <View>
                        <List list={list} setList={setList}></List>
                    </View>

                    <ThemedView style={{ borderRadius: 8 }}>
                        <TextInput
                            style={[style.details, { color: themeColor }]}
                            onChangeText={(text) => setDetails(text)}
                            value={details}
                            textAlignVertical='top'
                            autoFocus={false}
                            multiline
                            placeholder='Details ...'
                            placeholderTextColor="grey"
                        />
                    </ThemedView>
                </View>
            </ScrollView>

        </Container>
    )
}


const style = StyleSheet.create({
    title: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        fontSize: 18,
        fontWeight: "bold"
    },
    details: {
        minHeight: 400,
        fontSize: 16,
        marginBottom: 50,
        padding: 10,
    },
    input: {
        height: "auto",
        margin: 12,
        borderWidth: 1,
        borderColor: "blue",
        padding: 10,
        color: "blue"
    },
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
    buttonWidth: {
        alignSelf: "flex-start"
    }
});