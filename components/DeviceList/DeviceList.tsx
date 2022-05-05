import React from 'react';
import {FlatList} from 'react-native';
import {Device} from '../Device';
import {useBluetooth} from '../../bluetooth/context';

export const DeviceList: React.VFC = () => {
  const {devices} = useBluetooth();

  return (
    <FlatList
      data={Object.values(devices)}
      renderItem={({item}) => <Device key={item.id} data={item} />}
    />
  );
};
