import { baseApi } from "./baseApi";

export const getUserSession = () => {
  return baseApi.get<boolean>(`/session`);
};
