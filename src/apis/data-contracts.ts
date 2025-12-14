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

export enum ModelsStatusEnum {
  StatusNotStarted = "NotStarted",
  StatusInProgress = "InProgress",
  StatusCompleted = "Completed",
}

export enum ModelsProductivityEnum {
  ProductivityOk = "Ok",
  ProductivityAlert = "Alert",
  ProductivityCritical = "Critical",
}

export enum ModelsMetricEnum {
  MetricWorkVelocity = "WorkVelocity",
  MetricReworkIndex = "ReworkIndex",
  MetricInstabilityIndex = "InstabilityIndex",
}

export interface HandlersCreateActionRequest {
  cause_id?: string;
  description?: string;
  indicator_id?: string;
}

export interface HandlersCreateBugRequest {
  assignee_id?: string;
  description?: string;
  number?: number;
  points?: number;
  task_id?: string;
}

export interface HandlersCreateCauseRequest {
  description?: string;
  indicator_id?: string;
  metric?: string;
  productivity_level?: string;
}

export interface HandlersCreateImprovRequest {
  assignee_id?: string;
  description?: string;
  number?: number;
  points?: number;
  task_id?: string;
}

export interface HandlersCreateIndicatorRequest {
  iteration_id?: string;
}

export interface HandlersCreateIterationRequest {
  description?: string;
  end_at?: string;
  number?: number;
  project_id?: string;
  start_at?: string;
}

export interface HandlersCreateProjectRequest {
  color?: string;
  description?: string;
  member_ids?: string[];
  name: string;
  prod_range?: ModelsProductivityRange;
}

export interface HandlersCreateTaskRequest {
  assignee_id?: string;
  description?: string;
  iteration_id?: string;
  name?: string;
  points?: number;
  status?: string;
  timer?: string;
}

export interface HandlersCreateUserRequest {
  email: string;
  name: string;
}

export interface HandlersLoginRequest {
  email: string;
  password: string;
}

export interface HandlersLoginResponse {
  token?: string;
  user?: {
    email?: string;
    id?: string;
    name?: string;
  };
}

export interface HandlersRegisterRequest {
  email: string;
  name: string;
  /** @minLength 6 */
  password: string;
}

export interface HandlersUpdateProjectRequest {
  color?: string;
  description?: string;
  member_ids?: string[];
  name: string;
  prod_range?: ModelsProductivityRange;
}

export interface HandlersUpdateTaskRequest {
  assignee_id?: string;
  description?: string;
  name?: string;
  points?: number;
  status?: string;
  timer?: string;
}

export interface HandlersUpdateUserRequest {
  email: string;
  name: string;
}

export interface ModelsAction {
  cause?: ModelsCause;
  created_at?: string;
  description?: string;
  id?: string;
  indicator_id?: string;
  updated_at?: string;
}

export interface ModelsBug {
  assignee?: ModelsUser;
  created_at?: string;
  description?: string;
  id?: string;
  number?: number;
  points?: number;
  task_id?: string;
  updated_at?: string;
}

export interface ModelsCause {
  created_at?: string;
  description?: string;
  id?: string;
  indicator_id?: string;
  metric?: ModelsMetricEnum;
  productivity_level?: ModelsProductivityEnum;
  updated_at?: string;
}

export interface ModelsImprov {
  assignee?: ModelsUser;
  created_at?: string;
  description?: string;
  id?: string;
  number?: number;
  points?: number;
  task_id?: string;
  updated_at?: string;
}

export interface ModelsIndicator {
  actions?: ModelsAction[];
  causes?: ModelsCause[];
  created_at?: string;
  id?: string;
  iteration_id?: string;
  updated_at?: string;
}

export interface ModelsIteration {
  created_at?: string;
  description?: string;
  end_at?: string;
  id?: string;
  number?: number;
  project_id?: string;
  start_at?: string;
  tasks?: ModelsTask[];
  updated_at?: string;
}

export interface ModelsProductivityRange {
  alert?: number;
  critical?: number;
  ok?: number;
}

export interface ModelsProject {
  color?: string;
  created_at?: string;
  description?: string;
  id?: string;
  members?: ModelsUser[];
  name?: string;
  prod_range?: ModelsProductivityRange;
  updated_at?: string;
}

export interface ModelsTask {
  assignee?: ModelsUser;
  bugs?: ModelsBug[];
  created_at?: string;
  description?: string;
  id?: string;
  improvements?: ModelsImprov[];
  iteration_id?: string;
  name?: string;
  points?: number;
  status?: ModelsStatusEnum;
  /** Sub-tasks */
  tasks?: ModelsTask[];
  timer?: string;
  updated_at?: string;
}

export interface ModelsUser {
  created_at?: string;
  email?: string;
  id?: string;
  name?: string;
  project_id?: string;
  updated_at?: string;
}

export interface BugsListParams {
  /**
   * Task ID
   * @format uuid
   */
  task_id: string;
}

export interface BugsDetailParams {
  /**
   * Bug ID
   * @format uuid
   */
  id: string;
}

export interface ImprovementsListParams {
  /**
   * Task ID
   * @format uuid
   */
  task_id: string;
}

export interface ImprovementsDetailParams {
  /**
   * Improvement ID
   * @format uuid
   */
  id: string;
}

export interface IndicatorsListParams {
  /**
   * Iteration ID
   * @format uuid
   */
  iteration_id: string;
}

export interface IterationsListParams {
  /**
   * Project ID
   * @format uuid
   */
  project_id: string;
}

export interface IterationsDetailParams {
  /**
   * Iteration ID
   * @format uuid
   */
  id: string;
}

export interface IterationsDeleteParams {
  /**
   * Iteration ID
   * @format uuid
   */
  id: string;
}

export interface ProjectsListParams {
  /**
   * Page number
   * @default 1
   */
  page?: number;
  /**
   * Page size
   * @max 100
   * @default 20
   */
  page_size?: number;
}

export interface MemberDetailParams {
  /**
   * Page number
   * @default 1
   */
  page?: number;
  /**
   * Page size
   * @max 100
   * @default 20
   */
  page_size?: number;
  /**
   * User ID
   * @format uuid
   */
  userId: string;
}

export interface ProjectsDetailParams {
  /**
   * Project ID
   * @format uuid
   */
  id: string;
}

export interface ProjectsUpdateParams {
  /**
   * Project ID
   * @format uuid
   */
  id: string;
}

export interface ProjectsDeleteParams {
  /**
   * Project ID
   * @format uuid
   */
  id: string;
}

export interface TasksListParams {
  /**
   * Iteration ID
   * @format uuid
   */
  iteration_id: string;
}

export interface TasksDetailParams {
  /**
   * Task ID
   * @format uuid
   */
  id: string;
}

export interface TasksUpdateParams {
  /**
   * Task ID
   * @format uuid
   */
  id: string;
}

export interface TasksDeleteParams {
  /**
   * Task ID
   * @format uuid
   */
  id: string;
}

export interface UsersListParams {
  /**
   * Page number
   * @default 1
   */
  page?: number;
  /**
   * Page size
   * @max 100
   * @default 20
   */
  page_size?: number;
}

export interface ProjectDetailParams {
  /**
   * Page number
   * @default 1
   */
  page?: number;
  /**
   * Page size
   * @max 100
   * @default 20
   */
  page_size?: number;
  /**
   * Project ID
   * @format uuid
   */
  projectId: string;
}

export interface UsersDetailParams {
  /**
   * User ID
   * @format uuid
   */
  id: string;
}

export interface UsersUpdateParams {
  /**
   * User ID
   * @format uuid
   */
  id: string;
}

export interface UsersDeleteParams {
  /**
   * User ID
   * @format uuid
   */
  id: string;
}
