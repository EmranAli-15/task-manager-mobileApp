import Container from '@/components/Container';
import NoteCardSkeleton from '@/components/ui/NoteCardSkeleton';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function Notes() {
    const { id } = useLocalSearchParams();
    return (
        <Container>
            <ScrollView>
                <View style={{ flexDirection: "column", gap: 5 }}>
                    <NoteCardSkeleton></NoteCardSkeleton>
                    <NoteCardSkeleton></NoteCardSkeleton>
                    <NoteCardSkeleton></NoteCardSkeleton>
                    <NoteCardSkeleton></NoteCardSkeleton>
                </View>
            </ScrollView>
        </Container>
    )
}