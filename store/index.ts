import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {bluetoothReducer} from './slices/bluetooth/slice';
import {useDispatch} from 'react-redux';

const rootReducer = combineReducers({bluetooth: bluetoothReducer});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
