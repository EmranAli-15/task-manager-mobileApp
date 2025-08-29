import Container from '@/components/Container';
import Category from '@/components/navOptions/Category';
import Color from '@/components/navOptions/Color';
import List from '@/components/navOptions/List';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Alert from '@/components/ui/Alert';
import { useMyProvider } from '@/userProvider/Provider';
import { baseURL } from '@/utils/baseURL';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function InsideNote() {
    const colorScheme = useColorScheme();
    const navigate = useNavigation();
    let themeColor = "white";
    if (colorScheme == "dark") themeColor = "white"
    else themeColor = "black"

    const { user } = useMyProvider();
    const { id } = useLocalSearchParams();

    const [modal, setModal] = useState(false);


    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [noteId, setNoteId] = useState("");
    const [colorPattle, setColorPattle] = useState(false);
    const [title, setTitle] = useState("");
    const [color, setColor] = useState({ header: "#ffdf20", body: "#fff085" });
    const [category, setCategory] = useState({ value: "Home work", key: "687231b05282890fad825d83" });
    const [details, setDetails] = useState("");
    const [list, setList] = useState<string[]>([]);


    const handleList = () => {
        setList([...list, ""])
    }

    const handleDelete = async () => {
        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${baseURL}/api/deleteNote/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Note delete failed!');
            }
            navigate.goBack();
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        } finally {
            setTimeout(() => {
                setError("");
            }, 2000)
        }
    }

    const handleUpdate = async () => {
        setError("");
        setUpdateLoading(true);
        const data = { title, lists: list, details, categoryId: category.key, userId: user.id, color };

        if (!title && list.length == 0 && !details) {
            setError("Empty note can't be save!");
            setUpdateLoading(false);
            setTimeout(() => setError(""), 2000);
        }
        else {
            try {
                const response = await fetch(`${baseURL}/api/updateNote/${noteId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Note update failed!');
                }

            } catch (error: any) {
                setError(error.message);
            } finally {
                setUpdateLoading(false);
                setSuccess(false);
                setError("");
            }
        }
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

            if (categoryKey == "687231b05282890fad825d83") categoryValue = "Home work";
            else if (categoryKey == "687231b05282890fad825d82") categoryValue = "Exams";
            else if (categoryKey == "687231b05282890fad825d85") categoryValue = "Work space";
            else if (categoryKey == "687231b05282890fad825d84") categoryValue = "Idea";
            else if (categoryKey == "687231b05282890fad825d87") categoryValue = "Hobby";
            else categoryValue = "Business";

            setTitle(result.data.title);
            setDetails(result.data.details);
            setList(result.data.lists);
            setColor(result.data.color);
            setNoteId(result.data._id);
            setCategory({ value: categoryValue, key: result.data.categoryId });

        } catch (error: any) {
            setError("Something happened wrong!");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleFetchData();
    }, [id])

    return (
        <Container>
            {
                updateLoading && <Alert text='Updating' type='loading'></Alert>
            }
            {
                loading && <Alert text='Loading' type='loading'></Alert>
            }
            {
                error && <Alert text="Empty note can't save" type='warning'></Alert>
            }

            {
                modal && <View style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: "100%",
                    width: "110%",
                    zIndex: 30,
                }}>
                    <TouchableOpacity onPress={() => setModal(!modal)} style={style.customModal}>

                    </TouchableOpacity>
                    <View style={style.insideModal}>
                        <View>
                            <AntDesign name="warning" size={30} color="yellow" />
                        </View>

                        <ThemedText>Want to delete note?</ThemedText>

                        <View style={{ marginTop: 10, flexDirection: "row", columnGap: 30 }}>
                            <TouchableOpacity
                                onPress={handleDelete}
                                style={{ borderColor: "red", borderWidth: 2, borderRadius: 8, justifyContent: "center", paddingHorizontal: 10, backgroundColor: "#ff74748a", height: 40 }}>
                                <ThemedText>Yes Delete!</ThemedText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setModal(false)}
                                style={{ borderColor: "yellow", borderWidth: 2, borderRadius: 8, justifyContent: "center", paddingHorizontal: 10, backgroundColor: "#eeff0063", height: 40 }}>
                                <ThemedText>Cancle</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
                style={{ overflow: "visible", zIndex: 10, }}
            >
                <View>
                    <TouchableOpacity onPress={handleUpdate}>
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

                <View>
                    <TouchableOpacity onPress={() => setModal(true)}>
                        <View style={[style.button, { borderColor: "blue" }]}>
                            <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                                <ThemedText>Delete</ThemedText>
                                <MaterialIcons name="delete" size={20} color="red" />
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