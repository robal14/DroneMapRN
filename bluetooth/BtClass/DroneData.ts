import {Buffer} from 'buffer';
import {mapToType} from '../utils';
import {MessageType} from '../../types/MessageType';
import {OFFSET} from '../context';
import {Location} from '../../types/Location';
import {BasicId} from '../../types/BasicId';

export type PayloadType = Location | BasicId;

export class DroneData {
  private payload?: PayloadType;
  private buffer: Buffer;

  constructor(arg: number[]) {
    this.buffer = Buffer.from(arg);

    const typeId = (this.buffer.readIntLE(OFFSET, 1) & 0xff & 0xf0) >> 4;
    const type = mapToType(typeId);

    switch (type) {
      case MessageType.BASIC_ID:
        console.log('basic id dziala');
        this.payload = this.getBasicId();
        break;
      case MessageType.LOCATION:
        console.log('location dziala');
        this.payload = this.getLocationData();
        break;
      case MessageType.AUTH:
        console.log('auth dziala');
        break;
      case MessageType.SELF_ID:
        console.log('selfid dziala');
        break;
      case MessageType.SYSTEM:
        console.log('system dziala');
        break;
      case MessageType.OPERATOR_ID:
        console.log('operator dziala');
        break;
      case MessageType.MESSAGE_PACK:
        console.log('basic id dziala');
        break;
      default:
        return;
    }
  }

  public getPayload() {
    return {...this.payload};
  }

  private getLocationData() {
    const location: Partial<Location> = {};

    location.status = (this.buffer.readIntLE(OFFSET + 1, 1) & 0xf0) >> 4;
    location.heightType = (this.buffer.readIntLE(OFFSET + 1, 1) & 0x04) >> 2;
    location.ewDirection = (this.buffer.readIntLE(OFFSET + 1, 1) & 0x02) >> 1;
    location.speedMult = this.buffer.readIntLE(OFFSET + 1, 1) & 0x01;
    location.direction = this.buffer.readIntLE(OFFSET + 2, 1) & 0xff;
    location.speedHori = this.buffer.readIntLE(OFFSET + 3, 1) & 0xff;
    location.speedVert = this.buffer.readIntLE(OFFSET + 4, 1);
    location.droneLat = this.buffer.readIntLE(OFFSET + 5, 4);
    location.droneLon = this.buffer.readIntLE(OFFSET + 9, 4);
    location.altitudePressure = this.buffer.readIntLE(OFFSET + 13, 2) & 0xffff;
    location.altitudeGeodetic = this.buffer.readIntLE(OFFSET + 15, 2) & 0xffff;
    location.height = this.buffer.readIntLE(OFFSET + 17, 2) & 0xffff;

    const horiVertAccuracy = this.buffer.readIntLE(OFFSET + 19, 1);

    location.horizontalAccuracy = horiVertAccuracy & 0x0f;
    location.verticalAccuracy = (horiVertAccuracy & 0xf0) >> 4;

    const speedBaroAccuracy = this.buffer.readIntLE(OFFSET + 29, 1);

    location.baroAccuracy = (speedBaroAccuracy & 0xf0) >> 4;
    location.speedAccuracy = speedBaroAccuracy & 0x0f;
    location.timestamp = this.buffer.readIntLE(OFFSET + 30, 2) & 0xffff;
    location.timeAccuracy = this.buffer.readIntLE(OFFSET + 32, 1) & 0x0f;
    // Use an older retrieved receiver location to calculate the distance to the drone
    // if (droneLat != 0 && droneLon != 0) {
    //   android.Location droneLoc = new android.location.Location("");
    //   droneLoc.setLatitude(location.getLatitude());
    //   droneLoc.setLongitude(location.getLongitude());
    //   if (receiverLocation != null)
    //     distance = receiverLocation.distanceTo(droneLoc);
    // }
    return location as Location;
  }

  private getBasicId() {
    const basicId: Partial<BasicId> = {};
    const type = this.buffer.readIntLE(OFFSET + 1, 1);
    basicId.idType = (type & 0xf0) >> 4;
    basicId.uaType = type & 0x0f;
    //byteBuffer.get(basicId.uasId, 0, Constants.MAX_ID_BYTE_SIZE);

    return basicId as BasicId;
  }
}
