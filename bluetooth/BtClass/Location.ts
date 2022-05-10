import * as buffer from 'buffer';
import {OFFSET} from '../context';

export class Location {
  status: number;
  heightType: number;
  EWDirection: number;
  speedMult: number;
  Direction: number;
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

  //   setLocation()
  // {
  //   let b = buffer;
  //   status = (b.readIntLE(OFFSET, 1) & 0xF0) >> 4;
  //   heightType = (b.readIntLE(OFFSET, 1) & 0x04) >> 2;
  //   EWDirection = (b.readIntLE(OFFSET, 1) & 0x02) >> 1;
  //   speedMult = b.readIntLE(OFFSET, 1) & 0x01;
  //
  //   Direction = b.readIntLE(OFFSET, 1) & 0xFF;
  //   speedHori = b.readIntLE(OFFSET, 1) & 0xFF;
  //   speedVert = b.readIntLE(OFFSET, 1);
  //
  //   droneLat = b.readIntLE(OFFSET, 4);
  //   droneLon = b.readIntLE(OFFSET, 4);
  //
  //   altitudePressure = b.readIntLE(OFFSET, 2) & 0xFFFF;
  //   altitudeGeodetic = b.readIntLE(OFFSET, 2) & 0xFFFF;
  //   height = b.readIntLE(OFFSET, 2) & 0xFFFF;
  //
  //   const horiVertAccuracy = b.readIntLE(OFFSET, 1);
  //   horizontalAccuracy = horiVertAccuracy & 0x0F;
  //   verticalAccuracy = (horiVertAccuracy & 0xF0) >> 4;
  //   const speedBaroAccuracy = byteBuffer.get();
  //   baroAccuracy = (speedBaroAccuracy & 0xF0) >> 4;
  //   speedAccuracy = speedBaroAccuracy & 0x0F;
  //   timestamp = byteBuffer.getShort() & 0xFFFF;
  //   timeAccuracy = byteBuffer.get() & 0x0F;
  //   // Use an older retrieved receiver location to calculate the distance to the drone
  //   if (droneLat != 0 && droneLon != 0) {
  //   android.Location droneLoc = new android.location.Location("");
  //   droneLoc.setLatitude(location.getLatitude());
  //   droneLoc.setLongitude(location.getLongitude());
  //   if (receiverLocation != null)
  //   distance = receiverLocation.distanceTo(droneLoc);
  // }
  // }
}
