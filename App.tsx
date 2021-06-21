import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { AppStyle as styles } from './src/Styles/styles';
import SplashScreen from './src/Layouts/SplashScreen';
import * as Location from 'expo-location';

export default function App() {
  const [isLoading, setIsloading ] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  
  const getPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    
    if (status !== 'granted') setErrorMsg('Permission to access location was denied');
  }

  const Loading = async () => {
    getPermission()

    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('result');
      }, 5000)
    );
  };

  const setPerform = async () => {
    const data = await Loading();

    if (data !== null) setIsloading(false);
  }

  useEffect(() => {
    setPerform();
  }, []);

  if (isLoading === true) return <SplashScreen/>

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}