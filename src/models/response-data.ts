
export enum Code {
  // 成功
  SUCCESS = 0,
  // 入参不正确的
  INPUT_PARAMETER_ERROR = 1,
  // db error
  DB_ERROR = 2,
}

// code 对应的中文描述
export const CODE_DICTIONARY = {
  [Code.SUCCESS]: '成功',
  [Code.INPUT_PARAMETER_ERROR]: '入参不正确',
  [Code.DB_ERROR]: '服务器繁忙，请稍后重试',

};


class ResponseBase {
  public code: number;
  public message: string
  constructor (code: Code) {
    this.code = code
    this.message = CODE_DICTIONARY[code]
  }
}

export class ResponseError extends ResponseBase {
  constructor (code: Code) {
    super(code)
  }
}

export class ResponseSucces<T> extends ResponseBase {
  data: T
  constructor (code: Code, data: T) {
    super(code)
    this.data = data
  }
}