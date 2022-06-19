import {DeviceInfo} from '../../types/DeviceInfo';
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useBluetooth} from '../../bluetooth/context';

interface Props {
  data: DeviceInfo;
}

export const Device: React.VFC<Props> = ({data}) => {
  const {selectDevice} = useBluetooth();

  return (
    <TouchableOpacity onPress={() => selectDevice(data.id)}>
      <Text
        style={{
          fontSize: 12,
          textAlign: 'center',
          color: '#000',
          padding: 10,
        }}>
        {data.name}
      </Text>
      <Text
        style={{
          fontSize: 10,
          textAlign: 'center',
          color: '#000',
          padding: 2,
        }}>
        RSSI: {data.rssi}
      </Text>
      <Text
        style={{
          fontSize: 8,
          textAlign: 'center',
          color: '#000',
          padding: 2,
          paddingBottom: 20,
        }}>
        {data.id}
      </Text>
    </TouchableOpacity>
  );
};
