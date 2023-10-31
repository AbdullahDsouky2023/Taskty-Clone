import React from 'react'

import HeaderTextComponent from './HeaderTextComponent'
import AppCard from './AppCard'
import { FlatList } from 'react-native'
import { LowOffersList } from '../../data/home'

export default function OtherServicesList() {
  return (
    <HeaderTextComponent name={'otherServices'} >
        <FlatList
        horizontal
        data={LowOffersList}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item,index) => item.name+index}

        style={{
            display:'flex',
            flexDirection:'row',
            gap:15
        }}
        renderItem={({item})=>(
            <AppCard
            name={item.name}
            price={item.price}
            image={item.image}
            />

        )}
        />
    </HeaderTextComponent>
  )
}
