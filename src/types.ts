export type User = {
    id: number;
    name: string;
    email: string;
  };
  
  export type Stamp = {
    id: number;
    code: string;
    name: string;
    createdAt?: Date;
  };
  
  export type RedeemedStamp = Stamp & {
    redeemedAt: Date;
  };
  
  export type ApiResponse<T> = {
    data?: T;
    error?: string;
  };