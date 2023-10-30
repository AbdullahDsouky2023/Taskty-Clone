import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { offersBannerList, userReviews } from '../../data/home'
import Carousel from 'react-native-snap-carousel-v4';
import { useState } from 'react';
import PaginationComponent from './Pagination';
import { Image } from 'react-native';
import ReviewCard from './ReviewCard';
const { width } = Dimensions.get("window");

export default   function UsersReviews() {

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
        <View>
            <Carousel
                data={reviews}
                sliderWidth={width}
                autoplay={true}
                loop={true}
                autoplayInterval={4000}
                itemWidth={width}
                renderItem={({item})=><ReviewCard  username={item.userName}  review={item.review } userImage={item.userImage} />}
                onSnapToItem={(index) => updateState({ activeSlide: index })}
            />
           <PaginationComponent activeSlide={activeSlide} length={reviews.length}/>
        </View>
    )
}

