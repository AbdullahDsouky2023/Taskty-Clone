import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors, Sizes,Fonts } from '../../constant/styles'
import AppText from '../AppText'
import ServiceCard from './ServiceCard'

export default function ServicesList() {
  return (
    <View style={styles.Container}>
        <View style={styles.headerTextContainer} >
        <AppText text={'servicesLookingFor'} style={styles.text}/>
        <AppText text={'showAll'} style={{...Fonts.primaryColor15Light}}/>
        </View>
        <ServiceCard name={'نظافه منزليه'} image={require('../../assets/images/ServiesIcons/cleaning.png')}/>
       
    </View>
  )
}
const styles = StyleSheet.create({
    Container :{
        margin: Sizes.fixPadding * 1.0,
        padding: Sizes.fixPadding * 1.0,
    },
    headerTextContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        gap:18
    },
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