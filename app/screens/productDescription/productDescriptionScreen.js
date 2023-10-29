import React, { useState } from "react";
import { SafeAreaView, StatusBar, Modal, TouchableWithoutFeedback, View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';
import { BottomSheet } from "@rneui/themed";

const { width } = Dimensions.get('screen');

const keyFeaturesList = [
    {
        id: '1',
        feature: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
        id: '2',
        feature: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
        id: '3',
        feature: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
        id: '4',
        feature: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
];

const ProductDescriptionScreen = ({ navigation, route }) => {

    const item = route.params.item;

    const from = route.params.from;

    const [state, setState] = useState({
        productImages: from == 'home' ?
            [
                {
                    image: item.image,
                },
                {
                    image: item.image,
                },
                {
                    image: item.image,
                },
            ] :
            item.allImages
        ,
        activeSlide: 0,
        itemCount: 1,
        quantityDialog: false,
        currentQuantity: null,
        packageSizeSheet: false,
        flavourSheet: false,
        packageSize: from != 'home' ? item.packageSizes.length != 0 ? item.packageSizes[0].size : null : null,
        flavour: from != 'home'
            ?
            item.flavours
                ?
                item.flavours[0].flavour
                :
                null
            : null
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        productImages,
        activeSlide,
        itemCount,
        quantityDialog,
        currentQuantity,
        packageSizeSheet,
        flavourSheet,
        packageSize,
        flavour
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {delivertoInfo()}
                    {productInfo()}
                    {detail()}
                </ScrollView>
                {itemCountAndViewCartButton()}
                {selectQuantityDialog()}
                {packageSizeBottomSheet()}
                {flavourBottomSheet()}
            </View>
        </SafeAreaView>
    )

    function flavourBottomSheet() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => updateState({ flavour: item.flavour, flavourSheet: false })}
                style={{
                    borderColor: flavour == item.flavour ? Colors.primaryColor : Colors.grayColor,
                    ...styles.bottomSheetItemWrapStyle
                }}
            >
                <Text style={{ ...Fonts.primaryColor18Medium }}>
                    {item.flavour}
                </Text>
            </TouchableOpacity>
        )
        return (
            <BottomSheet
                isVisible={flavourSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.5)' }}
                onBackdropPress={() => updateState({ flavourSheet: false })}
            >
                <View style={{ backgroundColor: Colors.whiteColor, paddingTop: Sizes.fixPadding - 5.0 }}>
                    <Text style={{ paddingVertical: Sizes.fixPadding, textAlign: 'center', ...Fonts.primaryColor19Medium }}>
                        Select Flavour
                    </Text>
                    <FlatList
                        data={item.flavours}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: Sizes.fixPadding * 2.0,
                            paddingLeft: Sizes.fixPadding * 4.0,
                        }}
                    />
                </View>
            </BottomSheet>
        )
    }

    function packageSizeBottomSheet() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => updateState({ packageSize: item.size, packageSizeSheet: false })}
                style={{
                    borderColor: packageSize == item.size ? Colors.primaryColor : Colors.grayColor,
                    ...styles.bottomSheetItemWrapStyle
                }}
            >
                <Text style={{ ...Fonts.primaryColor18Medium }}>
                    {item.size}
                </Text>
            </TouchableOpacity>
        )
        return (
            <BottomSheet
                isVisible={packageSizeSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.5)' }}
                onBackdropPress={() => updateState({ packageSizeSheet: false })}
            >
                <View style={{ backgroundColor: Colors.whiteColor, paddingTop: Sizes.fixPadding - 5.0 }}>
                    <Text style={{ paddingVertical: Sizes.fixPadding, textAlign: 'center', ...Fonts.primaryColor19Medium }}>
                        Select Pack Size
                    </Text>
                    <FlatList
                        data={item.packageSizes}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: Sizes.fixPadding * 2.0,
                            paddingLeft: Sizes.fixPadding * 4.0,
                        }}
                    />
                </View>
            </BottomSheet>
        )
    }

    function flavourInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => updateState({ flavourSheet: true })}
                style={{ ...styles.flavourAndPackageSizeInfoWrapStyle, marginBottom: Sizes.fixPadding }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.primaryColor16Light }}>
                        Flavour:
                    </Text>
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor18Medium }}>
                        {flavour}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.primaryColor18Medium, marginRight: Sizes.fixPadding }}>
                        {item.flavours.length - 1} more
                    </Text>
                    <MaterialIcons name="arrow-forward-ios" size={22} color={Colors.primaryColor} />
                </View>
            </TouchableOpacity >
        )
    }

    function packageSizesInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => updateState({ packageSizeSheet: true })}
                style={styles.flavourAndPackageSizeInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.primaryColor16Light }}>
                        Pack Size:
                    </Text>
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor18Medium }}>
                        {packageSize}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.primaryColor18Medium, marginRight: Sizes.fixPadding }}>
                        {item.packageSizes.length - 1} more
                    </Text>
                    <MaterialIcons name="arrow-forward-ios" size={22} color={Colors.primaryColor} />
                </View>
            </TouchableOpacity >
        )
    }

    function itemCountAndViewCartButton() {
        return (
            <View style={styles.itemCountAndViewCartButtonWrapStyle}>
                <Text style={{
                    lineHeight: 24.0,
                    ...Fonts.primaryColor19Medium,
                    paddingRight: Sizes.fixPadding * 2.0,
                }}>
                    {itemCount} {`Item in\nCart`}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('Cart')}
                    style={styles.viewCartButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor19Medium }}>
                        View Cart
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function selectQuantityDialog() {
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={quantityDialog}
            >
                <TouchableWithoutFeedback>
                    <View style={styles.selectQuantityModelStyle}>
                        <View style={{
                            width: width * 0.8,
                            backgroundColor: Colors.whiteColor,
                            borderRadius: Sizes.fixPadding,
                        }}>
                            <View style={styles.selectQuantityTitleStyle}>
                                <Text style={{ ...Fonts.primaryColor20Medium }}>
                                    Select Quantity
                                </Text>
                                <MaterialIcons name="close" size={24}
                                    onPress={() => updateState({ quantityDialog: false })}
                                    color={Colors.primaryColor} />
                            </View>
                            <View style={{ backgroundColor: Colors.primaryColor, height: 1.0 }} />
                            {itemCount == 1 ?
                                null
                                :
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() => {
                                        updateState({ itemCount: 1, quantityDialog: false, currentQuantity: 1 })
                                    }}
                                >
                                    <Text style={{ margin: Sizes.fixPadding, ...Fonts.primaryColor19Medium }}>
                                        Remove item
                                    </Text>
                                </TouchableOpacity>
                            }
                            {quantity({ number: 1, })}
                            {quantity({ number: 2, })}
                            {quantity({ number: 3, })}
                            {quantity({ number: 4, })}
                            {quantity({ number: 5, })}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    function quantity({ number }) {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                    updateState({ itemCount: number, currentQuantity: number, quantityDialog: false })
                }}
                style={{
                    backgroundColor: currentQuantity == number ? '#E2E2E2' : Colors.whiteColor,
                    borderBottomLeftRadius: number == 5 ? Sizes.fixPadding : 0.0,
                    borderBottomRightRadius: number == 5 ? Sizes.fixPadding : 0.0,
                    ...styles.selectedQuantityWrapStyle,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.primaryColor19Medium }}>
                        {number}
                    </Text>
                    {number == 5
                        ?
                        <Text style={{ ...Fonts.primaryColor15Light, marginLeft: Sizes.fixPadding }}>
                            Max Qty
                        </Text>
                        :
                        null
                    }
                </View>
                {currentQuantity == number ?
                    <View style={styles.doneIconWrapStyle}>
                        <MaterialIcons name="check" size={20} color={Colors.whiteColor} />
                    </View>
                    :
                    null
                }
            </TouchableOpacity>
        )
    }

    function detail() {
        return (
            <View style={{
                marginTop: Sizes.fixPadding * 2.0,
                paddingTop: Sizes.fixPadding * 2.0,
                backgroundColor: Colors.whiteColor,
                paddingHorizontal: Sizes.fixPadding * 2.0,
            }}>
                {
                    item.flavours ?
                        flavourInfo()
                        :
                        null
                }
                {
                    from == 'home' ?
                        null :
                        item.packageSizes.length != 0 ?
                            packageSizesInfo() : null
                }
                {productDescriptionInfo()}
                {keyFeaturesInfo()}
                {divider()}
                {featuresAndDetailInfo()}
                {divider()}
                {disclaimerInfo()}
            </View>
        )
    }

    function divider() {
        return (
            <View
                style={styles.dividerStyle}
            />
        )
    }

    function productDescriptionInfo() {
        return (
            <>
                <Text style={{ ...Fonts.primaryColor17Medium, paddingTop: Sizes.fixPadding * 4.0, }}>
                    Description
                </Text>
                <Text style={{ paddingTop: Sizes.fixPadding - 5.0, ...Fonts.blackColor16Medium, lineHeight: 20.0, }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
            </>
        )
    }

    function keyFeaturesInfo() {
        return (
            <>
                <Text style={{ ...Fonts.primaryColor17Medium, marginVertical: Sizes.fixPadding, }}>
                    Key Features
                </Text>
                {
                    keyFeaturesList.map((item) => (
                        <View key={`${item.id}`}>
                            <View style={{ flexDirection: 'row', marginBottom: Sizes.fixPadding - 5.0, }}>
                                <View style={styles.bulletStyle} />
                                <Text style={{ paddingTop: Sizes.fixPadding - 5.0, ...Fonts.blackColor16Medium, lineHeight: 20.0, }}>
                                    {item.feature}
                                </Text>
                            </View>
                        </View>
                    ))
                }
            </>
        )
    }

    function disclaimerInfo() {
        return (
            <>
                <Text style={{ ...Fonts.primaryColor17Medium }}>
                    Disclaimer
                </Text>
                <Text style={{ paddingVertical: Sizes.fixPadding, ...Fonts.primaryColor16Regular, lineHeight: 20.0, }}>
                    If the seal of the product is broken it will be non- returnable.
                </Text>
            </>
        )
    }

    function featuresAndDetailInfo() {
        return (
            <>
                <Text style={{ ...Fonts.primaryColor17Medium }}>
                    Features & Details
                </Text>
                {featuresAndDetails({ title: 'Brand:', value: item.brand })}
                {featuresAndDetails({ title: 'Manufacturer:', value: item.manufacturer })}
                {featuresAndDetails({ title: 'Country of Origin:', value: 'India' })}
            </>
        )
    }

    function featuresAndDetails({ title, value }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ ...Fonts.primaryColor16Medium }}>
                    {title}
                </Text>
                <Text style={{ paddingLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor16Light }}>
                    {value}
                </Text>
            </View>
        )
    }

    function productInfo() {
        const _renderItem = ({ item, index }) => (
            <View style={styles.imageWrapStyle}>
                <SharedElement id={index == 0 ? route.params.item.id : null}>
                    <Image
                        resizeMode="contain"
                        source={item.image}
                        style={{ width: 140.0, height: 140.0, }}
                    />
                </SharedElement>
            </View>
        )
        return (
            <View style={{
                backgroundColor: Colors.whiteColor,
                paddingVertical: Sizes.fixPadding * 2.0,
            }}>
                <Carousel
                    data={productImages}
                    sliderWidth={width}
                    itemWidth={200}
                    renderItem={_renderItem}
                    onSnapToItem={(index) => updateState({ activeSlide: index })}
                />
                {pagination()}
                <View style={{
                    marginTop: productImages.length == 1 ? Sizes.fixPadding + 10.0 : Sizes.fixPadding - 25.0,
                    paddingHorizontal: Sizes.fixPadding * 2.0
                }}>
                    <Text style={{ lineHeight: 24.0, ...Fonts.primaryColor20Medium }}>
                        {item.name}
                    </Text>
                    <Text style={{ ...Fonts.primaryColor18Medium }}>
                        By {item.brand}
                    </Text>
                    <Text style={{ ...Fonts.primaryColor22Medium }}>
                        ${item.discountPrice}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ marginRight: Sizes.fixPadding, textDecorationLine: "line-through", ...Fonts.primaryColor18Light }}>
                                ${item.price}
                            </Text>
                            <View style={styles.offerWrapStyle}>
                                <Text style={{ ...Fonts.whiteColor16Medium }}>
                                    {item.percentageOff}% OFF
                                </Text>
                            </View>
                        </View>
                        {itemCount == 1
                            ?
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => updateState({ quantityDialog: true })}
                                style={styles.addButtonStyle}>
                                <Text style={{ ...Fonts.whiteColor18Medium }}>
                                    Add
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => updateState({ quantityDialog: true })}
                                style={styles.selectQuantityButtonStyle}
                            >
                                <Text style={{ ...Fonts.primaryColor19Medium }}>
                                    Select Qty
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View >
        )
    }

    function pagination() {
        return (
            <Pagination
                dotsLength={productImages.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.sliderPaginationWrapStyle}
                dotStyle={styles.sliderActiveDotStyle}
                inactiveDotStyle={styles.sliderInactiveDotStyle}
            />
        );
    }

    function delivertoInfo() {
        return (
            <View style={styles.deliverToInfoWrapStyle}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons
                        name="map-marker"
                        style={{ paddingTop: Sizes.fixPadding - 3.0 }}
                        size={20}
                        color={Colors.primaryColor}
                    />
                    <View style={{ marginLeft: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.primaryColor15Light }}>
                            Deliver To
                        </Text>
                        <Text style={{ ...Fonts.primaryColor18Medium }}>
                            99501 Anchorage
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('ChooseLocation')}
                >
                    <Text style={{ ...Fonts.primaryColor18Medium, alignSelf: 'flex-end' }}>
                        Change
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor}
                        onPress={() => navigation.pop()}
                    />
                    <Text style={{
                        width: width / 1.7,
                        marginLeft: Sizes.fixPadding + 5.0,
                        ...Fonts.whiteColor19Medium
                    }}>
                        Product Description
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialIcons
                        name="search"
                        size={26}
                        color={Colors.whiteColor}
                        onPress={() => navigation.push('Search')}
                    />
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.push('Cart')}
                    >
                        <MaterialIcons
                            name="shopping-cart"
                            size={26}
                            color={Colors.whiteColor}
                            style={{ marginLeft: Sizes.fixPadding + 10.0 }}
                        />
                        <View style={styles.cartItemCountWrapStyle}>
                            <Text style={{ ...Fonts.whiteColor15Regular }}>
                                {itemCount}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.primaryColor,
        height: 56.0,
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding,
    },
    cartItemCountWrapStyle: {
        position: 'absolute',
        right: -8.0,
        height: 17.0,
        width: 17.0,
        borderRadius: 8.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.redColor,
        elevation: 10.0,
    },
    deliverToInfoWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding + 5.0
    },
    imageWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,//'rgba(0, 150, 136, 0.3)',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        marginRight: Sizes.fixPadding * 2.0,
        width: 200.0,
        height: 190.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sliderActiveDotStyle: {
        width: 20,
        height: 7,
        borderRadius: 10.0,
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding - 17.0
    },
    sliderInactiveDotStyle: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: '#E0E0E0',
    },
    sliderPaginationWrapStyle: {
        marginTop: Sizes.fixPadding - 25.0,
    },
    offerWrapStyle: {
        backgroundColor: Colors.redColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 6.0,
        paddingHorizontal: Sizes.fixPadding - 4.0,
    },
    addButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: Sizes.fixPadding * 4.0,
        paddingVertical: Sizes.fixPadding - 3.0,
    },
    itemCountAndViewCartButtonWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        borderTopColor: Colors.bodyBackColor,
        borderTopWidth: 1.0,
    },
    viewCartButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    bulletStyle: {
        backgroundColor: Colors.blackColor,
        height: 8.0,
        width: 8.0,
        borderRadius: 4.0,
        marginTop: Sizes.fixPadding - 2.0,
        marginRight: Sizes.fixPadding,
    },
    dividerStyle: {
        backgroundColor: Colors.grayColor,
        height: 1.0,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 5.0,
    },
    selectQuantityModelStyle: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.50)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedQuantityWrapStyle: {
        paddingVertical: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding + 2.0,
    },
    doneIconWrapStyle: {
        width: 25.0,
        height: 25.0,
        borderRadius: 12.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.redColor
    },
    selectQuantityTitleStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: Sizes.fixPadding * 2.0,
    },
    selectQuantityButtonStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 3.0,
    },
    bottomSheetItemWrapStyle: {
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Sizes.fixPadding * 2.0,
    },
    flavourAndPackageSizeInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding + 3.0,
    }
});

export default ProductDescriptionScreen;