export interface SystemMsg {
  operatorLocationType: number;
  operatorLocationTypeString: string;
  classificationType: number;
  classificationTypeString: string;
  operatorLatitude: number;
  operatorLongitude: number;
  areaCount: number;
  areaRadius: number;
  areaCeiling: number;
  areaCeilingString: string;
  areaFloor: number;
  areaFloorString: string;
  category: number;
  categoryString: string;
  classValue: number;
  classValueString: string;
  operatorAltitudeGeo: number;
  operatorAltitudeGeoString: string;
  systemTimestamp: number;
  systemTimestampString: string;
}

export const isSystemMsg = (d: unknown): d is SystemMsg => {
  const data = d as SystemMsg;

  return (
    data.operatorLocationType !== undefined &&
    data.classificationType !== undefined
  );
};
