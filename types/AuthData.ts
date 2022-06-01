export interface AuthData {
  authType: number;
  authDataPage: number;
  authLastPageIndex: number;
  authLength: number;
  authTimestamp: number;
  authData: number[];
}

export const isAuthData = (d: unknown): d is AuthData => {
  const data = d as AuthData;

  return data.authType !== undefined && data.authData !== undefined;
};
