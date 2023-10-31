import {  FlatList } from 'react-native'
import React from 'react'
import HeaderTextComponent from './HeaderTextComponent'
import AppBigCard from './AppBigCard'
import { LowOffersList, ReadyPackages } from '../../data/home'

export default function CleaningServices() {
  return (
    <HeaderTextComponent name={'homeCleaningServices'}  showAll={true}>
        <FlatList
        horizontal
        data={ReadyPackages}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item,index) => item.name+index}

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
            
            />

        )}
        />
    </HeaderTextComponent>
  )
}