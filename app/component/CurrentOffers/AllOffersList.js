import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import OffersServiceComponentList from './OffersListComponent'
import { useSelector } from 'react-redux';
import useServices from '../../../utils/services';

export default function AllOffersList() {
    const categories = useSelector((state) => state.categories.categories);
    const { data, isLoading, isError } = useServices();
   
  return (
    <ScrollView >
   <ScrollView>
   {
   categories?.data?.map((category)=>{
          const services = data?.data?.filter(
            (item) => item?.attributes?.category?.data?.id === category?.id
          );
        return (<OffersServiceComponentList 
        data={services} 
        slectedItem={category?.attributes?.name}/>)
     })   
    }
   </ScrollView>
  </ScrollView>
  )
}