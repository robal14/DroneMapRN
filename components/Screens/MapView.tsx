import React, {useEffect, useMemo, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Dimensions, StyleSheet, Image} from 'react-native';
import {useBluetooth} from '../../bluetooth/context';
const height = Dimensions.get('window').height;
import Geolocation from '@react-native-community/geolocation';

const styles = StyleSheet.create({
  map: {
    height,
  },
});

const Map = () => {
  const mapRef = useRef<MapView>(null);
  const {selectDevice} = useBluetooth();
  const {devices} = useBluetooth();
  const devicesLocations = useMemo(() => {
    return Object.entries(devices).map(([key, value]) => ({
      id: key,
      coordinates: {
        latitude: value.data.droneLat,
        longitude: value.data.droneLon,
      },
      title: value.name,
      description: value.id,
      icon: require('./drone-icon.png'),
    }));
  }, [devices]);

  useEffect(() => {
    if (mapRef.current) {
      Geolocation.getCurrentPosition(({coords}) => {
        mapRef.current!.fitToCoordinates([coords], {
          animated: true,
        });
      });
    }
  }, []);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      loadingEnabled
      followsUserLocation
      showsUserLocation>
      {devicesLocations.map(marker => {
        if (!marker.coordinates.latitude || !marker.coordinates.longitude) {
          return null;
        }

        return (
          <Marker
            key={marker.id}
            title={marker.title}
            description={marker.description}
            onCalloutPress={() => selectDevice(marker.id)}
            coordinate={{
              latitude: marker.coordinates.latitude,
              longitude: marker.coordinates.longitude,
            }}>
            <Image source={marker.icon} style={{height: 32, width: 32}} />
          </Marker>
        );
      })}
    </MapView>
  );
};

export default Map;
