export interface Location {
  status: number;
  heightType: number;
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
  verticalAccuracy: number;
  baroAccuracy: number;
  speedAccuracy: number;
  timestamp: number;
  timeAccuracy: number;
  distance: number;
}

export const isLocation = (d: unknown): d is Location => {
  const data = d as Location;

  return data.status !== undefined && data.droneLat !== undefined;
};
