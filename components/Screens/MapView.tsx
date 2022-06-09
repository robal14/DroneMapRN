import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Dimensions, StyleSheet} from 'react-native';
import RNLocation from 'react-native-location';
import {FinalData} from '../../types/FinalData';
const height = Dimensions.get('window').height;
const final: Partial<FinalData> = {};

const styles = StyleSheet.create({
  map: {
    height,
  },
});

let response = [
  {
    id: final.id,
    coordinates: {
      latitude: 53.483924741039594,
      longitude: 14.5355242226861,
    },
  },
];

const Map = () => {
  return (
    <MapView
      style={styles.map}
      loadingEnabled={true}
      showsUserLocation={true}
      // region={{
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      //   latitudeDelta: 0.015,
      //   longitudeDelta: 0.0121,
      // }}
    >
      {response.map(marker => (
        <Marker key={marker.id} coordinate={marker.coordinates}></Marker>
      ))}
    </MapView>
  );
};

export default Map;
