import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

import ar from "../locales/ar.json";
import { Text } from "react-native";
import { Fonts } from "../constant/styles";
import { I18nManager } from "react-native";

import 'intl-pluralrules';
// import 'intl-pluralrules/locale-data/ar';
I18nManager.forceRTL(false);
// const customPluralRules = {
//   getRule: function (count) {
//     // Implement custom pluralization logic for Arabic here
//     // You can return the appropriate form based on the count
//     // For example, you can use a library like 'make-plural' to handle this.
//     // Replace this logic with your actual pluralization rules.
//     if (count === 0) return 'zero';
//     if (count === 1) return 'one';
//     if (count === 2) return 'two';
//     if (count >= 3 && count <= 10) return 'few';
//     return 'other';
//   },
// };
i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
  },
  lng: 'ar', // Set the default language to Arabic
  fallbackLng: 'en', // Fallback language if a translation is missing
  interpolation: {
    escapeValue: false,
    // format: (value, format) => {
    //   // Use the custom pluralization function here
    //   return customPluralRules.getRule(value);
    // },
  },
});
const { width } = Dimensions.get('screen')
export default function AppText({ style, text, centered = true ,...otherProps}) {
  const { t } = useTranslation();

  return (
      <Text
      
        style={[
          styles.text,
          style,
          { alignSelf: centered ? "center" : "flex-start" },
        ]}
        {...otherProps}
      >
        {t(text)}
      </Text>
  );
}
const styles = StyleSheet.create({
  text: {
    ...Fonts.grayColor18Medium,
    fontFamily: "Janna-Lt",
    maxWidth: width*0.74,
    writingDirection:'rtl',
    alignSelf:'flex-start'
  },
});
