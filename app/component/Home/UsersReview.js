import { View, Dimensions, StyleSheet } from 'react-native'
import { useState } from 'react';
import React from 'react'

import Carousel from 'react-native-snap-carousel-v4';
import { userReviews } from '../../data/home'
import PaginationComponent from './Pagination';
import ReviewCard from './ReviewCard';
import useReviews from '../../../utils/reviews';

const { width } = Dimensions.get("window");

export default   function UsersReviews() {
    const { data} =useReviews()
    const [state, setState] = useState({
        reviews: userReviews,
        activeSlide: 0,
        days: 694,
    })

    const updateState = (data) => {
        setState((state) => ({ ...state, ...data }))
    }
   
    const {
        reviews,
        activeSlide,
        days,
    } = state;
    return (
        <View style={styles.container}>
            <Carousel
                data={data?.data}
                sliderWidth={width}
                autoplay={true}
                loop={true}
                
                autoplayInterval={4000}
                itemWidth={width}
                renderItem={({item})=><ReviewCard 
                 username={item?.attributes?.username} 
                 review={item?.attributes?.content[0]?.children[0]?.text}
                  userImage={item?.attributes?.image?.data?.attributes?.url} />}
                onSnapToItem={(index) => updateState({ activeSlide: index })}
            />
           <PaginationComponent activeSlide={activeSlide} length={reviews.length}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        padding:20
    }
})