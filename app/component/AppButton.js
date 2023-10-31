import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AppText from './AppText'
import { StyleSheet } from 'react-native'
import { Colors, Sizes ,Fonts} from '../constant/styles'
import { useNavigation } from '@react-navigation/native'

export default function AppButton({path,title,style,textStyle,onPress}) {
    const navigation = useNavigation()
  return (
    <TouchableOpacity
    activeOpacity={0.6}
    
    onPress={() => navigation.push(path)}
    style={[styles.continueButtonStyle,style]}>
        <AppText text={title} style={{ ...Fonts.whiteColor19Medium ,...textStyle}} />
</TouchableOpacity>
  )
}

const styles= StyleSheet.create({
    continueButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width:'auto',
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding * 4.0,
        paddingHorizontal: Sizes.fixPadding*2.5,
        borderRadius:40
    },
   
})