export enum CompanyType {
  MUSINSA = "무신사",
  MUSINSALAB = "무신사랩",
}

export interface UserInfoSchema {
  id: string;
  pw: string;
  type: CompanyType;
}
