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
  HandlersCreateActionRequest,
  HandlersCreateCauseRequest,
  HandlersCreateIndicatorRequest,
  IndicatorsListParams,
  ModelsIndicator,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Indicators<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Get indicator with causes and actions for a specific iteration
   *
   * @tags indicators
   * @name IndicatorsList
   * @summary Get indicator
   * @request GET:/indicators
   * @secure
   * @response `200` `ModelsIndicator` Indicator details
   * @response `400` `string` Invalid iteration_id
   * @response `404` `string` Indicator not found
   */
  indicatorsList = (query: IndicatorsListParams, params: RequestParams = {}) =>
    this.request<ModelsIndicator, string>({
      path: `/indicators`,
      method: "GET",
      query: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Create a new indicator for an iteration
   *
   * @tags indicators
   * @name IndicatorsCreate
   * @summary Create a new indicator
   * @request POST:/indicators
   * @secure
   * @response `201` `Record<string,any>` Indicator created successfully
   * @response `400` `string` Invalid request body
   * @response `500` `string` Failed to create indicator
   */
  indicatorsCreate = (
    indicator: HandlersCreateIndicatorRequest,
    params: RequestParams = {},
  ) =>
    this.request<Record<string, any>, string>({
      path: `/indicators`,
      method: "POST",
      body: indicator,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Create a new action for an indicator
   *
   * @tags indicators
   * @name ActionsCreate
   * @summary Create a new action
   * @request POST:/indicators/actions
   * @secure
   * @response `201` `Record<string,any>` Action created successfully
   * @response `400` `string` Invalid request body
   * @response `404` `string` Cause not found
   * @response `500` `string` Failed to create action
   */
  actionsCreate = (
    action: HandlersCreateActionRequest,
    params: RequestParams = {},
  ) =>
    this.request<Record<string, any>, string>({
      path: `/indicators/actions`,
      method: "POST",
      body: action,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Create a new cause for an indicator
   *
   * @tags indicators
   * @name CausesCreate
   * @summary Create a new cause
   * @request POST:/indicators/causes
   * @secure
   * @response `201` `Record<string,any>` Cause created successfully
   * @response `400` `string` Invalid request body
   * @response `500` `string` Failed to create cause
   */
  causesCreate = (
    cause: HandlersCreateCauseRequest,
    params: RequestParams = {},
  ) =>
    this.request<Record<string, any>, string>({
      path: `/indicators/causes`,
      method: "POST",
      body: cause,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
