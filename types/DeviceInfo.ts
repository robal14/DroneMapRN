export interface DeviceInfo {
  id: string;
  rssi: number;
  name: string;
}
export const isDeviceInfo = (d: unknown): d is DeviceInfo => {
  const data = d as DeviceInfo;

  return data.id !== undefined && data.name !== undefined;
};
