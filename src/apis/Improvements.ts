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
  HandlersCreateImprovRequest,
  ImprovementsDetailParams,
  ImprovementsListParams,
  ModelsImprov,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Improvements<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Get all improvements for a specific task
   *
   * @tags improvements
   * @name ImprovementsList
   * @summary Get all improvements
   * @request GET:/improvements
   * @secure
   * @response `200` `(ModelsImprov)[]` List of improvements
   * @response `400` `string` Invalid task_id
   * @response `500` `string` Failed to retrieve improvements
   */
  improvementsList = (
    query: ImprovementsListParams,
    params: RequestParams = {},
  ) =>
    this.request<ModelsImprov[], string>({
      path: `/improvements`,
      method: "GET",
      query: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Create a new improvement for a task
   *
   * @tags improvements
   * @name ImprovementsCreate
   * @summary Create a new improvement
   * @request POST:/improvements
   * @secure
   * @response `201` `Record<string,any>` Improvement created successfully
   * @response `400` `string` Invalid request body
   * @response `500` `string` Failed to create improvement
   */
  improvementsCreate = (
    improvement: HandlersCreateImprovRequest,
    params: RequestParams = {},
  ) =>
    this.request<Record<string, any>, string>({
      path: `/improvements`,
      method: "POST",
      body: improvement,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get a specific improvement by its ID
   *
   * @tags improvements
   * @name ImprovementsDetail
   * @summary Get improvement by ID
   * @request GET:/improvements/{id}
   * @secure
   * @response `200` `ModelsImprov` Improvement details
   * @response `400` `string` Invalid improvement ID
   * @response `404` `string` Improvement not found
   */
  improvementsDetail = (
    { id, ...query }: ImprovementsDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<ModelsImprov, string>({
      path: `/improvements/${id}`,
      method: "GET",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
