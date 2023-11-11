import {

  View,

  Dimensions,
  StyleSheet,
} from "react-native";

import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";

import { CheckBox, Icon } from "@rneui/themed";

const { width } = Dimensions.get("screen");


export default function SelectLocationItem({currentLocation,item,setSelectedLocation}) {
    if(item) return;
  return (
    <View>
    {/* currentLocation primary */}
    <View style={[styles.currentLocation,{
      backgroundColor:currentLocation === item ? Colors.primaryColor : Colors.whiteColor
      ,borderWidth:currentLocation === item ? 0 :1
    }]}>
      <CheckBox
      containerStyle={{backgroundColor:"transparent"}}
        center
        checkedIcon={
          <Icon
            name="radio-button-checked"
            type="material"
            color={Colors.white}
            size={25}
            iconStyle={{ marginRight: 10,color:Colors.whiteColor }}
          />
        }
        uncheckedIcon={
          <Icon
            name="radio-button-unchecked"
            type="material"
            color="grey"
            size={25}
            iconStyle={{ marginRight: 10,color:Colors.blackColor }}
          />
        }
        checked={item === currentLocation}
        onPress={() => setSelectedLocation(item)}
      />
      <AppText
        text={currentLocation}
        centered={false}
        style={{ color:currentLocation === item ? Colors.whiteColor: Colors.blackColor, marginBottom: 10 }}
      />
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    currentLocation: {
      height: "auto",
      width: width * 0.95,
      borderRadius: 10,
      backgroundColor: Colors.primaryColor,
      display: "flex",
      alignContent: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      marginVertical:10,
      padding: 10,
    },
    headerContainer:{
      display: "flex",
      alignContent: "center",
      width:width*0.94,
      marginTop:10,
      justifyContent: "space-between",
      flexDirection: "row",
    }})

    // export default SelectLocationItem