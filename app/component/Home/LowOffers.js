import { View, Text ,Image,StyleSheet} from 'react-native'
import React from 'react'

import HeaderTextComponent from './HeaderTextComponent'
import AppText from '../AppText'
import { Colors } from '../../constant/styles'

export default function LowOffers() {
  return (
    <HeaderTextComponent name={'Low Offers'}>
        <View style={styles.card}>
            <Image style={styles.cardImage} source={{uri:('https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&cs=tinysrgb&w=600')}}/>
        </View>
            <View >
                <AppText text={'One-Time Home Cleaning - Price per Square Meter (Up to 170m)'} style={styles.serviceName}  />
                <AppText text={'275 Egyptian Pounds'} style={styles.servicePrice}/>
            </View>
    </HeaderTextComponent>
  )
}
const styles = StyleSheet.create({
    card :{
        height:120,
        width:170,
        backgroundColor:"#FCEAEA",
        borderRadius:10,
        marginTop:10,
        overflow:'hidden'
    },
    cardImage :{
        height:'100%',
        width:'100%'
    },
    serviceName :{
        fontSize:12,
        color:Colors.blackColor,
        maxWidth:170,
    },
    servicePrice :{
        color:Colors.primaryColor,

    }
})