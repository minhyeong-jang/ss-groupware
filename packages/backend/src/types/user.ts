export enum CompanyType {
  MUSINSA = "MUSINSA",
  MUSINSALAB = "MUSINSALAB",
}
export interface UserInfoModel {
  id: string;
  pw: string;
  type: CompanyType;
}
