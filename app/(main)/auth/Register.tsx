import { ThemedText } from '@/components/ThemedText';
import Alert from '@/components/ui/Alert';
import { myButton } from '@/constants/Colors';
import { useMyProvider } from '@/userProvider/Provider';
import { baseURL } from '@/utils/baseURL';
import { Link } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';



export default function Register() {
    const [bg, setBg] = useState("");
    const { setLoading: providerLoading } = useMyProvider();
    const [color, setColor] = useState("");
    const colorScheme = useColorScheme();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("sakib");
    const [email, setEmail] = useState("sakib@gmail.com");
    const [password, setPassword] = useState("sakib");
    const [confirmPassword, setConfirmPassword] = useState("sakib");

    const resetForm = () => {
        setEmail("");
        setName("");
        setPassword("");
        setConfirmPassword("");
    }


    const handleRegister = async () => {
        const userInfo = {
            name, email, password, confirmPassword
        }


        try {
            const response = await fetch(`${baseURL}/api/createUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Login failed!');
            }

            setLoading(false);
            resetForm();

            const { data: token } = result;
            await SecureStore.setItemAsync("token", JSON.stringify(token));

        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        } finally {
            providerLoading(true);
        }

    }


    const handleSubmit = () => {
        setError("");
        if (password !== confirmPassword) return setError("password not matched.");
        if (!name) return setError("Please enter name");
        if (!email) return setError("Please write email");
        setLoading(true);
        handleRegister();
    }



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
            {error && <Alert text={error} type="error"></Alert>}

            <View style={{ marginVertical: 10, alignItems: 'center' }}>
                <Image style={{ width: 100, height: 100, objectFit: 'fill' }} source={require('@/assets/images/taskManager.png')}></Image>
            </View>

            <View style={{ backgroundColor: bg }}>
                <ThemedText style={{ backgroundColor: bg }}>Name:</ThemedText>
                <TextInput
                    style={[styles.input, { color: color, backgroundColor: bg }]}
                    onChangeText={setName}
                    value={name}
                    autoFocus={false}
                    placeholder="john doe"
                    placeholderTextColor="gray"
                />
            </View>

            <View style={{ backgroundColor: bg }}>
                <ThemedText style={{ backgroundColor: bg }}>Email:</ThemedText>
                <TextInput
                    style={[styles.input, { color: color, backgroundColor: bg }]}
                    onChangeText={setEmail}
                    value={email}
                    keyboardType='email-address'
                    autoFocus={false}
                    placeholder="john@gmail.com"
                    placeholderTextColor="gray"
                />
            </View>

            <View style={{ backgroundColor: bg, marginTop: 10 }}>
                <ThemedText style={{ backgroundColor: bg }}>Password:</ThemedText>
                <TextInput
                    style={[styles.input, { color: color, backgroundColor: bg }]}
                    onChangeText={setPassword}
                    value={password}
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
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    secureTextEntry
                    autoFocus={false}
                    placeholder="*********"
                    placeholderTextColor="gray"
                />
            </View>

            <View style={{ marginTop: 20, alignItems: 'center' }}>
                <TouchableOpacity style={{ width: '100%' }} onPress={handleSubmit}>
                    <View style={myButton.body}>
                        {
                            loading ? <Text style={myButton.text}>Loading...</Text> :
                                <Text style={myButton.text}>Register</Text>
                        }
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