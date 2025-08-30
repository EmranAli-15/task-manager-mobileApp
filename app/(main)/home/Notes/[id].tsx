import Container from '@/components/Container';
import { ThemedText } from '@/components/ThemedText';
import Alert from '@/components/ui/Alert';
import NoteCardSkeleton from '@/components/ui/NoteCardSkeleton';
import { useMyProvider } from '@/userProvider/Provider';
import { baseURL } from '@/utils/baseURL';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Notes() {
    const { id } = useLocalSearchParams();
    const { user } = useMyProvider();
    const navigate = useNavigation()

    const [notes, setNotes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoaing] = useState(false);
    const [refreshing, setRefreshing] = useState(false);




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
        } finally {
            setRefreshing(false)
        }
    }

    const deleteCategory = async () => {
        try {
            setDeleteLoaing(true);
            const response = await fetch(`${baseURL}/api/deleteCategory`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ categoryId: id, userId: user.id })
                }
            )

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Category delete failed!');
            }
            navigate.goBack();

        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        } finally {
            setDeleteLoaing(false);
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        handleFetchData()
    }, []);

    useEffect(() => {
        handleFetchData();
    }, [user?.id, id]);



    return (
        <Container>
            {
                error && <Alert text={error} type='error'></Alert>
            }
            {
                loading ? <ScrollView>
                    <View style={{ flexDirection: "column", gap: 5 }}>
                        <NoteCardSkeleton></NoteCardSkeleton>
                        <NoteCardSkeleton></NoteCardSkeleton>
                        <NoteCardSkeleton></NoteCardSkeleton>
                        <NoteCardSkeleton></NoteCardSkeleton>
                    </View>
                </ScrollView> :
                    notes.length === 0 ?
                        <View>
                            <Alert text='There are no notes.' type='warning'></Alert>
                            <View style={{ alignItems: "center", marginTop: 50 }}>
                                <TouchableOpacity onPress={deleteCategory}>
                                    <ThemedText style={style.button}>
                                        {deleteLoading ? "Wait a moment" : "Delete this category"}
                                    </ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View> :
                        <FlatList
                            style={{ minHeight: "100%" }}
                            data={notes}
                            keyExtractor={(item: any, index) => index.toString()}
                            renderItem={({ item }) => (
                                <Link href={{
                                    pathname: `/(main)/home/InsedeNote/[id]`,
                                    params: { id: item._id },
                                }}
                                >
                                    <View style={{ marginBottom: 10, width: "100%" }}>
                                        <View style={[style.head, { backgroundColor: item.color.header }]}>
                                            <Text style={style.title}>
                                                {
                                                    item.title.length > 70 ? <Text>{item.title.slice(0, 70)} ...</Text> : item.title
                                                }
                                            </Text>
                                        </View>
                                        <View style={[style.body, { backgroundColor: item.color.body }]}>
                                            <Text>
                                                {
                                                    item.details.length > 150 ? item.details.slice(0, 150) : item.details
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                </Link>
                            )}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        />
            }
        </Container>
    )
}

const style = StyleSheet.create({
    title: {
        fontWeight: '700',
        fontSize: 18,
    },
    head: {
        width: "100%",
        height: 80,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 10,
        flex: 1,
        justifyContent: "center"
    },
    body: {
        width: "100%",
        height: 180,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        padding: 10,
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        alignSelf: "flex-start",
        backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "center"
    },
    lines: {
        height: 10,
        borderRadius: 50,
    }
})