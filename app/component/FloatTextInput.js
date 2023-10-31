import { View, Text } from 'react-native'
import React from 'react'

export default function FloatTextInput() {
  return (
            <TextInput
                label="Mobile Number"
                value={mobileNumber}
                onChangeText={(text) => updateState({ mobileNumber: text })}
                mode="outlined"
                style={{
                    height: 60.0,
                    ...Fonts.primaryColor17Medium,
                    backgroundColor: Colors.whiteColor,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
                outlineColor={Colors.grayColor}
                selectionColor={Colors.primaryColor}
                theme={{ colors: { primary: Colors.primaryColor, underlineColor: '#C5C5C5', } }}
                keyboardType="phone-pad"
            />
        )
}