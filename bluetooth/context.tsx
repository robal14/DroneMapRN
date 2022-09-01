import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {DeviceInfo} from '../types/DeviceInfo';
import {StatusEnum} from '../types/StatusEnum';
import {noop, requestPermissions} from './utils';
import BleManager, {AdvertisingData} from 'react-native-ble-manager';
import {useInterval} from '../hooks/useInterval';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {differenceInMilliseconds, differenceInSeconds, format} from 'date-fns';

import {DroneData} from './BtClass/DroneData';
import {isAuthData} from '../types/AuthData';
import {isBasicId} from '../types/BasicId';
import {isLocation} from '../types/Location';
import {isSelfId} from '../types/SelfId';
import {isOperatorId} from '../types/OperatorId';
import {isSystemMsg} from '../types/SystemMsg';
import {FinalData} from '../types/FinalData';
import {
  readAuthData,
  readBasicId,
  readDeviceInfo,
  readLocation,
  readOperatorId,
  readSelfId,
  readSystemMsg,
} from './BtClass/Translator';

export const BleManagerModule = NativeModules.BleManager;
export const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export const OFFSET = 6;
export const MAX_MESSAGE_SIZE = 25;

interface BluetoothState {
  devices: Record<string, DeviceInfo>;
  status: StatusEnum;
  currentDevice: string | null;
  selectDevice: (id: string | null) => void;
}

interface AddDeviceAction {
  type: 'AddDevice';
  payload: DeviceInfo;
}
interface SelectDeviceAction {
  type: 'SelectDeviceAction';
  payload: string | null;
}
interface RemoveDeviceAction {
  type: 'RemoveDevice';
  payload: string;
}
type ActionType = AddDeviceAction | SelectDeviceAction | RemoveDeviceAction;

export const initialState: BluetoothState = {
  devices: {},
  status: StatusEnum.INITIAL,
  currentDevice: null,
  selectDevice: noop,
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

      return {
        ...state,
        devices: {
          ...state.devices,
          [payload.id]: {
            ...payload,
            data: {...state.devices[payload.id]?.data, ...payload.data},
          },
        },
      };
    case 'SelectDeviceAction':
      return {...state, currentDevice: payload};
    case 'RemoveDevice':
      const newState = {...state};
      delete newState.devices[payload];
      return newState;
    default:
      return state;
  }
};

export const BluetoothProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isScanning, setIsScanning] = useState(false);

  const startScan = useCallback(() => {
    if (!isScanning) {
      BleManager.scan([], 3, true, {scanMode: 2})
        .then(() => {
          console.log('Scanning...');
          setIsScanning(true);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [isScanning]);

  const removeDevice = useCallback(() => {
    const currentDate = new Date();

    Object.entries(state.devices).forEach(([key, value]) => {
      if (differenceInMilliseconds(currentDate, value.updatedAt) > 60_000) {
        dispatch({type: 'RemoveDevice', payload: key});
      }
    });
  }, [state.devices]);

  const handleDiscoverPeripheral = useCallback(
    (peripheral: BleManager.Peripheral) => {
      const advertisingData = peripheral.advertising as AdvertisingData & {
        serviceData: any;
      };

      if (typeof advertisingData.serviceData.fffa === 'undefined') {
        return;
      }
      console.log(advertisingData.manufacturerData.bytes as number);
      const droneData = new DroneData(
        advertisingData.manufacturerData.bytes as number[],
      );

      const p = droneData.getPayload;
      let data: Partial<FinalData> = {};

      if (isAuthData(p)) {
        data = readAuthData(p);
      } else if (isBasicId(p)) {
        data = readBasicId(p);
      } else if (isLocation(p)) {
        data = readLocation(p);
        console.log(data);
      } else if (isSelfId(p)) {
        data = readSelfId(p);
      } else if (isOperatorId(p)) {
        data = readOperatorId(p);
      } else if (isSystemMsg(p)) {
        data = readSystemMsg(p);
      }

      /**
       * Get - 1 byte
       * Short - 2 bytes
       * Int - 4 bytes
       * */

      dispatch({
        type: 'AddDevice',
        payload: {
          id: peripheral.id,
          rssi: peripheral.rssi,
          name: peripheral.name ?? 'UNKNOWN',
          updatedAt: new Date(),
          data,
        },
      });
    },
    [],
  );
  const selectDevice = useCallback((id: string | null) => {
    dispatch({type: 'SelectDeviceAction', payload: id});
  }, []);--
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

  useInterval(
    () => {
      removeDevice();
    },
    10_000,
    [removeDevice],
  );

  return (
    <BluetoothContext.Provider value={{...state, selectDevice}}>
      {children}
    </BluetoothContext.Provider>
  );
};

export const useBluetooth = () => useContext(BluetoothContext);
