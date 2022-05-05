import React, {useContext} from 'react';

import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {DeviceInfo} from '../types/DeviceInfo';
import {StatusEnum} from '../types/StatusEnum';
import {requestPermissions} from './utils';
import BleManager from 'react-native-ble-manager';
import {useInterval} from '../hooks/useInterval';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {format} from 'date-fns';
export const BleManagerModule = NativeModules.BleManager;
export const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

interface BluetoothState {
  devices: Record<string, DeviceInfo>;
  status: StatusEnum;
}

interface AddDeviceAction {
  type: 'AddDevice';
  payload: DeviceInfo;
}

type ActionType = AddDeviceAction;

export const initialState: BluetoothState = {
  devices: {},
  status: StatusEnum.INITIAL,
};

const BluetoothContext = createContext<BluetoothState>(initialState);

const reducer = (state: BluetoothState, {type, payload}: ActionType) => {
  switch (type) {
    case 'AddDevice':
      console.log(
        `[${format(new Date(), 'HH:mm:ss:SS')}] Added device with ID ${
          payload.id
        }`,
      );

      return {...state, devices: {...state.devices, [payload.id]: payload}};
    default:
      return state;
  }
};

export const BluetoothProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isScanning, setIsScanning] = useState(false);

  const startScan = useCallback(() => {
    if (!isScanning) {
      BleManager.scan([], 1, true, {scanMode: 2})
        .then(() => {
          console.log('Scanning...');
          setIsScanning(true);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [isScanning]);

  const handleDiscoverPeripheral = useCallback(
    (peripheral: BleManager.Peripheral) => {
      dispatch({
        type: 'AddDevice',
        payload: {
          id: peripheral.id,
          rssi: peripheral.rssi,
          name: peripheral.name ?? 'UNKNOWN',
        },
      });
    },
    [],
  );

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    BleManager.start({showAlert: false});

    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );

    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    startScan();
  }, [startScan]);

  useInterval(() => {
    startScan();
  }, 10_000);

  return (
    <BluetoothContext.Provider value={{...state}}>
      {children}
    </BluetoothContext.Provider>
  );
};

export const useBluetooth = () => useContext(BluetoothContext);
