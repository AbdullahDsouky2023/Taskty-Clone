import React from 'react'

import HeaderTextComponent from './HeaderTextComponent'
import AppCard from './AppCard'
import { FlatList } from 'react-native'
import { LowOffersList } from '../../data/home'
import { useNavigation } from '@react-navigation/native'
import { ITEM_DETAILS } from '../../navigation/routes'

export default function LowOffers() {
  const navigation = useNavigation()
  return (
    <HeaderTextComponent name={'Low Offers'}  showAll={true} >
        <FlatList
        horizontal
        data={LowOffersList}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item)=>item.name}
        style={{
            display:'flex',
            flexDirection:'row',
            gap:15
        }}
        renderItem={({item})=>(
            <AppCard
            name={item.name}
            price={item.price}
            onPress={()=>navigation.navigate(ITEM_DETAILS,{item})}
            image={item.image}
            />

        )}
        />
    </HeaderTextComponent>
  )
}
