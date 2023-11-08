import React, { useState } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import AppButton from "../component/AppButton";

export default function OrderCreationSuccess({navigation}) {
  return (
       <View style={{ backgroundColor: "white", alignItems: "center",height:"100%" ,display:'flex',
       alignItems:'center',justifyContent:'center'}}>
      <LottieView
        autoPlay
        loop={false}
        // ref={animation}
        style={{
          width: 200,
          height: 200,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/success.json')}
      />

        <AppButton title={"عودة"} onPress={()=>navigation.navigate('App')} />
      </View>
  )
}