import {
  Request as expressRequest,
  Response as expressResponse,
  NextFunction as expressNextFunction
} from "express";
import {InputFile} from './fileUpload'

export interface Request extends expressRequest {
  all(): object;
  input(name: string): object | string | number | any;
  file?: InputFile,
  files?: InputFile[]
}

export interface Response extends expressResponse {
  success(message: string, data?: object, status?: number): expressResponse;
  error(message: string, data?: object, status?: number): expressResponse;
}

export interface ResponseHanlder extends expressResponse {}
export interface NextFunction extends expressNextFunction {}
