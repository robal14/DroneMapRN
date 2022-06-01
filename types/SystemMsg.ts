export interface SystemMsg {
  operatorLocationType: number;
  classificationType: number;
  operatorLatitude: number;
  operatorLongitude: number;
  areaCount: number;
  areaRadius: number;
  areaCeiling: number;
  areaFloor: number;
  category: number;
  classValue: number;
  operatorAltitudeGeo: number;
  systemTimestamp: number;
}

export const isSystemMsg = (d: unknown): d is SystemMsg => {
  const data = d as SystemMsg;

  return (
    data.operatorLocationType !== undefined &&
    data.classificationType !== undefined
  );
};
