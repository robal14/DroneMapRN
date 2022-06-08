export interface AuthData {
  authType: number;
  authTypeString: string;
  authDataPage: number;
  authLastPageIndex: number;
  authLength: number;
  authTimestamp: number;
  authTimestampString: string;
  authData: number[];
  authDataString: string;
}

export const isAuthData = (d: unknown): d is AuthData => {
  const data = d as AuthData;

  return data.authType !== undefined && data.authData !== undefined;
};
