import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { offersBannerList } from '../../data/home'
import Carousel from 'react-native-snap-carousel-v4';
import { useState } from 'react';
import PaginationComponent from './Pagination';
import { Image } from 'react-native';
const { width } = Dimensions.get("window");

export default   function OffersBanner() {

    const [state, setState] = useState({
        offers: offersBannerList,
        activeSlide: 0,
        days: 694,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        offers,
        activeSlide,
        days,
    } = state;
    return (
        <View>
            <Carousel
                data={offersBannerList}
                sliderWidth={width}
                autoplay={true}
                loop={true}
                autoplayInterval={10000}
                itemWidth={width}
                renderItem={_renderItem}
                onSnapToItem={(index) => updateState({ activeSlide: index })}
            />
           <PaginationComponent activeSlide={activeSlide} length={offers.length}/>
        </View>
    )
}

function _renderItem({ item }) {
    return (
        <Image
            source={item.image}
            style={{ width: width, height: 180.0 }}
            resizeMode="cover"
        />
    )
}