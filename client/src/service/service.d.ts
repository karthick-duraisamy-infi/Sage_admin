export type MailApiResponse<
  SuccessResponseDataType,
  FailureResponseDataType = undefined
> =
  | FailureResponse<FailureResponseDataType>
  | SuccessResponse<SuccessResponseDataType>;

export interface FailureResponse<Type = undefined> {
  responseCode: 1;
  response: FailureResponseResponse<Type>;
}

export interface FailureResponseResponse<Type = undefined> {
  Message: string;
  errors: Type;
}

export interface SuccessResponse<Type> {
  responseCode: 0;
  response: ResponseResponse<Type>;
}

export interface ResponseResponse<Type> {
  Message: string;
  data: Type;
}
