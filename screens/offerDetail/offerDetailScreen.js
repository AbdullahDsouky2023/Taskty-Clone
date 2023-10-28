import React from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

const OfferDetailScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {offerDetails()}
            </View>
        </SafeAreaView>
    )

    function offerDetails() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding + 2.0, marginVertical: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.primaryColor18Medium, lineHeight: 23.0, }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever siwhen an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
                <Text style={{ ...Fonts.primaryColor18Medium, lineHeight: 23.0, marginTop: Sizes.fixPadding + 5.0 }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever siwhen an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
                <Text style={{ ...Fonts.primaryColor18Medium, lineHeight: 23.0, marginTop: Sizes.fixPadding + 5.0 }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever siwhen an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={Colors.whiteColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ ...Fonts.whiteColor19Medium, marginLeft: Sizes.fixPadding + 5.0 }}>
                    Offer Detail
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.primaryColor,
    }

});

export default OfferDetailScreen;