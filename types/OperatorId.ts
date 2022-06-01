import {BasicId} from './BasicId';

export interface OperatorId {
  operatorIdType: number;
  operatorId: number;
}
export const isOperatorId = (d: unknown): d is OperatorId => {
  const data = d as OperatorId;

  return data.operatorIdType !== undefined && data.operatorId !== undefined;
};
