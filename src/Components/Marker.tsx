import React, { FC, useState, useEffect, ReactElement } from 'react';
import MapView, { Marker as NMarker } from 'react-native-maps';
import { AppStyle as styles } from '../Styles/styles';
import { Text, View, BackHandler } from 'react-native';


interface IMarker {
    latitude: number,
    longitude: number,
}

const Marker: FC<IMarker> = (props: IMarker): any => {
    return (
        <NMarker coordinate={{ latitude: props.latitude, longitude: props.longitude }} />
    );
}

export default Marker;