import Container from '@/components/Container';
import { ThemedText } from '@/components/ThemedText';
import NoteCardSkeleton from '@/components/ui/NoteCardSkeleton';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function Notes() {
    const { id } = useLocalSearchParams();
    return (
        <Container>
            <View>
                <ThemedText>{id}</ThemedText>
            </View>
            <NoteCardSkeleton></NoteCardSkeleton>
        </Container>
    )
}