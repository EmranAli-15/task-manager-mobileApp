import Container from '@/components/Container';
import Color from '@/components/navOptions/Color';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function InsideNote() {

    const [colorPattle, setColorPattle] = useState(false);
    const [color, setColor] = useState("yellow");

    return (
        <Container>

            <View>
                <Color colorPalettle={colorPattle} setColorPalettle={setColorPattle} color={color} setColor={setColor}></Color>
            </View>

        </Container>
    )
}