export interface SelfId {
  descriptionType: number;
  operationDescription: number;
}

export const isSelfId = (d: unknown): d is SelfId => {
  const data = d as SelfId;

  return (
    data.descriptionType !== undefined &&
    data.operationDescription !== undefined
  );
};
