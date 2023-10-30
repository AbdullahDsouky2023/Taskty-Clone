import React from 'react'
import HeaderTextComponent from './HeaderTextComponent'
import { workerList } from '../../data/home'
import { FlatList, Text } from 'react-native'
import HelpCard from './HelpCard'

export default function AskWorker() {
  return (
    <HeaderTextComponent name={'AskWorkerToHelp'}>
       <FlatList
        
        data={workerList}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item)=>item.name}
        style={{
            display:'flex',
            flexDirection:'row',
            direction:'rtl',
            flexWrap:'wrap',
            marginTop:15,
            gap:15
        }}
        renderItem={({item})=>(
            <HelpCard
            name={item.name}
            image={item.image}
            />
           

        )}
        />
    </HeaderTextComponent>
  )
}
