import React from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, FlatList, Dimensions, Image, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const healthCareProductList = [
    {
        id: '1',
        image: require('../../assets/images/healthcare/1.png'),
        productType: 'Special Offers',
        percentageOff: 74,
    },
    {
        id: '2',
        image: require('../../assets/images/healthcare/2.png'),
        productType: 'Covid Essentials',
        percentageOff: 77,
    },
    {
        id: '3',
        image: require('../../assets/images/healthcare/3.png'),
        productType: 'Daily Essentials',
        percentageOff: 20,
    },
    {
        id: '4',
        image: require('../../assets/images/healthcare/4.png'),
        productType: 'Diabetic Care',
        percentageOff: 60,
    },
    {
        id: '5',
        image: require('../../assets/images/healthcare/5.png'),
        productType: 'Personal Care',
        percentageOff: 40,
    },
];

const HealthcareScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {headerWithDetail()}
                {healthCareProducts()}
            </View>
        </SafeAreaView>
    )

    function healthCareProducts() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('AvailableProduct')}
                style={styles.healthCareProductsWrapStyle}>
                <View style={{}}>
                    <Text style={{ lineHeight: 24.0, width: width - 230.0, ...Fonts.primaryColor19Medium }}>
                        {item.productType}
                    </Text>
                    <Text style={{ ...Fonts.primaryColor16Regular, marginTop: Sizes.fixPadding - 12.0, }}>
                        Upto {item.percentageOff}% off
                    </Text>
                </View>
                <Image
                    source={item.image}
                    style={{ width: 130.0, height: 130.0, }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={healthCareProductList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: Sizes.fixPadding * 2.0,
                }}
            />
        )
    }

    function headerWithDetail() {
        return (
            <View style={{
                backgroundColor: Colors.primaryColor,
                padding: Sizes.fixPadding,
                flexDirection: 'column'
            }}>
                <View style={styles.headerInfoWrapStyle}>
                    <View>
                        <Text style={{ ...Fonts.whiteColor20Medium }}>
                            HealthMeds
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...Fonts.whiteColor15Light }}>
                                Deliver To
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => navigation.push('ChooseLocation')}
                                style={{ flexDirection: 'row', alignItems: 'center', marginLeft: Sizes.fixPadding - 3.0 }}>
                                <Text style={{ ...Fonts.whiteColor16Medium }}>
                                    99501  Anchorage
                                </Text>
                                <MaterialIcons name="keyboard-arrow-down" size={24} color={Colors.whiteColor} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons
                            name="tag"
                            size={26}
                            color={Colors.whiteColor}
                            onPress={() => navigation.push('Offers')}
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
                                    1
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('Search')}
                    style={styles.searchButtonStyle}>
                    <MaterialIcons name="search" size={22} color={Colors.primaryColor} />
                    <Text numberOfLines={1} style={{ ...Fonts.primaryColor18Medium, marginLeft: Sizes.fixPadding, flex: 1 }}>
                        Search medicines/healthcare products
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerInfoWrapStyle: {
        flexDirection: 'row',
        paddingLeft: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'space-between'
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
    searchButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 1.0,
        marginTop: Sizes.fixPadding + 5.0
    },
    healthCareProductsWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: 'rgba(0, 150, 136, 0.3)',
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Sizes.fixPadding * 2.0,
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default HealthcareScreen;