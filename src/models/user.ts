import { PageInfo } from "./page-info.ts";

export interface User {
  _id?: string;
  email: string
  password: string,
  nickname: string,
  phone: string,
  confirm: string
}

export interface Data {
  list: User[],
  count: number,
  pageInfo: PageInfo,
}