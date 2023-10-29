import React, { useState } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, TextInput, Dimensions, FlatList } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

const recentlySearchesList = [
    {
        id: '1',
        search: 'Dexlansoprazole',
    },
    {
        id: '2',
        search: 'Logidrud',
    },
    {
        id: '3',
        search: 'Ecosprin 75',
    },
    {
        id: '4',
        search: 'Dytor p',
    },
    {
        id: '5',
        search: 'Revital h',
    },
    {
        id: '6',
        search: 'Peracitamol',
    }
];

const { width } = Dimensions.get('screen');

const previouslyPurchesedItemsList = [
    {
        id: '1',
        item: 'Revital H - Daily Health Supplement - 30 Capsuls'
    },
];

const SearchScreen = ({ navigation }) => {

    const [isSearch, setIsSearch] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {searchFieldWithBackArrow()}
                {recentlySearchInfo()}
                {previouslyPurchesedItemsInfo()}
            </View>
        </SafeAreaView>
    )

    function previouslyPurchesedItemsInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.previouslyPurchesedItemsWrapStyle}>
                <Text style={{ ...Fonts.primaryColor19Medium, maxWidth: width - 50, lineHeight: 25.0 }}>
                    {item.item}
                </Text>
                <MaterialIcons name="arrow-forward-ios" size={20} color={Colors.primaryColor} />
            </View>
        )
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    backgroundColor: Colors.bodyBackColor,
                    paddingVertical: Sizes.fixPadding - 5.0,
                    marginVertical: Sizes.fixPadding
                }}>
                    <Text style={{
                        ...Fonts.primaryColor18Regular,
                        paddingHorizontal: Sizes.fixPadding + 2.0
                    }}>
                        Previously Purchased Items
                    </Text>
                </View>
                <FlatList
                    data={previouslyPurchesedItemsList}
                    keyExtractor={(item => `${item.id}`)}
                    renderItem={renderItem}
                    scrollEnabled={true}
                    contentContainerStyle={{
                        paddingTop: Sizes.fixPadding - 7.0,
                        paddingBottom: Sizes.fixPadding * 2.0
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    function recentlySearchInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.recentlySearchesStyle}>
                <Text numberOfLines={1} style={{ ...Fonts.primaryColor15Regular, }}>
                    {item.search}
                </Text>
            </View>
        )
        return (
            <View style={{ backgroundColor: Colors.bodyBackColor, paddingVertical: Sizes.fixPadding - 5.0 }}>
                <Text style={{ ...Fonts.primaryColor18Regular, marginHorizontal: Sizes.fixPadding + 2.0 }}>
                    Recently Search Item
                </Text>

                <FlatList
                    data={recentlySearchesList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={4}
                    scrollEnabled={false}
                    contentContainerStyle={{
                        paddingVertical: Sizes.fixPadding,
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingRight: Sizes.fixPadding
                    }}
                />
            </View>
        )
    }

    function searchFieldWithBackArrow() {
        return (
            <View style={styles.searchFieldWithBackArrowWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={Colors.whiteColor}
                    onPress={() => navigation.pop()}
                />
                <View style={styles.searchFieldStyle}>
                    <MaterialIcons name="search" size={25} color={isSearch ? Colors.primaryColor : Colors.grayColor} />
                    <TextInput
                        numberOfLines={1}
                        selectionColor={Colors.primaryColor}
                        style={{
                            ...Fonts.primaryColor18Regular, flex: 1,
                            marginLeft: Sizes.fixPadding
                        }}
                        placeholderTextColor={Colors.primaryColor}
                        placeholder="Search Medicines/healthcare products"
                        onFocus={() => setIsSearch(true)}
                        onBlur={() => setIsSearch(false)}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchFieldWithBackArrowWrapStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding,
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding,
        elevation: 15.0,
    },
    searchFieldStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        height: 50.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding,
        flex: 1.0,
        paddingHorizontal: Sizes.fixPadding
    },
    previouslyPurchesedItemsWrapStyle: {
        flexDirection: "row",
        marginHorizontal: Sizes.fixPadding + 2.0,
        justifyContent: 'space-between',
        marginBottom: Sizes.fixPadding,
    },
    recentlySearchesStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding + 7.0,
        borderColor: 'rgba(0, 150, 136, 0.15)',
        borderWidth: 1.0,
        paddingVertical: Sizes.fixPadding - 3.0,
        paddingHorizontal: Sizes.fixPadding,
        maxWidth: (width - 40) / 4.0,
        marginRight: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding - 5.0
    }
});

export default SearchScreen;