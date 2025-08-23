import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

const SkeletonCard = () => {
    const pulseAnim = useRef(new Animated.Value(0.5)).current;

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
                    toValue: 0.5,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [pulseAnim]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', marginTop: 100, alignItems: 'center' }}>
            <Animated.View
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: 'gray',
                    borderRadius: 50,
                    opacity: pulseAnim
                }}
            />
        </View>
    );
};


export default SkeletonCard;