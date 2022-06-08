export interface Location {
  status: number;
  statusString: string;
  heightType: number;
  heightTypeString: string;
  ewDirection: number;
  speedMult: number;
  direction: number;
  speedHori: number;
  speedVert: number;
  droneLat: number;
  droneLon: number;
  altitudePressure: number;
  altitudeGeodetic: number;
  height: number;
  horizontalAccuracy: number;
  horizontalAccuracyString: string;
  verticalAccuracy: number;
  verticalAccuracyString: string;
  baroAccuracy: number;
  baroAccuracyString: string;
  speedAccuracy: number;
  speedAccuracyString: string;
  timestamp: number;
  timestampString: string;
  timeAccuracy: number;
  distance: number;
}

export const isLocation = (d: unknown): d is Location => {
  const data = d as Location;

  return data.status !== undefined && data.droneLat !== undefined;
};
