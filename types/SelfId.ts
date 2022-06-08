export interface SelfId {
  descriptionType: number;
  descriptionTypeString: string;
  operationDescription: number[];
  operationDescriptionString: string;
}

export const isSelfId = (d: unknown): d is SelfId => {
  const data = d as SelfId;

  return (
    data.descriptionType !== undefined &&
    data.operationDescription !== undefined
  );
};
