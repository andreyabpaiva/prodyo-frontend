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
  HandlersCreateTaskRequest,
  HandlersPatchTaskRequest,
  HandlersUpdateTaskRequest,
  ModelsTask,
  TasksDeleteParams,
  TasksDetailParams,
  TasksListParams,
  TasksPartialUpdateParams,
  TasksUpdateParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Tasks<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Get all tasks for a specific iteration
   *
   * @tags tasks
   * @name TasksList
   * @summary Get all tasks
   * @request GET:/tasks
   * @secure
   * @response `200` `(ModelsTask)[]` List of tasks
   * @response `400` `string` Invalid iteration_id
   * @response `500` `string` Failed to retrieve tasks
   */
  tasksList = (query: TasksListParams, params: RequestParams = {}) =>
    this.request<ModelsTask[], string>({
      path: `/tasks`,
      method: "GET",
      query: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Create a new task for an iteration
   *
   * @tags tasks
   * @name TasksCreate
   * @summary Create a new task
   * @request POST:/tasks
   * @secure
   * @response `201` `Record<string,any>` Task created successfully
   * @response `400` `string` Invalid request body
   * @response `500` `string` Failed to create task
   */
  tasksCreate = (task: HandlersCreateTaskRequest, params: RequestParams = {}) =>
    this.request<Record<string, any>, string>({
      path: `/tasks`,
      method: "POST",
      body: task,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get a specific task by its ID
   *
   * @tags tasks
   * @name TasksDetail
   * @summary Get task by ID
   * @request GET:/tasks/{id}
   * @secure
   * @response `200` `ModelsTask` Task details
   * @response `400` `string` Invalid task ID
   * @response `404` `string` Task not found
   */
  tasksDetail = (
    { id, ...query }: TasksDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<ModelsTask, string>({
      path: `/tasks/${id}`,
      method: "GET",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Update an existing task
   *
   * @tags tasks
   * @name TasksUpdate
   * @summary Update task
   * @request PUT:/tasks/{id}
   * @secure
   * @response `200` `ModelsTask` Updated task
   * @response `400` `string` Invalid task ID or request body
   * @response `500` `string` Failed to update task
   */
  tasksUpdate = (
    { id, ...query }: TasksUpdateParams,
    task: HandlersUpdateTaskRequest,
    params: RequestParams = {},
  ) =>
    this.request<ModelsTask, string>({
      path: `/tasks/${id}`,
      method: "PUT",
      body: task,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Delete a task by its ID
   *
   * @tags tasks
   * @name TasksDelete
   * @summary Delete task
   * @request DELETE:/tasks/{id}
   * @secure
   * @response `204` `void` Task deleted successfully
   * @response `400` `string` Invalid task ID
   * @response `500` `string` Failed to delete task
   */
  tasksDelete = (
    { id, ...query }: TasksDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<void, string>({
      path: `/tasks/${id}`,
      method: "DELETE",
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Partially update an existing task (only provided fields will be updated)
   *
   * @tags tasks
   * @name TasksPartialUpdate
   * @summary Partially update task
   * @request PATCH:/tasks/{id}
   * @secure
   * @response `200` `ModelsTask` Updated task
   * @response `400` `string` Invalid task ID or request body
   * @response `404` `string` Task not found
   * @response `500` `string` Failed to update task
   */
  tasksPartialUpdate = (
    { id, ...query }: TasksPartialUpdateParams,
    task: HandlersPatchTaskRequest,
    params: RequestParams = {},
  ) =>
    this.request<ModelsTask, string>({
      path: `/tasks/${id}`,
      method: "PATCH",
      body: task,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
