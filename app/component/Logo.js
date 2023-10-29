import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { Sizes } from '../constant/styles'

export default function Logo() {
    return (
        <Image
            source={require('.././assets/images/transparent-icon.png')}
            style={styles.appLogoStyle}
            resizeMode="contain"
        />
    )
}
const styles = StyleSheet.create({
    appLogoStyle: {
        width: 200.0,
        height: 200.0,
        alignSelf: 'center',
        marginBottom: Sizes.fixPadding * 4.0,
        marginTop: Sizes.fixPadding * 8.0
    },
})