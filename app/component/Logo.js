import React from 'react'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { Sizes } from '../constant/styles'

export default function Logo() {
    return (
        <Image
            source={{uri:'https://th.bing.com/th/id/OIP.L9k7FElhv2O5Ar52LyyFpAHaHa?pid=ImgDet&rs=1'}}
            style={styles.appLogoStyle}
            resizeMode="contain"
        />
    )
}
const styles = StyleSheet.create({
    appLogoStyle: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: Sizes.fixPadding * 4,
        marginTop: Sizes.fixPadding * 8
    },
})