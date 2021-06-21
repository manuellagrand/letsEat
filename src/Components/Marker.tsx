import React, { FC, useState, useEffect, ReactElement } from 'react';
import MapView, { Marker as NMarker } from 'react-native-maps';
import * as Location from 'expo-location';
import { AppStyle as styles } from '../Styles/styles';
import { Text, View, BackHandler } from 'react-native';


interface IMarker {
    data: Array<any>,
}

const Marker: FC<IMarker> = (props: IMarker): any => {
        props.data.map((element, id) => {
            return (
                <NMarker coordinate={{latitude: element.latitude, longitude: element.longitude}} key={id}/>
            );
        })
}

export default Marker;