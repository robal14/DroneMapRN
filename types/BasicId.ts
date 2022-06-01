export interface BasicId {
  idType: number;
  uaType: number;
  uasId: number[]; // tutaj ma byc MAX_ID_BYTE_SIZE = 20
}
export const isBasicId = (d: unknown): d is BasicId => {
  const data = d as BasicId;

  return data.idType !== undefined && data.uasId !== undefined;
};
