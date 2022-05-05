import {DeviceInfo} from '../../types/DeviceInfo';
import {View, Text} from 'react-native';
import React from 'react';

interface Props {
  data: DeviceInfo;
}

export const Device: React.VFC<Props> = ({data}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 12,
          textAlign: 'center',
          color: '#333333',
          padding: 10,
        }}>
        {data.name}
      </Text>
      <Text
        style={{
          fontSize: 10,
          textAlign: 'center',
          color: '#333333',
          padding: 2,
        }}>
        RSSI: {data.rssi}
      </Text>
      <Text
        style={{
          fontSize: 8,
          textAlign: 'center',
          color: '#333333',
          padding: 2,
          paddingBottom: 20,
        }}>
        {data.id}
      </Text>
    </View>
  );
};
