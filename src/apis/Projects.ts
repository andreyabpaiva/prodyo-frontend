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
  MemberDetailParams,
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
   * @description Create a new project with members and productivity range
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
}
