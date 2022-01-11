export interface ErrorModel {
  response: {
    data: {
      message: string;
    };
  };
  status: number;
}
