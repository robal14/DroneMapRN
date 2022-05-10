export interface BasicId {
  idType: number;
  uaType: number;
  uasId: number[]; // tutaj ma byc MAX_ID_BYTE_SIZE = 20
}
