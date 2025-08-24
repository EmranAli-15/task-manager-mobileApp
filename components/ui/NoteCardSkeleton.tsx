import Entypo from '@expo/vector-icons/Entypo';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

const NoteCardSkeleton = () => {
    const pulseAnim = useRef(new Animated.Value(0.2)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 0.8,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0.2,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [pulseAnim]);

    return (
        <View style={{}}>

            <View>
                <View>
                    <View style={[styles.head, { flexDirection: "row", alignItems: "center" }]}>
                        <View style={{ width: "90%", flexDirection: "column", gap: 4 }}>
                            <Animated.View style={[{ opacity: pulseAnim, width: "30%" }, styles.animation]} />
                            <Animated.View style={[{ opacity: pulseAnim, width: "45%" }, styles.animation]} />
                            <Animated.View style={[{ opacity: pulseAnim, width: "60%" }, styles.animation]} />
                        </View>
                        <View>
                            <Entypo name="pin" size={24} color="white" />
                        </View>
                    </View>

                </View>
                <View style={[styles.body, ]}>
                    <Animated.View style={[{ opacity: pulseAnim, width: "55%" }, styles.animation]} />
                    <Animated.View style={[{ opacity: pulseAnim, width: "85%" }, styles.animation]} />
                    <Animated.View style={[{ opacity: pulseAnim, width: "50%" }, styles.animation]} />
                    <Animated.View style={[{ opacity: pulseAnim, width: "75%" }, styles.animation]} />
                    <Animated.View style={[{ opacity: pulseAnim, width: "60%" }, styles.animation]} />
                </View>
            </View>
        </View>
    );
};


export default NoteCardSkeleton;

const styles = StyleSheet.create({
    head: {
        width: "100%",
        height: 80,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 10,
        backgroundColor: "#1d293d",
    },

    body: {
        width: "100%",
        height: 170,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        padding: 10,
        backgroundColor: "#314158",
        flexDirection: "column",
        rowGap: 4
    },

    animation: {
        height: 10,
        backgroundColor: '#cad5e2',
        borderRadius: 50,
    }
});