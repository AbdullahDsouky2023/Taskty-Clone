import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors,Fonts } from '../../constant/styles'
import { Image } from 'react-native'
import AppText from '../AppText'

export default function ServiceCard({image,name}) {
  return (
    <View style={styles.card}>
            <Image style={styles.imageCard} source={{uri:image}}/>
            <AppText text={name} style={styles.text}/>
        </View>
  )
}
const styles = StyleSheet.create({
    card :{
        height:100,
        width:100,
        backgroundColor:'#FCF1EA',
        borderRadius:10,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:4
    },
    text:{
        color:Colors.blackColor,
        ...Fonts.blackColor14Medium
    },
    imageCard :{
        height:40,
        width:40
    }
})