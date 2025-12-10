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
  BugsDetailParams,
  BugsListParams,
  HandlersCreateBugRequest,
  ModelsBug,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Bugs<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Get all bugs for a specific task
   *
   * @tags bugs
   * @name BugsList
   * @summary Get all bugs
   * @request GET:/bugs
   * @secure
   * @response `200` `(ModelsBug)[]` List of bugs
   * @response `400` `string` Invalid task_id
   * @response `500` `string` Failed to retrieve bugs
   */
  bugsList = (query: BugsListParams, params: RequestParams = {}) =>
    this.request<ModelsBug[], string>({
      path: `/bugs`,
      method: "GET",
      query: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Create a new bug for a task
   *
   * @tags bugs
   * @name BugsCreate
   * @summary Create a new bug
   * @request POST:/bugs
   * @secure
   * @response `201` `Record<string,any>` Bug created successfully
   * @response `400` `string` Invalid request body
   * @response `500` `string` Failed to create bug
   */
  bugsCreate = (bug: HandlersCreateBugRequest, params: RequestParams = {}) =>
    this.request<Record<string, any>, string>({
      path: `/bugs`,
      method: "POST",
      body: bug,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get a specific bug by its ID
   *
   * @tags bugs
   * @name BugsDetail
   * @summary Get bug by ID
   * @request GET:/bugs/{id}
   * @secure
   * @response `200` `ModelsBug` Bug details
   * @response `400` `string` Invalid bug ID
   * @response `404` `string` Bug not found
   */
  bugsDetail = (
    { id, ...query }: BugsDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<ModelsBug, string>({
      path: `/bugs/${id}`,
      method: "GET",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
