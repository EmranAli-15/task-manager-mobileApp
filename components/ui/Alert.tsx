import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Text, View } from 'react-native';

type TType = "success" | "error" | "warning";

export default function Alert({ text, type }: { text: string; type: TType }) {
    return (
        <View
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                alignItems: 'center',
                zIndex: 9999,
            }}
        >
            <View
                style={{
                    backgroundColor: type === 'error' ? '#fdeded' : type === 'success' ? '#edf7ed' : '#fff4e5',
                    height: 35,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    width: '95%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 5
                }}
            >
                <Text>
                    {
                        type === 'error' ? <MaterialIcons name="error" size={24} color="red" /> :
                            type === 'success' ? <MaterialIcons name="done" size={24} color="green" /> :
                                <Ionicons name="warning" size={24} color="#ed6c02" />
                    }
                </Text>
                <Text style={{ color: 'black' }}>
                    {text}
                </Text>
            </View>
        </View>
    );
}
