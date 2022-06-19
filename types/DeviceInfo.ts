import {FinalData} from './FinalData';

export interface DeviceInfo {
  id: string;
  rssi: number;
  name: string;
  data: Partial<FinalData>;
}
export const isDeviceInfo = (d: unknown): d is DeviceInfo => {
  const data = d as DeviceInfo;

  return data.id !== undefined && data.name !== undefined;
};
