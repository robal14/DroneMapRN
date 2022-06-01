import {Buffer} from 'buffer';
import {mapToType} from '../utils';
import {MessageType} from '../../types/MessageType';
import {OFFSET} from '../context';
import {Location} from '../../types/Location';
import {BasicId} from '../../types/BasicId';
import {AuthData} from '../../types/AuthData';
import {SelfId} from '../../types/SelfId';
import {SystemMsg} from '../../types/SystemMsg';
import {OperatorId} from '../../types/OperatorId';

export type PayloadType =
  | Location
  | BasicId
  | AuthData
  | SelfId
  | SystemMsg
  | OperatorId;

export class DroneData {
  payload?: PayloadType;
  private buffer: Buffer;
  static readonly MAX_AUTH_PAGE_ZERO_SIZE: number = 17;
  static readonly MAX_AUTH_PAGE_NON_ZERO_SIZE: number = 23;
  static readonly MAX_AUTH_DATA_PAGES: number = 16;
  static readonly MAX_STRING_BYTE_SIZE: number = 23;
  static readonly MAX_ID_BYTE_SIZE: number = 20;

  constructor(arg: number[]) {
    this.buffer = Buffer.from(arg);

    const typeId = (this.buffer.readIntLE(OFFSET, 1) & 0xff & 0xf0) >> 4;
    const type = mapToType(typeId);

    switch (type) {
      case MessageType.BASIC_ID:
        console.log('basic id:');
        this.payload = this.getBasicId();
        break;
      case MessageType.LOCATION:
        console.log('location:');
        this.payload = this.getLocationData();
        break;
      case MessageType.AUTH:
        console.log('auth:');
        this.payload = this.getAuthData();
        break;
      case MessageType.SELF_ID:
        console.log('selfid:');
        this.payload = this.getSelfId();
        break;
      case MessageType.SYSTEM:
        console.log('system:');
        this.payload = this.getSystemMsg();
        break;
      case MessageType.OPERATOR_ID:
        console.log('operator:');
        this.payload = this.getOperatorId();
        break;
      case MessageType.MESSAGE_PACK:
        console.log('to nie bedzie dzialac :C');
        break;
      default:
        return;
    }
  }

  get getPayload() {
    return this.payload;
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
    basicId.uasId = [];

    for (let i = 0; i < 20; i++) {
      basicId.uasId.push(this.buffer.readUIntLE(OFFSET + 2 + i, 1));
    }

    return basicId as BasicId;
  }

  private getAuthData() {
    const authentication: Partial<AuthData> = {};
    const type = this.buffer.readIntLE(OFFSET + 1, 1);
    authentication.authType = (type & 0xf0) >> 4;
    authentication.authDataPage = type & 0x0f;

    let offset = 0;
    let amount = DroneData.MAX_AUTH_PAGE_ZERO_SIZE;

    if (authentication.authDataPage == 0) {
      authentication.authLastPageIndex =
        this.buffer.readIntLE(OFFSET + 2, 1) & 0xff;
      authentication.authLength = this.buffer.readIntLE(OFFSET + 3, 1) & 0xff;
      authentication.authTimestamp =
        this.buffer.readIntLE(OFFSET + 4, 4) & 0xffffffff;

      // For an explanation, please see the description for struct ODID_Auth_data in:
      // https://github.com/opendroneid/opendroneid-core-c/blob/master/libopendroneid/opendroneid.h
      let len =
        authentication.authLastPageIndex *
          DroneData.MAX_AUTH_PAGE_NON_ZERO_SIZE +
        DroneData.MAX_AUTH_PAGE_ZERO_SIZE;
      if (
        authentication.authLastPageIndex >= DroneData.MAX_AUTH_DATA_PAGES ||
        authentication.authLength > len
      ) {
        authentication.authLastPageIndex = 0;
        authentication.authLength = 0;
        authentication.authTimestamp = 0;
      } else {
        // Display both normal authData data and any possible additional data
        authentication.authLength = len;
      }
    } else {
      offset =
        DroneData.MAX_AUTH_PAGE_ZERO_SIZE +
        (authentication.authDataPage - 1) *
          DroneData.MAX_AUTH_PAGE_NON_ZERO_SIZE;
      amount = DroneData.MAX_AUTH_PAGE_NON_ZERO_SIZE;
    }
    if (
      authentication.authDataPage >= 0 &&
      authentication.authDataPage < DroneData.MAX_AUTH_DATA_PAGES
    ) {
      authentication.authData = [];

      for (let i = offset; i < offset + amount; i++) {
        authentication.authData.push(this.buffer.readIntLE(OFFSET + i, 1));
      }
    }
    return authentication as AuthData;
  }

  private getSelfId() {
    const selfId: Partial<SelfId> = {};

    selfId.descriptionType = this.buffer.readIntLE(OFFSET + 1, 1) & 0xff;
    selfId.operationDescription = this.buffer.readIntLE(
      OFFSET + 2,
      DroneData.MAX_STRING_BYTE_SIZE,
    );

    return selfId as SelfId;
  }

  private getSystemMsg() {
    const systemMsg: Partial<SystemMsg> = {};
    systemMsg.operatorLocationType =
      this.buffer.readIntLE(OFFSET + 1, 1) & 0x03;
    systemMsg.classificationType =
      (this.buffer.readIntLE(OFFSET + 1, 1) & 0x1c) >> 2;
    systemMsg.operatorLatitude = this.buffer.readIntLE(OFFSET + 2, 4);
    systemMsg.operatorLongitude = this.buffer.readIntLE(OFFSET + 6, 4);
    systemMsg.areaCount = this.buffer.readIntLE(OFFSET + 10, 2) & 0xffff;
    systemMsg.areaRadius = this.buffer.readIntLE(OFFSET + 12, 1) & 0xff;
    systemMsg.areaCeiling = this.buffer.readIntLE(OFFSET + 13, 2) & 0xffff;
    systemMsg.areaFloor = this.buffer.readIntLE(OFFSET + 15, 2) & 0xffff;
    systemMsg.category = (this.buffer.readIntLE(OFFSET + 16, 1) & 0xf0) >> 4;
    systemMsg.classValue = this.buffer.readIntLE(OFFSET + 16, 1) & 0x0f;
    systemMsg.operatorAltitudeGeo =
      this.buffer.readIntLE(OFFSET + 17, 2) & 0xffff;
    systemMsg.systemTimestamp =
      this.buffer.readIntLE(OFFSET + 19, 4) & 0xffffffff;
    return systemMsg as SystemMsg;
  }

  private getOperatorId() {
    const operatorId: Partial<OperatorId> = {};
    operatorId.operatorIdType = this.buffer.readIntLE(OFFSET + 1, 1) & 0xff;
    operatorId.operatorId = this.buffer.readIntLE(
      OFFSET + 1,
      DroneData.MAX_ID_BYTE_SIZE,
    );
    return operatorId as OperatorId;
  }
}
