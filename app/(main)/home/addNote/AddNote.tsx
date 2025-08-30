import Container from '@/components/Container'
import Category from '@/components/navOptions/Category'
import Color from '@/components/navOptions/Color'
import { ThemedText } from '@/components/ThemedText'
import { useMyProvider } from '@/userProvider/Provider'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native'

export default function AddNote() {

    const colorScheme = useColorScheme();
    const navigate = useNavigation();
    let themeColor = "white";
    if (colorScheme == "dark") themeColor = "white"
    else themeColor = "black"

    const { user } = useMyProvider();
    const [me, setMe] = useState(true);


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


    return (
        <Container>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
                style={{ overflow: "visible", zIndex: 10, }}
            >
                <View>
                    <TouchableOpacity>
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
                    <TouchableOpacity onPress={() => setMe(!me)} style={style.buttonWidth}>
                        <View style={[style.button, { borderColor: "blue" }]}>
                            {
                                me ? <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                                    <ThemedText>My</ThemedText>
                                    <FontAwesome name="user" size={20} color="red" />
                                </View> :
                                    <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                                        <ThemedText>Friends</ThemedText>
                                        <FontAwesome name="users" size={20} color="yellow" />
                                    </View>
                            }
                        </View>
                    </TouchableOpacity>
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