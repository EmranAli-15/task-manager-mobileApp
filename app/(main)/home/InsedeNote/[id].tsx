import Container from '@/components/Container';
import Category from '@/components/navOptions/Category';
import Color from '@/components/navOptions/Color';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function InsideNote() {

    const [colorPattle, setColorPattle] = useState(false);
    const [color, setColor] = useState({ header: "#ffdf20", body: "#fff085" });
    const [category, setCategory] = useState({
        value: "Home work",
        key: "687231b05282890fad825d83"
    })

    return (
        <Container>

            <View style={{ flexDirection: "row", columnGap: 10 }}>
                <View>
                    <Color colorPalettle={colorPattle} setColorPalettle={setColorPattle} color={color} setColor={setColor}></Color>
                </View>

                <View>
                    <Category category={category} setCategory={setCategory}></Category>
                </View>
            </View>

        </Container>
    )
}