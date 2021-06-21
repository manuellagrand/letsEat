import { StyleSheet } from "react-native";
import { colors } from "./CommonStyles";

/* App */

export const AppStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})

/* Splashscreen */

export const SplashscreenStyle = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: colors.primaryDark,
        alignItems: "center",
        justifyContent: "center"
    },

    title: {
        padding: 25,
        color: colors.primaryDarkFont,
        fontSize: 64,
        letterSpacing: -1.5,
        fontWeight: "300"
    },

    spinner: {
        marginVertical: 20
    }
});
