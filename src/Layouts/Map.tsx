import React, { useState, useEffect, FC, ReactChildren, PropsWithChildren } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MapStyle as styles } from '../Styles/styles';
import { Text, View, SafeAreaView } from 'react-native';
import { ReactElement } from 'react';
import { useRef } from 'react';
import axios from 'axios';

interface IMap {
    userLocation?: boolean,
    mapType?: string,
}

const defaultProps: IMap = {
    userLocation: false,
    mapType: "standard",
}


const Map: FC<IMap> = (props: IMap, children: PropsWithChildren<any>): ReactElement => {
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    })
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0,
    })

    const [restaurants, setRestaurants] = useState(Array<any>());
    
    const getCurrentPos = async () => {
        
        let { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync({})

        setCurrentLocation({
            latitude: latitude,
            longitude: longitude,
        })

        setRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        })
    }

    const getRestaurant = async () => {

        let coordinate: any = []
        try {
            const response = await axios.get(`https://xlmd94l53b.execute-api.eu-west-2.amazonaws.com/api?lat=${currentLocation.latitude}&long=${currentLocation.longitude}`)
            const {data} = response;

            if (data) {
                const {restaurants} = data;

                restaurants.map((restaurant: any) => {
                    coordinate.push({
                        name: restaurant.name,
                        latitude: restaurant.lat,
                        longitude: restaurant.long,
                    })
                })
            }

        } catch (error) {
            const message = `an Error occured: ${error}`;
            throw new Error(error);
        }
        setRestaurants(coordinate);
    }
    
    const watchPosition = async () => {
       const loc =  await Location.watchPositionAsync(
            {
              distanceInterval: 20,
              timeInterval: 10000
            },
            (newLocation) => {
              let { coords } = newLocation;
              let region = {
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.045
              };
              setRegion(region)
            },
          );
          return loc;
    }

    /*const enableLocation = async () => {

        if (await Location.hasServicesEnabledAsync() === true && 
         (await Location.getForegroundPermissionsAsync()).status === 'granted' ) {
            return true;
        } else {
            return false;
        }
    }*/

    useEffect(() => {    
        console.log("will mount");
        //async () => {
            //if (await enableLocation() === false) {
                getCurrentPos();
                console.log("position: ", currentLocation);
                watchPosition();
            //}
        //}

        return () => {
            console.log("will unmount");
        }
    }, [])

    useEffect(() => {
        console.log('DidUpdate');

        const id = setInterval(getRestaurant(), 50000);
        return () => {
            clearInterval(id);
        }
    }, [currentLocation])

    
    return (
        <SafeAreaView style={styles.container}>
            <MapView
                style={{ flex: 1 }}
                region={region}
                onRegionChangeComplete={region => setCurrentLocation(region)}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                rotateEnabled={true}
                onPanDrag={(event) => {
                    event.preventDefault()
                    console.log("event: ", event.nativeEvent)
                }}
                onPress={(event) => {
                    event.preventDefault()
                    console.log("event: ", event.nativeEvent)
                }}
            >
                {
                    restaurants?.map((element, id) => {
                        return(
                            <Marker 
                            latitude={element.latitude} 
                            longitude={element.longitude}
                            key={`Marker_${element.latitude}_${id}`}/>
                        )
                    })
                }
                
            </MapView>

        </SafeAreaView>)
}

export default Map;