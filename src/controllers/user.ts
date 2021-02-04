import  Base from './base.ts'

import { Middleware, Context, helpers } from "https://deno.land/x/oak/mod.ts";

import UserService from '../services/user.ts'
import { PageInfo, PAGE_INDEX, PAGE_SIZE } from "../models/page-info.ts";
import { convertToNumber } from "../utils/utils.ts";
import { Code, ResponseError, ResponseSucces } from "../models/response-data.ts";
import { User } from "../models/user.ts";

const userService = new UserService()

class UserController extends Base {
  constructor() {
    super()
  }
  getList = async (ctx: Context, next: Middleware) => {
    const query = helpers.getQuery(ctx);
    let { pageIndex, pageSize } = query;
    const index = convertToNumber(pageIndex) || PAGE_INDEX;
    const size = convertToNumber(pageSize) || PAGE_SIZE;
    const pageInfo: PageInfo = {
      pageIndex: index,
      pageSize: size
    }
    const responseData = await userService.getList(pageInfo)
    ctx.response.body = responseData
  }
  register = async (ctx: Context, next: Middleware) => {
    if (!ctx.request.hasBody) {
      const errorInfo = new ResponseError(Code.INPUT_PARAMETER_ERROR)
      ctx.response.body = errorInfo
      return
    }
    const body = ctx.request.body({
      type: 'json'
    })
    const params = await body.value;
    console.log('register', params);
    const res = await userService.add(params);
    ctx.response.body = res
  }
  update = async (ctx: Context, next: Middleware) => {
    if (!ctx.request.hasBody) {
      const errorInfo = new ResponseError(Code.INPUT_PARAMETER_ERROR)
      ctx.response.body = errorInfo
      return
    }
    const body = ctx.request.body({
      type: 'json'
    })

    const params: User = await body.value;
    if (!params._id) {
      ctx.response.body = new ResponseError(Code.INPUT_PARAMETER_ERROR)
      return
    }
    const bool = await userService.updateOne(params);
    if (!bool) {
      ctx.response.body = new ResponseError(Code.DB_ERROR)
      return
    }
    ctx.response.body = new ResponseSucces<null>(Code.SUCCESS, null)
  }
  delete = async (ctx: Context, next: Middleware) => {
    const query = helpers.getQuery(ctx);
    const id = query._id
    if (!id) {
      ctx.response.body = new ResponseError(Code.INPUT_PARAMETER_ERROR)
      return
    }
    const res = await userService.delete(id);
    ctx.response.body = res
  }
}

export default UserController