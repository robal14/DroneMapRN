import React from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectBluetoothData} from '../../store/slices/bluetooth/slice';
import {Device} from '../Device/Device';

export const DeviceList: React.VFC = () => {
  const {devices} = useSelector(selectBluetoothData);

  return (
    <View>
      <FlatList
        data={devices}
        renderItem={({index, item}) => <Device key={index} data={item} />}
      />
    </View>
  );
};
