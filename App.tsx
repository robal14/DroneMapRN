import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DeviceList} from './components/DeviceList';
import {BluetoothProvider} from './bluetooth/context';
import MapView from './components/Screens/MapView';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <BluetoothProvider>
      <SafeAreaView style={backgroundStyle}>
        <MapView />
      </SafeAreaView>
    </BluetoothProvider>
  );
};

export default App;
