import { MongoClient, Bson, InsertOptions, FindOptions, UpdateOptions } from "https://deno.land/x/mongo@v0.21.0/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.21.0/src/utils/bson.ts";
import { PageInfo } from "../models/page-info.ts";
import { User } from '../models/user.ts'

const client = new MongoClient();
const url = 'mongodb://127.0.0.1:27017'

const connect = async () => {
  try {
    await client.connect(url);
  } catch(e) {
    console.log(e);
  }
  const db = client.database("test1");
  const user = db.collection<User>("user");
  return user;
}

export const insertOne = async (doc: Bson.Document, options?: InsertOptions | undefined) => {
  const user = await connect();
  try {
    const item = await user.insertOne(doc);
    return item;
  } finally {
    client.close();
  }
}

export const find = async (pageInfo: PageInfo, doc: Bson.Document = {}, options?: FindOptions | undefined) => {
  const user = await connect();
  const item = user.find(doc, options)

   .limit(pageInfo.pageSize)
   .skip((pageInfo.pageIndex - 1) * pageInfo.pageSize);
  try {
    const list = await item.toArray()
    return list;
  } finally {
    client.close()
  }
}

export const updateOne = async (filter: Bson.Document, update: Bson.Document, options?: UpdateOptions | undefined) => {
  const user = await connect()
  Object.assign(filter, {
    _id: ObjectId(filter._id)
  })
  try {
    const res = await user.updateOne(filter, update, options)
    return res
  } finally {
    client.close()
  }
}

export const count = async () => {
  const user = await connect();
  try {
    const number = await user.count()
    return number;
  } finally {
    client.close()
  }
}

export const deleteOne = async (id: string) => {
  const user = await connect()
  try {
    const deleteCount = await user.deleteOne({ _id: ObjectId(id)})
    return deleteCount === 1
  } finally {
    client.close()
  }

}