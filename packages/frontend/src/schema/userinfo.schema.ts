export enum CompanyType {
  MUSINSA = "MUSINSA",
  MUSINSALAB = "MUSINSALAB",
}

export interface UserInfoSchema {
  id: string;
  pw: string;
  type: CompanyType;
}
