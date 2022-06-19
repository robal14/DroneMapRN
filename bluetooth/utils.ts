import {PermissionsAndroid, Platform} from 'react-native';
import {MessageType} from '../types/MessageType';
import Permissions from 'react-native-location/dist/lib/permissions';

export const noop = () => {};

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

export const mapToType = (typeId: number) => {
  switch (typeId) {
    case 0:
      return MessageType.BASIC_ID;
    case 1:
      return MessageType.LOCATION;
    case 2:
      return MessageType.AUTH;
    case 3:
      return MessageType.SELF_ID;
    case 4:
      return MessageType.SYSTEM;
    case 5:
      return MessageType.OPERATOR_ID;
    case 6:
      return MessageType.MESSAGE_PACK;
    default:
      return MessageType.NOT_DEFINED;
  }
};
