import {createSlice} from '@reduxjs/toolkit';
import {DeviceInfo} from '../../../types/DeviceInfo';
import {StatusEnum} from '../../../types/StatusEnum';
import {RootState} from '../../index';

interface BluetoothState {
  devices: Array<DeviceInfo>;
  status: StatusEnum;
}

export const initialState: BluetoothState = {
  devices: [],
  status: StatusEnum.INITIAL,
};

const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState,
  reducers: {},
  extraReducers: _builder => {},
});

export const selectBluetoothData = (state: RootState) => state.bluetooth;

export const bluetoothReducer = bluetoothSlice.reducer;
