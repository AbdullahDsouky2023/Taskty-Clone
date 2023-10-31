import React, { useState } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, FlatList, Dimensions, Image, TouchableOpacity } from "react-native";
import { Colors, Sizes } from "../../constant/styles";
import AppText from "../../component/AppText";
import { homeServices } from "../../data/home";
import OfferCard from "../../component/OfferCard";

const { width } = Dimensions.get('screen');



const HealthcareScreen = ({ navigation }) => {
    const [slectedItem,setSelectedItem] = useState('مكيفات')
    const selectedItemsData = homeServices.find((category) => category.category === slectedItem);
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={styles.container}>
                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={homeServices}
                style={{
                    display:'flex',
                    flexDirection:'row',
                    gap:10
                }}
                renderItem={({item})=>
                <TouchableOpacity style={ item == selectedItemsData ? styles.activeItem:styles.item} onPress={()=>{
                    console.log(selectedItemsData)
                    setSelectedItem(item.category)}}>
               <AppText text={item.category} style={{color:Colors.whiteColor}}/>
                </TouchableOpacity>
                }
                keyExtractor={(item,index)=>item.category}
                
                />
                <View style={{padding:23}}>
                    <View style={{marginBottom:10}}>
                    <AppText text={slectedItem} centered={false} style={{fontSize:25,color:Colors.blackColor}}/>
                    </View>
                 <FlatList
                 data={selectedItemsData.services}
                 renderItem={({item})=>(
                    <OfferCard service={item.service}
                    price={item.price}
                    />
                 )}
                 ItemSeparatorComponent={<View style={{height:10}}/>}
                 />

                </View>
            </View>
        </SafeAreaView>
    )

    

    
}

const styles = StyleSheet.create({
    container :{
          paddingVertical:30,
    },
    item :{
        height:50,
        borderRadius:8,
        width:'auto',
        paddingHorizontal:18,
        backgroundColor:Colors.blackColor,
        marginLeft:15,
        display:'flex',
        justifyContent:'center'
    },
    activeItem :{
        height:50,
        borderRadius:8,
        width:'auto',
        paddingHorizontal:18,
        backgroundColor:Colors.primaryColor,
        marginLeft:15,
        display:'flex',
        justifyContent:'center'
    },
   
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
   
});

export default HealthcareScreen;