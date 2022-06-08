import {FinalData} from '../../types/FinalData';
import {Location} from '../../types/Location';
import {AuthData} from '../../types/AuthData';
import {AuthType} from '../../types/AuthType';
import {BasicId} from '../../types/BasicId';
import {SelfId} from '../../types/SelfId';
import {DeviceInfo} from '../../types/DeviceInfo';
import {OperatorId} from '../../types/OperatorId';
import {DroneData} from './DroneData';
import {SystemMsg} from '../../types/SystemMsg';

export function readAuthData(p: AuthData) {
  const final: Partial<FinalData> = {};
  //AuthType
  function setAuthType() {
    switch (p.authType) {
      case 1:
        final.authType = AuthType.UAS_ID_Signature;
        break;
      case 2:
        final.authType = AuthType.Operator_ID_Signature;
        break;
      case 3:
        final.authType = AuthType.Message_Set_Signature;
        break;
      case 4:
        final.authType = AuthType.Network_Remote_ID;
        break;
      case 5:
        final.authType = AuthType.Specific_Authentication;
        break;
      case 0xa:
        final.authType = AuthType.Private_Use_0xA;
        break;
      case 0xb:
        final.authType = AuthType.Private_Use_0xB;
        break;
      case 0xc:
        final.authType = AuthType.Private_Use_0xC;
        break;
      case 0xd:
        final.authType = AuthType.Private_Use_0xD;
        break;
      case 0xe:
        final.authType = AuthType.Private_Use_0xE;
        break;
      case 0xf:
        final.authType = AuthType.Private_Use_0xF;
        break;
      default:
        final.authType = AuthType.None;
        break;
    }
  }
  function setAuthTypeAsString() {
    switch (final.authType) {
      case AuthType.UAS_ID_Signature:
        return 'UAS_ID_Signature';
      case AuthType.Operator_ID_Signature:
        return 'Operator_ID_Signature';
      case AuthType.Message_Set_Signature:
        return 'Message_Set_Signature';
      case AuthType.Network_Remote_ID:
        return 'Network_Remote_ID';
      case AuthType.Specific_Authentication:
        return 'Specific_Authentication';
      case AuthType.Private_Use_0xA:
        return 'Private_Use_0xA';
      case AuthType.Private_Use_0xB:
        return 'Private_Use_0xB';
      case AuthType.Private_Use_0xC:
        return 'Private_Use_0xC';
      case AuthType.Private_Use_0xD:
        return 'Private_Use_0xD';
      case AuthType.Private_Use_0xE:
        return 'Private_Use_0xE';
      case AuthType.Private_Use_0xF:
        return 'Private_Use_0xF';
      default:
        return 'None';
    }
  }
  setAuthType();
  final.authTypeString = setAuthTypeAsString();
  console.log('AuthTypeString:' + final.authTypeString);
  //AuthDataPage
  function setAuthDataPage() {
    if (p.authDataPage < 0) p.authDataPage = 0;
    if (p.authDataPage > 15) final.authDataPage = 15;
    final.authDataPage = p.authDataPage;
  }
  setAuthDataPage();
  console.log('AuthDataPage:' + final.authDataPage);
  //AuthLastPageIndex
  function setAuthLastPageIndex() {
    if (p.authLastPageIndex < 0) final.authLastPageIndex = 0;
    if (p.authLastPageIndex > 15) final.authLastPageIndex = 15;
    final.authLastPageIndex = p.authLastPageIndex;
  }
  setAuthLastPageIndex();
  console.log('AuthLastPageIndex:' + final.authLastPageIndex);
  //AuthLength
  function setAuthLength() {
    if (p.authLength < 0) final.authLength = 0;
    if (p.authLength > 362) final.authLength = 362;
    final.authLength = p.authLength;
  }
  setAuthLength();
  console.log('authLength:' + final.authLength);
  //AuthTimestamp
  function getAuthTimestamp() {
    if ((p.authTimestamp = 0)) final.authTimestampString = 'Unknown';
    final.authTimestamp = p.authTimestamp;
    final.authTimestampString = '' + final.authTimestamp;
  }
  getAuthTimestamp();
  console.log('AuthTimeStamp:' + final.authTimestampString);
  //AuthData
  function getAuthDataAsString() {
    final.authData = [];
    for (let i = 0; i < final.authLength; i++) {
      // final.authDataString = final.authDataString + p.authData[i];
      final.authData.push(p.authData[i]);
    }
  }
  getAuthDataAsString();
  console.log('AuthData:' + final.authData);
  console.log('AuthDataString:' + p.authDataString);
}

export function readBasicId(p: BasicId) {
  const final: Partial<FinalData> = {};

  //IdType
  enum IdTypeEnum {
    None,
    Serial_Number,
    CAA_Registration_ID,
    UTM_Assigned_ID,
    Specific_Session_ID,
  }

  function setIdType() {
    switch (p.idType) {
      case 1:
        final.idType = IdTypeEnum.Serial_Number;
        break;
      case 2:
        final.idType = IdTypeEnum.CAA_Registration_ID;
        break;
      case 3:
        final.idType = IdTypeEnum.UTM_Assigned_ID;
        break;
      case 4:
        final.idType = IdTypeEnum.Specific_Session_ID;
        break;
      default:
        final.idType = IdTypeEnum.None;
        break;
    }
  }

  function setIdTypeAsString() {
    setIdType();
    switch (final.idType) {
      case IdTypeEnum.Serial_Number:
        return 'Serial_Number';
      case IdTypeEnum.CAA_Registration_ID:
        return 'CAA_Registration_ID';
      case IdTypeEnum.UTM_Assigned_ID:
        return 'UTM_Assigned_ID';
      case IdTypeEnum.Specific_Session_ID:
        return 'Specific_Session_ID';
      default:
        return 'None';
    }
  }

  final.idTypeString = setIdTypeAsString();
  console.log('IdTypeString:' + final.idTypeString);

  //UaType
  enum UaTypeEnum {
    None,
    Aeroplane,
    Helicopter_or_Multirotor,
    Gyroplane,
    Hybrid_Lift, // VTOL. Fixed wing aircraft that can take off vertically
    Ornithopter,
    Glider,
    Kite,
    Free_balloon,
    Captive_balloon,
    Airship,
    Free_fall_parachute, // Unpowered
    Rocket,
    Tethered_powered_aircraft,
    Ground_obstacle,
    Other,
  }

  function setUaType() {
    switch (p.uaType) {
      case 1:
        final.uaType = UaTypeEnum.Aeroplane;
        break;
      case 2:
        final.uaType = UaTypeEnum.Helicopter_or_Multirotor;
        break;
      case 3:
        final.uaType = UaTypeEnum.Gyroplane;
        break;
      case 4:
        final.uaType = UaTypeEnum.Hybrid_Lift;
        break;
      case 5:
        final.uaType = UaTypeEnum.Ornithopter;
        break;
      case 6:
        final.uaType = UaTypeEnum.Glider;
        break;
      case 7:
        final.uaType = UaTypeEnum.Kite;
        break;
      case 8:
        final.uaType = UaTypeEnum.Free_balloon;
        break;
      case 9:
        final.uaType = UaTypeEnum.Captive_balloon;
        break;
      case 10:
        final.uaType = UaTypeEnum.Airship;
        break;
      case 11:
        final.uaType = UaTypeEnum.Free_fall_parachute;
        break;
      case 12:
        final.uaType = UaTypeEnum.Rocket;
        break;
      case 13:
        final.uaType = UaTypeEnum.Tethered_powered_aircraft;
        break;
      case 14:
        final.uaType = UaTypeEnum.Ground_obstacle;
        break;
      case 15:
        final.uaType = UaTypeEnum.Other;
        break;
      default:
        final.uaType = UaTypeEnum.None;
        break;
    }
  }
  setUaType();
  function setUaTypeAsString() {
    switch (final.uaType) {
      case UaTypeEnum.Aeroplane:
        return 'Aeroplane';
      case UaTypeEnum.Helicopter_or_Multirotor:
        return 'Helicopter_or_Multirotor';
      case UaTypeEnum.Gyroplane:
        return 'Gyroplane';
      case UaTypeEnum.Hybrid_Lift:
        return 'Hybrid_Lift';
      case UaTypeEnum.Ornithopter:
        return 'Ornithopter';
      case UaTypeEnum.Glider:
        return 'Glider';
      case UaTypeEnum.Kite:
        return 'Kite';
      case UaTypeEnum.Free_balloon:
        return 'Free_balloon';
      case UaTypeEnum.Captive_balloon:
        return 'Captive_balloon';
      case UaTypeEnum.Airship:
        return 'Airship';
      case UaTypeEnum.Free_fall_parachute:
        return 'Free_fall_parachute';
      case UaTypeEnum.Rocket:
        return 'Rocket';
      case UaTypeEnum.Tethered_powered_aircraft:
        return 'Tethered_powered_aircraft';
      case UaTypeEnum.Ground_obstacle:
        return 'Ground_obstacle';
      case UaTypeEnum.Other:
        return 'Other';
      case UaTypeEnum.None:
        return 'None';
    }
  }
  final.uaTypeString = setUaTypeAsString();
  console.log('UaType:' + final.uaTypeString);
  function getUasId() {
    if (p.uasId.length <= 20) final.uasId = p.uasId;
  }
  function getUasIdAsString() {
    getUasId();
    if (final.uasId != null) {
      if (
        final.idType == IdTypeEnum.Serial_Number ||
        final.idType == IdTypeEnum.CAA_Registration_ID
      )
        return (final.uasIdString = String.fromCharCode.apply(null, p.uasId));
    }
  }

  getUasIdAsString();
  console.log('UasId:' + final.uasId);
  console.log('UasIdString:' + final.uasIdString);
}

export function readLocation(p: Location) {
  const final: Partial<FinalData> = {};

  //Status
  enum StatusEnum {
    Undeclared,
    Ground,
    Airborne,
    Emergency,
    Remote_ID_System_Failure,
  }

  switch (p.status) {
    case 1:
      final.status = StatusEnum.Ground;
      break;
    case 2:
      final.status = StatusEnum.Airborne;
      break;
    case 3:
      final.status = StatusEnum.Emergency;
      break;
    case 4:
      final.status = StatusEnum.Remote_ID_System_Failure;
      break;
    default:
      final.status = StatusEnum.Undeclared;
      break;
  }

  function getStatusAsString() {
    switch (final.status) {
      case StatusEnum.Ground:
        return 'Ground';
      case StatusEnum.Airborne:
        return 'Airborne';
      case StatusEnum.Emergency:
        return 'Emergency';
      case StatusEnum.Remote_ID_System_Failure:
        return 'Remote_ID_System_Failure';
      default:
        return 'Undeclared';
    }
  }
  final.statusString = getStatusAsString();
  console.log('status:' + final.statusString);
  //HeightType
  enum heightTypeEnum {
    Takeoff,
    Ground,
  }

  function setHeightType() {
    if (p.heightType == 1) final.heightType = heightTypeEnum.Ground;
    else final.heightType = heightTypeEnum.Takeoff;
  }
  setHeightType();
  function setHeightTypeAsString() {
    switch (final.heightType) {
      case heightTypeEnum.Ground:
        return 'Ground';
      case heightTypeEnum.Takeoff:
        return 'Takeoff';
    }
  }
  final.heightTypeString = setHeightTypeAsString();
  console.log('HeightType:' + final.heightTypeString);
  // direction
  if (p.direction < 0 || p.direction > 360) p.direction = 361; // 361 is defined in the specification as the Invalid value
  function calcDirection(dir: number, ewDir: number) {
    if (ewDir == 0) return dir;
    else return dir + 180;
  }

  final.direction = calcDirection(p.direction, p.ewDirection);
  console.log('dir:' + final.direction);
  // speedHorizontal
  if (p.speedHori < 0 || p.speedHori > 254.25) p.speedHori = 255;

  function calcSpeedHori(value: number, mult: number) {
    if (mult == 0) return value * 0.25;
    else return value * 0.75 + 255 * 0.25;
  }

  final.speedHori = calcSpeedHori(p.speedHori, p.speedMult);
  console.log('speedHori:' + final.speedHori);
  //speedVert
  if (p.speedVert < -62 || p.speedVert > 62) p.speedVert = 63;
  final.speedVert = p.speedVert * 0.5;
  console.log('speedVert:' + final.speedVert);
  //Lattitude
  final.droneLat = 1e-7 * p.droneLat;

  if (final.droneLat < -90 || final.droneLat > 90) {
    final.droneLat = 0;
    final.droneLon = 0; // both equal to zero is defined in the specification as the Invalid value
  }
  console.log('droneLat:' + final.droneLat);
  //Longitude
  final.droneLon = 1e-7 * p.droneLon;

  if (final.droneLon < -180 || final.droneLon > 180) {
    final.droneLon = 0;
    final.droneLon = 0; // both equal to zero is defined in the specification as the Invalid value
  }
  console.log('droneLon:' + final.droneLon);

  //Altitude Pressure
  if (p.altitudePressure < -1000 || p.altitudePressure > 31767)
    final.altitudePressure = -1000;

  function calcAltitude(value: number) {
    value = value / 2 - 1000;
    return value;
  }

  final.altitudePressure = calcAltitude(p.altitudePressure);
  if (final.altitudePressure === -1000) {
    console.log('unknown');
  } //-1000 is defined as unknown in specification
  else {
    console.log('altPress:' + final.altitudePressure);
  }
  //Altitude Geodetic
  if (p.altitudeGeodetic < -1000 || p.altitudeGeodetic > 31767) {
    final.altitudeGeodetic = -1000;
  }
  final.altitudeGeodetic = calcAltitude(p.altitudeGeodetic);
  if (final.altitudeGeodetic === -1000) {
    console.log('unknown');
  } //-1000 is defined as uknown in specification
  else {
    console.log('altGeo:' + final.altitudeGeodetic);
  }
  //Height
  if (p.height < -1000 || p.height > 31767) final.height = -1000;
  else final.height = p.height;
  console.log('height:' + final.height);

  //HorizontalAccuracy
  enum HorizontalAccuracyEnum {
    Unknown,
    kilometers_18_52,
    kilometers_7_408,
    kilometers_3_704,
    kilometers_1_852,
    meters_926,
    meters_555_6,
    meters_185_2,
    meters_92_6,
    meters_30,
    meters_10,
    meters_3,
    meters_1,
  }

  switch (p.horizontalAccuracy) {
    case 1:
      final.horizontalAccuracy = HorizontalAccuracyEnum.kilometers_18_52;
    case 2:
      final.horizontalAccuracy = HorizontalAccuracyEnum.kilometers_7_408;
      break;
    case 3:
      final.horizontalAccuracy = HorizontalAccuracyEnum.kilometers_3_704;
      break;
    case 4:
      final.horizontalAccuracy = HorizontalAccuracyEnum.kilometers_1_852;
      break;
    case 5:
      final.horizontalAccuracy = HorizontalAccuracyEnum.meters_926;
      break;
    case 6:
      final.horizontalAccuracy = HorizontalAccuracyEnum.meters_555_6;
      break;
    case 7:
      final.horizontalAccuracy = HorizontalAccuracyEnum.meters_185_2;
      break;
    case 8:
      final.horizontalAccuracy = HorizontalAccuracyEnum.meters_92_6;
      break;
    case 9:
      final.horizontalAccuracy = HorizontalAccuracyEnum.meters_30;
      break;
    case 10:
      final.horizontalAccuracy = HorizontalAccuracyEnum.meters_10;
      break;
    case 11:
      final.horizontalAccuracy = HorizontalAccuracyEnum.meters_3;
      break;
    case 12:
      final.horizontalAccuracy = HorizontalAccuracyEnum.meters_1;
      break;
    default:
      final.horizontalAccuracy = HorizontalAccuracyEnum.Unknown;
      break;
  }

  function getHorizontalAccuracyAsString() {
    switch (final.horizontalAccuracy) {
      case HorizontalAccuracyEnum.kilometers_18_52:
        return '< 18.52 km';
      case HorizontalAccuracyEnum.kilometers_7_408:
        return '< 7.408 km';
      case HorizontalAccuracyEnum.kilometers_3_704:
        return '< 3.704 km';
      case HorizontalAccuracyEnum.kilometers_1_852:
        return '< 1.852 km';
      case HorizontalAccuracyEnum.meters_926:
        return '< 926 m';
      case HorizontalAccuracyEnum.meters_555_6:
        return '< 555.6 m';
      case HorizontalAccuracyEnum.meters_185_2:
        return '< 185.2 m';
      case HorizontalAccuracyEnum.meters_92_6:
        return '< 92.6 m';
      case HorizontalAccuracyEnum.meters_30:
        return '< 30 m';
      case HorizontalAccuracyEnum.meters_10:
        return '< 10 m';
      case HorizontalAccuracyEnum.meters_3:
        return '< 3 m';
      case HorizontalAccuracyEnum.meters_1:
        return '< 1 m';
      default:
        return 'Unknown';
    }
  }

  final.horizontalAccuracyString = getHorizontalAccuracyAsString();
  console.log('HorizontalAcc:' + final.horizontalAccuracyString);

  //VerticalAccuracy
  enum VerticalAccuracyEnum {
    Unknown,
    meters_150,
    meters_45,
    meters_25,
    meters_10,
    meters_3,
    meters_1,
  }

  switch (p.verticalAccuracy) {
    case 1:
      final.verticalAccuracy = VerticalAccuracyEnum.meters_150;
      break;
    case 2:
      final.verticalAccuracy = VerticalAccuracyEnum.meters_45;
      break;
    case 3:
      final.verticalAccuracy = VerticalAccuracyEnum.meters_25;
      break;
    case 4:
      final.verticalAccuracy = VerticalAccuracyEnum.meters_10;
      break;
    case 5:
      final.verticalAccuracy = VerticalAccuracyEnum.meters_3;
      break;
    case 6:
      final.verticalAccuracy = VerticalAccuracyEnum.meters_1;
      break;
    default:
      final.verticalAccuracy = VerticalAccuracyEnum.Unknown;
  }

  function getVerticalAccuracyAsString() {
    switch (final.verticalAccuracy) {
      case VerticalAccuracyEnum.meters_150:
        return '< 150 m';
      case VerticalAccuracyEnum.meters_45:
        return '< 45 m';
      case VerticalAccuracyEnum.meters_25:
        return '< 25 m';
      case VerticalAccuracyEnum.meters_10:
        return '< 10 m';
      case VerticalAccuracyEnum.meters_3:
        return '< 3 m';
      case VerticalAccuracyEnum.meters_1:
        return '< 1 m';
      default:
        return 'Unknown';
    }
  }

  final.verticalAccuracyString = getVerticalAccuracyAsString();
  console.log('VerticalAcc:' + final.verticalAccuracyString);

  //BaroAccuracy
  enum BaroAccuracyEnum {
    Unknown,
    meters_150,
    meters_45,
    meters_25,
    meters_10,
    meters_3,
    meters_1,
  }

  switch (p.baroAccuracy) {
    case 1:
      final.baroAccuracy = VerticalAccuracyEnum.meters_150;
      break;
    case 2:
      final.baroAccuracy = BaroAccuracyEnum.meters_45;
      break;
    case 3:
      final.baroAccuracy = BaroAccuracyEnum.meters_25;
      break;
    case 4:
      final.baroAccuracy = BaroAccuracyEnum.meters_10;
      break;
    case 5:
      final.baroAccuracy = BaroAccuracyEnum.meters_3;
      break;
    case 6:
      final.baroAccuracy = BaroAccuracyEnum.meters_1;
      break;
    default:
      final.baroAccuracy = BaroAccuracyEnum.Unknown;
  }

  function getBaroAccuracyAsString() {
    switch (final.baroAccuracy) {
      case BaroAccuracyEnum.meters_150:
        return '< 150 m';
      case BaroAccuracyEnum.meters_45:
        return '< 45 m';
      case BaroAccuracyEnum.meters_25:
        return '< 25 m';
      case BaroAccuracyEnum.meters_10:
        return '< 10 m';
      case BaroAccuracyEnum.meters_3:
        return '< 3 m';
      case BaroAccuracyEnum.meters_1:
        return '< 1 m';
      default:
        return 'Unknown';
    }
  }

  final.baroAccuracyString = getBaroAccuracyAsString();
  console.log('BaroAcc:' + final.baroAccuracyString);

  //SpeedAccuracy
  enum speedAccuracyEnum {
    Unknown,
    meter_per_second_10,
    meter_per_second_3,
    meter_per_second_1,
    meter_per_second_0_3,
  }

  switch (p.speedAccuracy) {
    case 1:
      final.speedAccuracy = speedAccuracyEnum.meter_per_second_10;
      break;
    case 2:
      final.speedAccuracy = speedAccuracyEnum.meter_per_second_3;
      break;
    case 3:
      final.speedAccuracy = speedAccuracyEnum.meter_per_second_1;
      break;
    case 4:
      final.speedAccuracy = speedAccuracyEnum.meter_per_second_0_3;
      break;
    default:
      final.speedAccuracy = speedAccuracyEnum.Unknown;
      break;
  }

  function getSpeedAccuracyAsString() {
    switch (final.speedAccuracy) {
      case speedAccuracyEnum.meter_per_second_10:
        return '< 10 m/s';
      case speedAccuracyEnum.meter_per_second_3:
        return '< 3 m/s';
      case speedAccuracyEnum.meter_per_second_1:
        return '< 1 m/s';
      case speedAccuracyEnum.meter_per_second_0_3:
        return '< 0.3 m/s';
      default:
        return 'Unknown';
    }
  }

  final.speedAccuracyString = getSpeedAccuracyAsString();
  console.log('speedAccuracy:' + final.speedAccuracyString);

  //Timestamp
  final.timestamp = 0;

  function setLocationTimestamp(timestamp: number) {
    if (timestamp < 0) timestamp = 0;
    if (timestamp != 0xffff && timestamp > 36000) timestamp = 36000; // Max one hour is allowed. Unit is 0.1s
    final.timestamp = timestamp;
  }

  setLocationTimestamp(p.timestamp);

  function getTimeStampMinutes() {
    let minutes = p.timestamp / 10 / 60;
    return Math.trunc(minutes);
  }

  function getTimeStampSeconds() {
    let seconds = (p.timestamp / 10) % 60;
    return Math.trunc(seconds);
  }

  function getLocationTimestampAsString() {
    if (p.timestamp == 0xffff) return '--:--';
    let minutes = getTimeStampMinutes();
    let seconds = getTimeStampSeconds();
    if (minutes >= 10 && seconds >= 10)
      final.timestampString = minutes + ':' + seconds;
    else if (minutes < 10 && seconds < 10)
      final.timestampString = '0' + minutes + ':0' + seconds;
    else if (minutes >= 10 && seconds <= 10)
      final.timestampString = minutes + ':0' + seconds;
    else if (minutes <= 10 && seconds >= 10)
      final.timestampString = '0' + minutes + ':' + seconds;
  }

  getLocationTimestampAsString();
  console.log('locationTimestamp:' + final.timestampString);

  function setTimeAccuracy() {
    if (p.timeAccuracy < 0) final.timeAccuracy = 0;
    if (p.timeAccuracy > 1.5) final.timeAccuracy = 1.5; // 1.5s is the maximum value in the specification
    final.timeAccuracy = p.timeAccuracy;
  }
  setTimeAccuracy();
  console.log('timeAccuracy:' + final.timeAccuracy);
}

export function readSelfId(p: SelfId) {
  const final: Partial<FinalData> = {};
  enum descriptionTypeEnum {
    Text,
    Emergency,
    Extended_Status,
    Invalid,
  }
  function setDescriptionType() {
    switch (p.descriptionType) {
      case 0:
        final.descriptionType = descriptionTypeEnum.Text;
        return 'Text';
      case 1:
        final.descriptionType = descriptionTypeEnum.Emergency;
        return 'Emergency';
      case 2:
        final.descriptionType = descriptionTypeEnum.Extended_Status;
        return 'ExtendedStatus';
      default:
        final.descriptionType = descriptionTypeEnum.Invalid;
        return 'Invalid';
    }
  }
  final.descriptionTypeString = setDescriptionType();

  console.log('DescriptionType:' + final.descriptionTypeString);

  function setOperationDescriptionAsString() {
    final.operationDescription = p.operationDescription;
    if (p.operationDescription != null) {
      // for (int c : operationDescription) {
      //   if ((c <= 31 || c >= 127) && c != 0) {
      //     return "Invalid String";
      //   }
      // }
      return (final.operationDescriptionString = String.fromCharCode.apply(
        null,
        p.operationDescription,
      ));
    }
    return;
  }
  setOperationDescriptionAsString();
  console.log('OperationDescriptionString:' + final.operationDescriptionString);
}

export function readDeviceInfo(p: DeviceInfo) {
  const final: Partial<FinalData> = {};
  final.id = p.id;
  final.rssi = p.rssi;
  final.name = p.name;
}

export function readOperatorId(p: OperatorId) {
  const final: Partial<FinalData> = {};
  function setOperatorIdType() {
    if (p.operatorIdType < 0) final.operatorIdType = 0;
    if (p.operatorIdType > 255) final.operatorIdType = 255;
    final.operatorIdType = p.operatorIdType;
  }
  setOperatorIdType();
  console.log('OperatorIdType:' + final.operatorIdType);
  function setOperatorId() {
    if (p.operatorId.length <= DroneData.MAX_ID_BYTE_SIZE)
      final.operatorId = p.operatorId;
  }
  setOperatorId();
  function getOperatorIdAsString() {
    if (final.operatorId != null) {
      return (final.operatorIdString = String.fromCharCode.apply(
        null,
        final.operatorId,
      ));
    }
    return;
  }
  getOperatorIdAsString();
  console.log('OperatorIdString:' + final.operatorIdString);
}

export function readSystemMsg(p: SystemMsg) {
  const final: Partial<FinalData> = {};
  //OperatorLocationType
  enum operatorLocationTypeEnum {
    TakeOff,
    Dynamic, // Live GNSS Location
    Fixed, // Fixed Location
    Invalid,
  }
  function setOperatorLocationType() {
    switch (p.operatorLocationType) {
      case 0:
        final.operatorLocationType = operatorLocationTypeEnum.TakeOff;
        break;
      case 1:
        final.operatorLocationType = operatorLocationTypeEnum.Dynamic;
        break;
      case 2:
        final.operatorLocationType = operatorLocationTypeEnum.Fixed;
        break;
      default:
        final.operatorLocationType = operatorLocationTypeEnum.Invalid;
        break;
    }
  }
  setOperatorLocationType();
  function setOperatorLocationTypeAsString() {
    switch (final.operatorLocationType) {
      case operatorLocationTypeEnum.TakeOff:
        return 'TakeOff';
      case operatorLocationTypeEnum.Dynamic:
        return 'Dynamic';
      case operatorLocationTypeEnum.Fixed:
        return 'Fixed';
      case operatorLocationTypeEnum.Invalid:
        return 'Invalid';
    }
  }
  final.operatorLocationTypeString = setOperatorLocationTypeAsString();
  console.log('OperatorLocationType:' + final.operatorLocationTypeString);
  //OperatorClassificationType
  enum classificationTypeEnum {
    Undeclared,
    EU, // European Union
  }
  function setClassificationType() {
    if (p.classificationType == 1) {
      final.classificationType = classificationTypeEnum.EU;
    } else {
      final.classificationType = classificationTypeEnum.Undeclared;
    }
  }
  setClassificationType();
  function setClassificationTypeAsString() {
    switch (final.classificationType) {
      case classificationTypeEnum.EU:
        return 'EU';
      case classificationTypeEnum.Undeclared:
        return 'Undeclared';
    }
  }
  final.classificationTypeString = setClassificationTypeAsString();
  console.log('ClassType:' + final.classificationTypeString);
  //OperatorLattitude
  final.operatorLatitude = 1e-7 * p.operatorLatitude;

  if (final.operatorLatitude < -90 || final.operatorLatitude > 90) {
    final.operatorLatitude = 0;
    final.droneLon = 0; // both equal to zero is defined in the specification as the Invalid value
  }
  console.log('operatorLatitude:' + final.operatorLatitude);
  //OperatorLongitude
  final.operatorLongitude = 1e-7 * p.operatorLongitude;

  if (final.operatorLongitude < -180 || final.operatorLongitude > 180) {
    final.operatorLongitude = 0;
    final.operatorLatitude = 0; // both equal to zero is defined in the specification as the Invalid value
  }
  console.log('operatorLongitude:' + final.operatorLongitude);
  //AreaCount
  final.areaCount = p.areaCount;
  console.log('AreaCount:' + final.areaCount);
  //AreaRadius
  final.areaRadius = p.areaRadius * 10;
  console.log('AreaRadius:' + final.areaRadius);

  function getAltitudeAsString(altitude: number) {
    if (altitude == -1000) return 'Unknown';
    return String('' + altitude);
  }
  function calcAltitude(value: number) {
    return value / 2 - 1000;
  }
  //AreaCeiling
  final.areaCeiling = calcAltitude(p.areaCeiling);
  final.areaCeilingString = getAltitudeAsString(final.areaCeiling);
  console.log('AreaCeilingString:' + final.areaCeilingString);
  //AreaFloor
  final.areaFloor = calcAltitude(p.areaFloor);
  final.areaFloorString = getAltitudeAsString(final.areaFloor);
  console.log('AreaFloorString:' + final.areaFloorString);
  //Category
  enum categoryEnum {
    Undeclared,
    EU_Open,
    EU_Specific,
    EU_Certified,
  }
  function setCategory() {
    if (p.classificationType == classificationTypeEnum.EU) {
      switch (p.category) {
        case 1:
          final.category = categoryEnum.EU_Open;
          break;
        case 2:
          final.category = categoryEnum.EU_Specific;
          break;
        case 3:
          final.category = categoryEnum.EU_Certified;
          break;
        default:
          final.category = categoryEnum.Undeclared;
          break;
      }
    } else {
      final.category = categoryEnum.Undeclared;
    }
  }
  setCategory();
  function setCategoryString() {
    switch (final.category) {
      case categoryEnum.EU_Open:
        return 'EU_Open';
      case categoryEnum.EU_Specific:
        return 'EU_Specific';
      case categoryEnum.EU_Certified:
        return 'EU_Certified';
      case categoryEnum.Undeclared:
        return 'Undeclared';
    }
  }
  final.categoryString = setCategoryString();
  console.log('Category:' + final.categoryString);

  enum classValueEnum {
    Undeclared,
    EU_Class_0,
    EU_Class_1,
    EU_Class_2,
    EU_Class_3,
    EU_Class_4,
    EU_Class_5,
    EU_Class_6,
  }
  function setClassValue() {
    if (p.classificationType == classificationTypeEnum.EU) {
      switch (p.classValue) {
        case 1:
          final.classValue = classValueEnum.EU_Class_0;
          break;
        case 2:
          final.classValue = classValueEnum.EU_Class_1;
          break;
        case 3:
          final.classValue = classValueEnum.EU_Class_2;
          break;
        case 4:
          final.classValue = classValueEnum.EU_Class_3;
          break;
        case 5:
          final.classValue = classValueEnum.EU_Class_4;
          break;
        case 6:
          final.classValue = classValueEnum.EU_Class_5;
          break;
        case 7:
          final.classValue = classValueEnum.EU_Class_6;
          break;
        default:
          final.classValue = classValueEnum.Undeclared;
          break;
      }
    } else {
      final.classValue = classValueEnum.Undeclared;
    }
  }
  function setClassValueAsString() {
    switch (final.classValue) {
      case classValueEnum.EU_Class_0:
        return 'EU_Class_0';
      case classValueEnum.EU_Class_1:
        return 'EU_Class_1';
      case classValueEnum.EU_Class_2:
        return 'EU_Class_2';
      case classValueEnum.EU_Class_3:
        return 'EU_Class_3';
      case classValueEnum.EU_Class_4:
        return 'EU_Class_4';
      case classValueEnum.EU_Class_5:
        return 'EU_Class_5';
      case classValueEnum.EU_Class_6:
        return 'EU_Class_6';
      case classValueEnum.Undeclared:
        return 'Undeclared';
    }
  }
  setClassValue();
  final.classValueString = setClassValueAsString();
  console.log('classValueString:' + final.classValueString);
  //operatorAltitudeGeo
  final.operatorAltitudeGeo = calcAltitude(p.operatorAltitudeGeo);
  final.operatorAltitudeGeoString = getAltitudeAsString(
    final.operatorAltitudeGeo,
  );
  console.log('OperatorAltitudeGeoString:' + final.operatorAltitudeGeoString);
  //SystemTimestamp
  final.systemTimestamp = 0;

  function setSystemTimestamp(timestamp: number) {
    if (timestamp < 0) timestamp = 0;
    if (timestamp != 0xffff && timestamp > 36000) timestamp = 36000; // Max one hour is allowed. Unit is 0.1s
    final.systemTimestamp = timestamp;
  }

  setSystemTimestamp(p.systemTimestamp);

  function getTimeStampMinutes() {
    let minutes = p.systemTimestamp / 10 / 60;
    return Math.trunc(minutes);
  }

  function getTimeStampSeconds() {
    let seconds = (p.systemTimestamp / 10) % 60;
    return Math.trunc(seconds);
  }

  function getSystemTimestampAsString() {
    if (p.systemTimestamp == 0) final.systemTimestampString = 'Unknown';
    let minutes = getTimeStampMinutes();
    let seconds = getTimeStampSeconds();
    if (minutes >= 10 && seconds >= 10)
      final.systemTimestampString = minutes + ':' + seconds;
    else if (minutes < 10 && seconds < 10)
      final.systemTimestampString = '0' + minutes + ':0' + seconds;
    else if (minutes >= 10 && seconds <= 10)
      final.systemTimestampString = minutes + ':0' + seconds;
    else if (minutes <= 10 && seconds >= 10)
      final.systemTimestampString = '0' + minutes + ':' + seconds;
  }

  getSystemTimestampAsString();
  console.log('SystemTimestamp:' + final.systemTimestampString);
}
