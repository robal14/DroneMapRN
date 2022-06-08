export interface BasicId {
  idType: number;
  idTypeString: string;
  uaType: number;
  uaTypeString: string;
  uasId: number[]; // tutaj ma byc MAX_ID_BYTE_SIZE = 20
  uasIdString: string;
}
export const isBasicId = (d: unknown): d is BasicId => {
  const data = d as BasicId;

  return data.idType !== undefined && data.uasId !== undefined;
};
