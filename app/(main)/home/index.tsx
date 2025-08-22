import Container from '@/components/Container';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useMyProvider } from '@/userProvider/Provider';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import Alert from '@/components/ui/Alert';
import { baseURL } from '@/utils/baseURL';

type TCard = {
  name: string,
  image: string,
  _id: string,
  index: number,
}

export default function index() {
  const [option, setOption] = useState(false);

  const { user, setLoading: providerLoading } = useMyProvider();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  const handleFetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/api/userNotes/${user.id}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Data retrieved failed!');
      }

      setCategories(result.data.categories);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  }


  useEffect(() => {
    handleFetchData();
  }, [user.id])

  const logout = async () => {
    try { await SecureStore.deleteItemAsync("token"); }
    catch { }
    finally { providerLoading(true); }
  }

  return (
    <Container>

      {/* This is for logout option */}
      <View>
        {
          option &&
          <ThemedView
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              alignItems: 'center',
              borderRadius: 5,
              zIndex: 9999,
              height: 50
            }}>

            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
              <TouchableOpacity onPress={logout}>
                <Text style={{ color: 'blue' }}>Logout</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setOption(false)}>
                <Text style={{ color: 'blue' }}>close</Text>
              </TouchableOpacity>
            </View>
          </ThemedView>
        }
      </View>


      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => setOption(true)}>
          <View>
            {
              <Fontisto name="power" size={20} color="blue" />
            }
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={{ borderColor: "blue", borderWidth: 1, padding: 5, borderRadius: 5 }}>
            {
              <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                <ThemedText>Add Note</ThemedText>
                <AntDesign name="plussquare" size={20} color="blue" />
              </View>
            }
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item: TCard, index) => index.toString()}
        ListEmptyComponent={<Alert type="warning" text='You have not any notes!' />}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Image style={{ width: '60%', height: 200 }} source={require('@/assets/images/workSpace.png')} />
            </View>

            <View style={{ position: "absolute" }}>
              <View style={{ flexDirection: "column", justifyContent: "center", backgroundColor: "#000000a1", height: 50, width: "100%" }}>
                <ThemedText style={{ fontSize: 22, fontWeight: "bold" }}>{item.name}</ThemedText>
              </View>
            </View>
          </View>
        )}
      />



    </Container>
  )
}