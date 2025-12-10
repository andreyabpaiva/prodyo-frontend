/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  HandlersLoginRequest,
  HandlersLoginResponse,
  HandlersRegisterRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Authenticate user and return session token
   *
   * @tags auth
   * @name LoginCreate
   * @summary Login user
   * @request POST:/auth/login
   * @response `200` `HandlersLoginResponse` Login successful
   * @response `400` `string` Invalid request body
   * @response `401` `string` Invalid email or password
   */
  loginCreate = (
    credentials: HandlersLoginRequest,
    params: RequestParams = {},
  ) =>
    this.request<HandlersLoginResponse, string>({
      path: `/auth/login`,
      method: "POST",
      body: credentials,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Invalidate user session token
   *
   * @tags auth
   * @name LogoutCreate
   * @summary Logout user
   * @request POST:/auth/logout
   * @secure
   * @response `204` `void` Logout successful
   * @response `401` `string` Authorization token required
   * @response `500` `string` Failed to logout
   */
  logoutCreate = (params: RequestParams = {}) =>
    this.request<void, string>({
      path: `/auth/logout`,
      method: "POST",
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Create a new user account with email, password, and name
   *
   * @tags auth
   * @name RegisterCreate
   * @summary Register a new user
   * @request POST:/auth/register
   * @response `201` `Record<string,any>` User created successfully
   * @response `400` `string` Invalid request body
   * @response `409` `string` User already exists
   * @response `500` `string` Failed to register user
   */
  registerCreate = (
    user: HandlersRegisterRequest,
    params: RequestParams = {},
  ) =>
    this.request<Record<string, any>, string>({
      path: `/auth/register`,
      method: "POST",
      body: user,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
