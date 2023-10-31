import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Colors } from '../constant/styles'
import AppText from './AppText'
import { Image } from 'react-native'
const { width } = Dimensions.get('screen')
export default function OfferCard({service,price}) {
  return (
    <View style={styles.itemCardContainer}>
                        <Image
                        style={styles.cardImage}
                        source={{
                            uri:'https://images.pexels.com/photos/175709/pexels-photo-175709.jpeg?auto=compress&cs=tinysrgb&w=600'
                        }}/>
                        <View>
                            <AppText text={service} style={{color:Colors.blackColor,
                            fontSize:14,
                            maxWidth:width*0.5}} centered={false}/>
                            <AppText text={price + ` جنيه`} style={{color:Colors.primaryColor}} centered={false}/>
                        </View>
                    </View>
  )
}

const styles = StyleSheet.create({
    itemCardContainer:{
        display:'flex',
        flexDirection:'row',
        borderWidth:1,
        borderRadius:10,
        borderColor:Colors.grayColor,
        gap:20,
        overflow:'hidden',
    },
    cardImage:{
        height:'100%',
        minHeight:100,
        width:width*0.3,
    }
})