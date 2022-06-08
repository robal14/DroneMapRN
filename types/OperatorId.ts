export interface OperatorId {
  operatorIdType: number;
  operatorId: number[];
  operatorIdString: string;
}
export const isOperatorId = (d: unknown): d is OperatorId => {
  const data = d as OperatorId;

  return data.operatorIdType !== undefined && data.operatorId !== undefined;
};
