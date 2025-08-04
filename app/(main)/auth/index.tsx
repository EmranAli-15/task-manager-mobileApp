import { ThemedText } from '@/components/ThemedText';
import Alert from '@/components/ui/Alert';
import { myButton } from '@/constants/Colors';
import { baseURL } from '@/utils/baseURL';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';


export default function index() {
    const [bg, setBg] = useState("");
    const [color, setColor] = useState("");
    const colorScheme = useColorScheme();

    const [email, setEmail] = useState("emran@gmail.com");
    const [password, setPassword] = useState("emran");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        const data = {
            email, password
        };
        setError("");

        try {
            const response = await fetch(`${baseURL}/api/loginUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Login failed!');
            }

            setLoading(false);
            setEmail("");
            setPassword("");


            const { token } = result.data;

        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        } finally {
            setTimeout(() => {
                setError("");
            }, 2000);
        }
    }

    const handleSubmit = () => {
        if (!email || !password) return;
        setLoading(true);
        handleLogin();
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
            {
                error && <Alert text={error} type="error"></Alert>
            }



            <View style={{ marginVertical: 50, alignItems: 'center' }}>
                <Image style={{ width: 100, height: 100, objectFit: 'fill' }} source={require('@/assets/images/taskManager.png')}></Image>
            </View>

            <View style={{ backgroundColor: bg }}>
                <ThemedText style={{ backgroundColor: bg }}>Email:</ThemedText>
                <TextInput
                    style={[styles.input, { color: color, backgroundColor: bg }]}
                    onChangeText={setEmail}
                    value={email}
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
                    value={password}
                    secureTextEntry
                    autoFocus={false}
                    placeholder="*********"
                    placeholderTextColor="gray"
                />
            </View>

            <View style={{ marginTop: 20, alignItems: 'center' }}>
                <TouchableOpacity disabled={loading} style={{ width: '100%' }} onPress={handleSubmit}>
                    <View style={myButton.body}>
                        {
                            loading ? <Text style={myButton.text}>Logging ...</Text> :
                                <Text style={myButton.text}>Log in</Text>
                        }
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, marginTop: 20, flexDirection: 'row', alignItems: 'baseline' }}>
                <ThemedText>Don't have account? </ThemedText>
                <Link href="/(main)/auth/Register" style={{ color: 'blue' }}>Register</Link>
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