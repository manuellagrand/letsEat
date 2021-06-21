import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SplashscreenStyle as styles } from '../Styles/styles';
import Eating from '../Image/eating';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../Styles/CommonStyles';

const TITLE = "Let's Eat"

const SplashScreen = () => {
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}> {TITLE} </Text>
            <Eating height={250} width={250}/>
            <ActivityIndicator 
            size="large"
            animating={true}
            style={styles.spinner}
            color={colors.white}/>
        </View>
    )
}

export default SplashScreen;