
// import { ObjectId } from "https://deno.land/x/mongo@v0.21.0/src/utils/bson.ts";
import { PageInfo } from "../models/page-info.ts";
import { Code, ResponseError, ResponseSucces } from "../models/response-data.ts";
import { User } from "../models/user.ts";
import { find, insertOne, count, updateOne, deleteOne } from '../utils/db-helper.ts';
class UserService {
  constructor() {

  }
  async getList(pageInfo: PageInfo) {
    const list = await find(pageInfo);
    const count = await this.count();
    const data = {
        list,
        count,
        pageInfo
    };
    const responseData = new ResponseSucces<typeof data>(Code.SUCCESS, data);
    return responseData;
  }
  async add(userInfo: Object) {
    const _id = await insertOne(userInfo);
    const data = {
      _id,
    }
    const responseData = new ResponseSucces<typeof data>(Code.SUCCESS, data)
    return responseData
  }
  async count() {
    return await count();
  }
  async updateOne(params: User) {
    const filter = {
      _id: params._id,
    };
    delete params._id
    const update = {
      $set: {
        ...params
      },
    };
    const { modifiedCount } = await updateOne(filter, update)
    return modifiedCount >= 1;
  }

  async delete(id: string) {
   const bool = await deleteOne(id);
   if (!bool) {
    return new ResponseError(Code.DB_ERROR);
   }

   return new ResponseSucces<null>(Code.SUCCESS, null);
  }
}

export default UserService