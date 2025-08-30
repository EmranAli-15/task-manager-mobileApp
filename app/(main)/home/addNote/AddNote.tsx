import Container from '@/components/Container'
import Category from '@/components/navOptions/Category'
import Color from '@/components/navOptions/Color'
import List from '@/components/navOptions/List'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import Alert from '@/components/ui/Alert'
import { useMyProvider } from '@/userProvider/Provider'
import { baseURL } from '@/utils/baseURL'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'

export default function AddNote() {

    const colorScheme = useColorScheme();
    const navigate = useNavigation();
    let themeColor = "white";
    if (colorScheme == "dark") themeColor = "white"
    else themeColor = "black"

    const { user } = useMyProvider();


    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");


    const [colorPattle, setColorPattle] = useState(false);
    const [title, setTitle] = useState("");
    const [color, setColor] = useState({ header: "#ffdf20", body: "#fff085" });
    const [category, setCategory] = useState({ value: "Home work", key: "687231b05282890fad825d83" });
    const [details, setDetails] = useState("");
    const [list, setList] = useState<string[]>([]);


    const handleList = () => {
        setList([...list, ""])
    }


    const handleUpload = async () => {
        setError("");
        setSuccess("");
        setLoading(true);
        const data = { title, lists: list, details, categoryId: category.key, userId: user.id, color };

        if (!title && list.length == 0 && !details) {
            setError("Empty note can't save!");
            setLoading(false);
            setTimeout(() => setError(""), 3000);
        }
        else {
            try {
                const response = await fetch(`${baseURL}/api/createNote`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Note upload failed!');
                }

                setLoading(false);
                setSuccess("Note saved!");
                setTitle("");
                setDetails("");
                setList([]);

            } catch (error: any) {
                setLoading(false);
                setError(error.message);
            } finally {
                setTimeout(() => {
                    setError("");
                    setSuccess("")
                }, 2000)
            }
        }
    }


    return (
        <Container>

            {
                loading && <Alert text='Uploading' type='loading'></Alert>
            }
            {
                error && <Alert text='Something wrong' type='error'></Alert>
            }
            {
                success && <Alert text='Saved' type='success'></Alert>
            }

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
                style={{ overflow: "visible", zIndex: 10, }}
            >
                <View>
                    <TouchableOpacity onPress={handleUpload}>
                        <View style={[style.button, { borderColor: "red" }]}>
                            <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                                <ThemedText>Save</ThemedText>
                                <Ionicons name="server" size={20} color="red" />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View>
                    <Color colorPalettle={colorPattle} setColorPalettle={setColorPattle} color={color} setColor={setColor}></Color>
                </View>

                <View>
                    <Category category={category} setCategory={setCategory}></Category>
                </View>

                <View>
                    <TouchableOpacity onPress={handleList} style={style.buttonWidth}>
                        <View style={[style.button, { borderColor: "blue" }]}>
                            <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                                <ThemedText>List</ThemedText>
                                <MaterialIcons name="checklist" size={20} color="blue" />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>


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
    customModal: {
        position: "absolute",
        top: 0,
        width: "120%",
        height: "100%",
        right: 10,
        overflow: "visible",
        backgroundColor: "#000000dc",
    },
    insideModal: {
        backgroundColor: "#076ff8ff",
        padding: 30,
        top: "20%",
        borderRadius: 5,
        left: "5%",
        width: "80%",
        // height: "auto",
        alignItems: "center",
    },
    buttonWidth: {
        alignSelf: "flex-start"
    }
});