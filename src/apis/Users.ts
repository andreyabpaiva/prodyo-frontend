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
  HandlersCreateUserRequest,
  HandlersUpdateUserRequest,
  ModelsUser,
  UsersDeleteParams,
  UsersDetailParams,
  UsersListParams,
  UsersUpdateParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Users<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Get a paginated list of all users
   *
   * @tags users
   * @name UsersList
   * @summary Get all users
   * @request GET:/users
   * @secure
   * @response `200` `Record<string,any>` Users with pagination
   * @response `401` `string` Unauthorized
   * @response `500` `string` Internal server error
   */
  usersList = (query: UsersListParams, params: RequestParams = {}) =>
    this.request<Record<string, any>, string>({
      path: `/users`,
      method: "GET",
      query: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Create a new user
   *
   * @tags users
   * @name UsersCreate
   * @summary Create a new user
   * @request POST:/users
   * @response `201` `Record<string,any>` Created user
   * @response `400` `string` Invalid request body
   * @response `500` `string` Failed to create user
   */
  usersCreate = (user: HandlersCreateUserRequest, params: RequestParams = {}) =>
    this.request<Record<string, any>, string>({
      path: `/users`,
      method: "POST",
      body: user,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get a specific user by its ID
   *
   * @tags users
   * @name UsersDetail
   * @summary Get user by ID
   * @request GET:/users/{id}
   * @response `200` `ModelsUser` User details
   * @response `400` `string` Invalid user ID
   * @response `404` `string` User not found
   */
  usersDetail = (
    { id, ...query }: UsersDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<ModelsUser, string>({
      path: `/users/${id}`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Update an existing user
   *
   * @tags users
   * @name UsersUpdate
   * @summary Update user
   * @request PUT:/users/{id}
   * @response `200` `ModelsUser` Updated user
   * @response `400` `string` Invalid user ID or request body
   * @response `500` `string` Failed to update user
   */
  usersUpdate = (
    { id, ...query }: UsersUpdateParams,
    user: HandlersUpdateUserRequest,
    params: RequestParams = {},
  ) =>
    this.request<ModelsUser, string>({
      path: `/users/${id}`,
      method: "PUT",
      body: user,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Delete a user by its ID
   *
   * @tags users
   * @name UsersDelete
   * @summary Delete user
   * @request DELETE:/users/{id}
   * @response `204` `void` User deleted successfully
   * @response `400` `string` Invalid user ID
   * @response `500` `string` Failed to delete user
   */
  usersDelete = (
    { id, ...query }: UsersDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<void, string>({
      path: `/users/${id}`,
      method: "DELETE",
      type: ContentType.Json,
      ...params,
    });
}
