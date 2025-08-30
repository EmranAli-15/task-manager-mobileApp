import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export default function MyModal({ modal, setModal, children }: { modal: boolean, setModal: Function, children: any }) {
    return (
        <>
            {
                modal && <View style={style.modalBox}>
                    <TouchableOpacity onPress={() => setModal(!modal)} style={style.customModal}>

                    </TouchableOpacity>
                    <View style={style.insideModal}>
                        {
                            children
                        }
                    </View>
                </View>
            }
        </>
    )
}


const style = StyleSheet.create({
    customModal: {
        position: "absolute",
        top: 0,
        width: "120%",
        height: "100%",
        right: 10,
        overflow: "visible",
        backgroundColor: "#000000dc",
    },
    insideModal: {
        backgroundColor: "#076ff8ff",
        padding: 30,
        top: "20%",
        borderRadius: 5,
        left: "5%",
        width: "80%",
        alignItems: "center",
    },
    modalBox: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: "100%",
        width: "110%",
        zIndex: 30,
    }
})