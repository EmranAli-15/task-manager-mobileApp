import Container from '@/components/Container';
import { ThemedText } from '@/components/ThemedText';
import Alert from '@/components/ui/Alert';
import NoteCardSkeleton from '@/components/ui/NoteCardSkeleton';
import { useMyProvider } from '@/userProvider/Provider';
import { baseURL } from '@/utils/baseURL';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';

export default function Notes() {
    const { id } = useLocalSearchParams();
    const { user } = useMyProvider();

    const [notes, setNotes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);




    const handleFetchData = async () => {
        try {
            const data = { userId: user.id, categoryId: id };
            const response = await fetch(`${baseURL}/api/getNotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Data retrieved failed!');
            }

            setNotes(result.data);
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }
    }

    useEffect(() => {
        handleFetchData();
    }, [user?.id, id]);



    return (
        <Container>
            {
                loading ? <ScrollView>
                    <View style={{ flexDirection: "column", gap: 5 }}>
                        <NoteCardSkeleton></NoteCardSkeleton>
                        <NoteCardSkeleton></NoteCardSkeleton>
                        <NoteCardSkeleton></NoteCardSkeleton>
                        <NoteCardSkeleton></NoteCardSkeleton>
                    </View>
                </ScrollView> :
                    <FlatList
                        data={notes}
                        keyExtractor={(item: any, index) => index.toString()}
                        ListEmptyComponent={<Alert type="warning" text='You have not any notes!' />}
                        renderItem={({ item }) => (
                            <ThemedText>
                                {item.title}
                            </ThemedText>
                        )}
                    />
            }
        </Container>
    )
}