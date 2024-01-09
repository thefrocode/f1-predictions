export interface IErrorMessage {
  status: number;
  message: string;
  type: string;
  error: { code: string; message: string };
  errorCode: number;
  timestamp: string;
}
