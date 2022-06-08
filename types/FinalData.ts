import {Location} from './Location';
import {AuthData} from './AuthData';
import {DeviceInfo} from './DeviceInfo';
import {OperatorId} from './OperatorId';
import {SelfId} from './SelfId';
import {SystemMsg} from './SystemMsg';
import {BasicId} from './BasicId';

export type FinalData = BasicId &
  AuthData &
  DeviceInfo &
  Location &
  OperatorId &
  SelfId &
  SystemMsg;
