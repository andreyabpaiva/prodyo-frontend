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
  AnalysisListParams,
  HandlersCreateIterationRequest,
  IterationsDeleteParams,
  IterationsDetailParams,
  IterationsListParams,
  ModelsIteration,
  ModelsIterationAnalysisResponse,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Iterations<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Get all iterations for a specific project
   *
   * @tags iterations
   * @name IterationsList
   * @summary Get all iterations
   * @request GET:/iterations
   * @secure
   * @response `200` `(ModelsIteration)[]` List of iterations
   * @response `400` `string` Invalid project_id
   * @response `500` `string` Failed to retrieve iterations
   */
  iterationsList = (query: IterationsListParams, params: RequestParams = {}) =>
    this.request<ModelsIteration[], string>({
      path: `/iterations`,
      method: "GET",
      query: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Create a new iteration for a project
   *
   * @tags iterations
   * @name IterationsCreate
   * @summary Create a new iteration
   * @request POST:/iterations
   * @secure
   * @response `201` `Record<string,any>` Iteration created successfully
   * @response `400` `string` Invalid request body
   * @response `500` `string` Failed to create iteration
   */
  iterationsCreate = (
    iteration: HandlersCreateIterationRequest,
    params: RequestParams = {},
  ) =>
    this.request<Record<string, any>, string>({
      path: `/iterations`,
      method: "POST",
      body: iteration,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get a specific iteration by its ID
   *
   * @tags iterations
   * @name IterationsDetail
   * @summary Get iteration by ID
   * @request GET:/iterations/{id}
   * @secure
   * @response `200` `ModelsIteration` Iteration details
   * @response `400` `string` Invalid iteration ID
   * @response `404` `string` Iteration not found
   */
  iterationsDetail = (
    { id, ...query }: IterationsDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<ModelsIteration, string>({
      path: `/iterations/${id}`,
      method: "GET",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Delete an iteration by its ID
   *
   * @tags iterations
   * @name IterationsDelete
   * @summary Delete iteration
   * @request DELETE:/iterations/{id}
   * @secure
   * @response `204` `void` Iteration deleted successfully
   * @response `400` `string` Invalid iteration ID
   * @response `500` `string` Failed to delete iteration
   */
  iterationsDelete = (
    { id, ...query }: IterationsDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<void, string>({
      path: `/iterations/${id}`,
      method: "DELETE",
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Get detailed analysis of iteration indicators with data points for graphing
   *
   * @tags iterations
   * @name AnalysisList
   * @summary Get iteration indicator analysis
   * @request GET:/iterations/{id}/analysis
   * @secure
   * @response `200` `ModelsIterationAnalysisResponse` Iteration analysis with indicator data points
   * @response `400` `string` Invalid iteration ID
   * @response `404` `string` Iteration not found
   * @response `500` `string` Failed to retrieve analysis
   */
  analysisList = (
    { id, ...query }: AnalysisListParams,
    params: RequestParams = {},
  ) =>
    this.request<ModelsIterationAnalysisResponse, string>({
      path: `/iterations/${id}/analysis`,
      method: "GET",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
