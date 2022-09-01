import {FinalData} from './FinalData';

export interface DeviceInfo {
  id: string;
  rssi: number;
  name: string;
  updatedAt: Date;
  data: Partial<FinalData>;
}
