import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

import ar from "../locales/ar.json";
import { Text } from "react-native";
import { Fonts } from "../constant/styles";

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
  },
  lng: "ar", // Set the default language to English
  fallbackLng: "en", // Fallback language if a translation is missing
  interpolation: {
    escapeValue: false,
  },
});

export default function AppText({ style, text, centered = true }) {
  const { t } = useTranslation();

  return (
    <View>
      <Text
        style={[
          styles.text,
          style,
          { textAlign: centered ? "center" : "auto" },
        ]}
      >
        {t(text)}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    ...Fonts.grayColor18Medium,
    fontFamily: "Janna-Lt",
  },
});
