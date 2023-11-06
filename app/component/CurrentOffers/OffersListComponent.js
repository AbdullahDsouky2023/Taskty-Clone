import { View, Text, FlatList, Dimensions } from 'react-native'
import React from 'react'
import { Colors } from '../../constant/styles'
import OfferCard from '../OfferCard'
import AppText from '../AppText'
const  { width } = Dimensions.get('screen')
export default function OffersServiceComponentList({data,slectedItem}) {
  console.log(data)
  return (

    <View style={{ paddingHorizontal: 16,paddingTop:10, marginBottom: 10,width:width }}>
    <View style={{ marginBottom: 10 }}>
    <AppText
        text={slectedItem}
        centered={false}
        style={{ fontSize: 22, color: Colors.blackColor }}
      />
    </View>
    <FlatList
      data={ data }
      renderItem={( {item} ) => {
        console.log("abdo",item?.attributes?.image)
        return(
          <OfferCard
            service={item?.attributes?.name}
            price={item?.attributes?.Price}
            image={item?.attributes?.image?.data?.attributes?.url}
          />
        )
      }}
      keyExtractor={(item)=>item.id}
      ItemSeparatorComponent={<View style={{ height: 10 }} />}
    />
  </View>
  )
}