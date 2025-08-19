import { Text, View } from "react-native";

export default function HomeCardSkeleton() {
    return (
        <View>
            {
                Array(6).fill(null).map((item: any, index: any) => (
                    <View key={index}>
                        <View>
                            <Text></Text>
                        </View>
                    </View>
                ))
            }
        </View>
    )
}
