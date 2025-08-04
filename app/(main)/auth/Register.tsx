import { ThemedText } from '@/components/ThemedText';
import { myButton } from '@/constants/Colors';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';



export default function Register() {
    const [bg, setBg] = useState("");
    const [color, setColor] = useState("");
    const colorScheme = useColorScheme();

    const [text, setText] = useState("");
    const [passWord, setPassword] = useState("");

    useEffect(() => {
        if (colorScheme == 'dark') {
            setColor("#ECEDEE");
            setBg("#11181C");
        }
        else {
            setColor("#11181C");
            setBg("#ECEDEE")
        }
    }, [colorScheme])

    return (
        <View style={[styles.container, { backgroundColor: bg }]}>

            <View style={{ marginVertical: 10, alignItems: 'center' }}>
                <Image style={{ width: 100, height: 100, objectFit: 'fill' }} source={require('@/assets/images/taskManager.png')}></Image>
            </View>

            <View style={{ backgroundColor: bg }}>
                <ThemedText style={{ backgroundColor: bg }}>Email:</ThemedText>
                <TextInput
                    style={[styles.input, { color: color, backgroundColor: bg }]}
                    onChangeText={setText}
                    value={text}
                    autoFocus={false}
                    placeholder="john doe"
                    placeholderTextColor="gray"
                />
            </View>

            <View style={{ backgroundColor: bg }}>
                <ThemedText style={{ backgroundColor: bg }}>Email:</ThemedText>
                <TextInput
                    style={[styles.input, { color: color, backgroundColor: bg }]}
                    onChangeText={setText}
                    value={text}
                    keyboardType='email-address'
                    autoFocus={false}
                    placeholder="example@gmail.com"
                    placeholderTextColor="gray"
                />
            </View>

            <View style={{ backgroundColor: bg, marginTop: 10 }}>
                <ThemedText style={{ backgroundColor: bg }}>Password:</ThemedText>
                <TextInput
                    style={[styles.input, { color: color, backgroundColor: bg }]}
                    onChangeText={setPassword}
                    value={passWord}
                    secureTextEntry
                    autoFocus={false}
                    placeholder="*********"
                    placeholderTextColor="gray"
                />
            </View>

            <View style={{ backgroundColor: bg, marginTop: 10 }}>
                <ThemedText style={{ backgroundColor: bg }}>Confirm Password:</ThemedText>
                <TextInput
                    style={[styles.input, { color: color, backgroundColor: bg }]}
                    onChangeText={setPassword}
                    value={passWord}
                    secureTextEntry
                    autoFocus={false}
                    placeholder="*********"
                    placeholderTextColor="gray"
                />
            </View>

            <View style={{ marginTop: 20, alignItems: 'center' }}>
                <TouchableOpacity style={{ width: '100%' }} onPress={() => setText("emran@gmail.com")}>
                    <View style={myButton.body}>
                        <Text style={myButton.text}>Register</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, marginTop: 20, flexDirection: 'row', alignItems: 'baseline' }}>
                <ThemedText>Have an account? </ThemedText>
                <Link href="/(main)/auth" style={{ color: 'blue' }}>Login</Link>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderRadius: 8,
        borderWidth: 1,
        padding: 10,
        width: '100%',
    },
    button: {
        height: 20
    }
});