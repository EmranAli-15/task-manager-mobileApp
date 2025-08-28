import Container from '@/components/Container';
import Category from '@/components/navOptions/Category';
import Color from '@/components/navOptions/Color';
import List from '@/components/navOptions/List';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function InsideNote() {

    const [colorPattle, setColorPattle] = useState(false);
    const [color, setColor] = useState({ header: "#ffdf20", body: "#fff085" });
    const [category, setCategory] = useState({
        value: "Home work",
        key: "687231b05282890fad825d83"
    });
    const [list, setList] = useState<string[]>([]);


    const handleList = () => {
        setList([...list, ""])
    }


    const [details, setDetails] = useState("");


    return (
        <Container>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
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
                        <List list={list} setList={setList}></List>
                    </View>

                    <ThemedView>
                        <TextInput
                            style={{ minHeight: 400, color: color.header, fontSize: 16, marginBottom: 50 }}
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