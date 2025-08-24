import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

const HomeCardSkeleton = () => {
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
                    <View style={styles.head}>
                        <Animated.View style={[{ opacity: pulseAnim, width: "100%" }, styles.animation]} />
                    </View>

                </View>
                <View style={[styles.body]}>
                    <Animated.View style={
                        {
                            opacity: pulseAnim,
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            backgroundColor: "#cad5e2"
                        }} />
                </View>
            </View>
        </View>
    );
};


export default HomeCardSkeleton;

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
    },

    animation: {
        height: 50,
        backgroundColor: '#cad5e2',
        borderRadius: 10,
    }
});