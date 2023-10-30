import { View, Text } from 'react-native'
import React from 'react'

export default function ItemDetails({route}) {
  const { item } = route.params
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  )
}