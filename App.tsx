import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BluetoothProvider} from './bluetooth/context';

import MapView from './components/Screens/MapView';
import {DeviceList} from './components/DeviceList';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SafeAreaView, {SafeAreaProvider} from 'react-native-safe-area-view';
import DeviceModal from './components/DeviceModal/DeviceModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TabBarIcon from '@react-navigation/bottom-tabs/lib/typescript/src/views/TabBarIcon';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <BluetoothProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen
                name="Device Map"
                component={MapView}
                options={{
                  tabBarLabel: 'Device Map',
                  tabBarIcon: ({color, size}) => (
                    <Ionicons name="map" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="Device List"
                component={DeviceList}
                options={{
                  tabBarLabel: 'Device List',
                  tabBarIcon: ({color, size}) => (
                    <Ionicons name="list" color={color} size={size} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
          <DeviceModal />
        </SafeAreaView>
      </SafeAreaProvider>
    </BluetoothProvider>
  );
};
