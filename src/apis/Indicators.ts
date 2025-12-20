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
  HandlersSetRangeRequest,
  HandlersUpdateMetricValuesRequest,
  IndicatorsListParams,
  MetricsUpdateParams,
  ModelsIndicator,
  ModelsIndicatorMetricValue,
  RangesDeleteParams,
  SummaryListParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Indicators<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Get indicator with causes, actions, and calculated productivity levels for a specific iteration
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
  /**
   * @description Create or update the productivity range (OK, Alert, Critical min/max values) for a specific indicator type at project level
   *
   * @tags indicators
   * @name RangesCreate
   * @summary Set productivity range for an indicator type
   * @request POST:/indicators/ranges
   * @secure
   * @response `201` `Record<string,any>` Range set successfully
   * @response `400` `string` Invalid request body
   * @response `500` `string` Failed to set range
   */
  rangesCreate = (range: HandlersSetRangeRequest, params: RequestParams = {}) =>
    this.request<Record<string, any>, string>({
      path: `/indicators/ranges`,
      method: "POST",
      body: range,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Remove a productivity range configuration
   *
   * @tags indicators
   * @name RangesDelete
   * @summary Delete a productivity range
   * @request DELETE:/indicators/ranges/{range_id}
   * @secure
   * @response `204` `void` Range deleted successfully
   * @response `400` `string` Invalid range_id
   * @response `500` `string` Failed to delete range
   */
  rangesDelete = (
    { rangeId, ...query }: RangesDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<void, string>({
      path: `/indicators/ranges/${rangeId}`,
      method: "DELETE",
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Update the calculated values for speed, rework, and instability metrics
   *
   * @tags indicators
   * @name MetricsUpdate
   * @summary Update calculated metric values
   * @request PUT:/indicators/{indicator_id}/metrics
   * @secure
   * @response `200` `ModelsIndicator` Updated indicator
   * @response `400` `string` Invalid request
   * @response `500` `string` Failed to update metrics
   */
  metricsUpdate = (
    { indicatorId, ...query }: MetricsUpdateParams,
    metrics: HandlersUpdateMetricValuesRequest,
    params: RequestParams = {},
  ) =>
    this.request<ModelsIndicator, string>({
      path: `/indicators/${indicatorId}/metrics`,
      method: "PUT",
      body: metrics,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get a summary of all indicators with their values and productivity levels
   *
   * @tags indicators
   * @name SummaryList
   * @summary Get metric summary
   * @request GET:/indicators/{indicator_id}/summary
   * @secure
   * @response `200` `(ModelsIndicatorMetricValue)[]` Metric summary
   * @response `400` `string` Invalid indicator_id
   * @response `404` `string` Indicator not found
   */
  summaryList = (
    { indicatorId, ...query }: SummaryListParams,
    params: RequestParams = {},
  ) =>
    this.request<ModelsIndicatorMetricValue[], string>({
      path: `/indicators/${indicatorId}/summary`,
      method: "GET",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
