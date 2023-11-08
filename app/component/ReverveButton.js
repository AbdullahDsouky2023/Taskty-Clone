import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import AppButton from './AppButton'
import AppText from './AppText'
import { Colors } from '../constant/styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
const { width } = Dimensions.get("screen");

export default function ReserveButton({price,onPress}) {
  return (

    <TouchableOpacity onPress={onPress} >
    <View style={styles.ReserveButtonContainer}> 

    <AppText text={price} centered={false} style={styles.price} />
    <AppButton title={"reserveAppointment"} 
    style={styles.buttonSubmit}
    onPress={onPress} />
    </View>
  </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  ReserveButtonContainer: {
        height: 100,
        // position: "absolute",
        display: "flex",
        // flex:1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // backgroundColor: Colors.grayColor,
        // borderRadius: 20,
        width: width,
        bottom: 0,
        right: 0,
        paddingHorizontal: 20,
      },
      price: {
        color: Colors.primaryColor,
        fontSize: 16,
        marginTop:30
      },
      buttonSubmit:{
        width:width*0.4,
        marginTop:0
      }
})