import {PermissionsAndroid, Platform} from 'react-native';

export const requestPermissions = () => {
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(result => {
      if (result) {
        console.log('Permission is OK');
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(res => {
          if (res) {
            console.log('User accept');
          } else {
            console.log('User refuse');
          }
        });
      }
    });
  }
};
