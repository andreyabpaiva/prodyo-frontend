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
  HandlersCreateProjectRequest,
  HandlersUpdateProjectRequest,
  IndicatorRangeIdsDetailParams,
  IndicatorRangesDefaultCreateParams,
  IndicatorRangesDetailParams,
  IndicatorRangesListParams,
  MemberDetailParams,
  ModelsIndicatorRange,
  ModelsProject,
  ProjectsDeleteParams,
  ProjectsDetailParams,
  ProjectsListParams,
  ProjectsUpdateParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Projects<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Get a paginated list of all projects with their members
   *
   * @tags projects
   * @name ProjectsList
   * @summary Get all projects
   * @request GET:/projects
   * @secure
   * @response `200` `Record<string,any>` Projects with pagination
   * @response `500` `string` Internal server error
   */
  projectsList = (query: ProjectsListParams, params: RequestParams = {}) =>
    this.request<Record<string, any>, string>({
      path: `/projects`,
      method: "GET",
      query: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Create a new project with members and optional custom indicator ranges. If indicator_ranges is not provided, default ranges will be created.
   *
   * @tags projects
   * @name ProjectsCreate
   * @summary Create a new project
   * @request POST:/projects
   * @secure
   * @response `201` `Record<string,any>` Created project
   * @response `400` `string` Invalid request body
   * @response `500` `string` Failed to create project
   */
  projectsCreate = (
    project: HandlersCreateProjectRequest,
    params: RequestParams = {},
  ) =>
    this.request<Record<string, any>, string>({
      path: `/projects`,
      method: "POST",
      body: project,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get all projects where the specified user is a member
   *
   * @tags projects
   * @name MemberDetail
   * @summary Get projects by member ID
   * @request GET:/projects/member/{userId}
   * @secure
   * @response `200` `Record<string,any>` Projects with pagination
   * @response `400` `string` Invalid user ID
   * @response `500` `string` Internal server error
   */
  memberDetail = (
    { userId, ...query }: MemberDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<Record<string, any>, string>({
      path: `/projects/member/${userId}`,
      method: "GET",
      query: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get a specific project by its ID with all members
   *
   * @tags projects
   * @name ProjectsDetail
   * @summary Get project by ID
   * @request GET:/projects/{id}
   * @secure
   * @response `200` `ModelsProject` Project details
   * @response `400` `string` Invalid project ID
   * @response `404` `string` Project not found
   */
  projectsDetail = (
    { id, ...query }: ProjectsDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<ModelsProject, string>({
      path: `/projects/${id}`,
      method: "GET",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Update an existing project with new data
   *
   * @tags projects
   * @name ProjectsUpdate
   * @summary Update project
   * @request PUT:/projects/{id}
   * @secure
   * @response `200` `ModelsProject` Updated project
   * @response `400` `string` Invalid project ID or request body
   * @response `500` `string` Failed to update project
   */
  projectsUpdate = (
    { id, ...query }: ProjectsUpdateParams,
    project: HandlersUpdateProjectRequest,
    params: RequestParams = {},
  ) =>
    this.request<ModelsProject, string>({
      path: `/projects/${id}`,
      method: "PUT",
      body: project,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Delete a project by its ID
   *
   * @tags projects
   * @name ProjectsDelete
   * @summary Delete project
   * @request DELETE:/projects/{id}
   * @secure
   * @response `204` `void` Project deleted successfully
   * @response `400` `string` Invalid project ID
   * @response `500` `string` Failed to delete project
   */
  projectsDelete = (
    { id, ...query }: ProjectsDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<void, string>({
      path: `/projects/${id}`,
      method: "DELETE",
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Returns the indicator range ID based on project ID and indicator type
   *
   * @tags indicators
   * @name IndicatorRangeIdsDetail
   * @summary Get indicator range ID by project ID and indicator type
   * @request GET:/projects/{project_id}/indicator-range-ids/{indicator_type}
   * @secure
   * @response `200` `Record<string,any>` Indicator range ID
   * @response `400` `string` Invalid parameters
   * @response `404` `string` Indicator range not found
   */
  indicatorRangeIdsDetail = (
    { projectId, indicatorType, ...query }: IndicatorRangeIdsDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<Record<string, any>, string>({
      path: `/projects/${projectId}/indicator-range-ids/${indicatorType}`,
      method: "GET",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get all productivity ranges configured for a project
   *
   * @tags indicators
   * @name IndicatorRangesList
   * @summary Get all indicator ranges for a project
   * @request GET:/projects/{project_id}/indicator-ranges
   * @secure
   * @response `200` `(ModelsIndicatorRange)[]` List of ranges
   * @response `400` `string` Invalid project_id
   * @response `500` `string` Failed to get ranges
   */
  indicatorRangesList = (
    { projectId, ...query }: IndicatorRangesListParams,
    params: RequestParams = {},
  ) =>
    this.request<ModelsIndicatorRange[], string>({
      path: `/projects/${projectId}/indicator-ranges`,
      method: "GET",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Create default productivity ranges for all indicator types for a project
   *
   * @tags indicators
   * @name IndicatorRangesDefaultCreate
   * @summary Create default indicator ranges for a project
   * @request POST:/projects/{project_id}/indicator-ranges/default
   * @secure
   * @response `201` `Record<string,any>` Default ranges created
   * @response `400` `string` Invalid project_id
   * @response `500` `string` Failed to create default ranges
   */
  indicatorRangesDefaultCreate = (
    { projectId, ...query }: IndicatorRangesDefaultCreateParams,
    params: RequestParams = {},
  ) =>
    this.request<Record<string, any>, string>({
      path: `/projects/${projectId}/indicator-ranges/default`,
      method: "POST",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get the productivity range for a specific indicator type of a project
   *
   * @tags indicators
   * @name IndicatorRangesDetail
   * @summary Get range for a specific indicator type
   * @request GET:/projects/{project_id}/indicator-ranges/{indicator_type}
   * @secure
   * @response `200` `ModelsIndicatorRange` Range configuration
   * @response `400` `string` Invalid parameters
   * @response `404` `string` Range not found
   */
  indicatorRangesDetail = (
    { projectId, indicatorType, ...query }: IndicatorRangesDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<ModelsIndicatorRange, string>({
      path: `/projects/${projectId}/indicator-ranges/${indicatorType}`,
      method: "GET",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
