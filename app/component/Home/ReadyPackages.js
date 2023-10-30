import { View, Text, FlatList } from 'react-native'
import React from 'react'
import HeaderTextComponent from './HeaderTextComponent'
import AppBigCard from './AppBigCard'
import { ReadyPackages as data } from '../../data/home'
import AppCard from './AppCard'

export default function ReadyPackages() {
  return (
    <HeaderTextComponent name={'readyPackages'}  showAll={true}>
        <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item)=>item.name}
        style={{
            display:'flex',
            flexDirection:'row',
            gap:15
        }}
        renderItem={({item})=>(
            <AppBigCard
            name={item.name}
            price={item.price}
            image={item.image}
            category={item.category}
            />

        )}
        />
    </HeaderTextComponent>
  )
}