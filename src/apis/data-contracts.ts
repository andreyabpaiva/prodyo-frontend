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

export enum ModelsIndicatorEnum {
  IndicatorSpeedPerIteration = "SpeedPerIteration",
  IndicatorReworkPerIteration = "ReworkPerIteration",
  IndicatorInstabilityIndex = "InstabilityIndex",
}

export interface HandlersCreateActionRequest {
  assignee_id?: string;
  cause_description?: string;
  description?: string;
  end_at?: string;
  indicator_range_id?: string;
  metric?: string;
  start_at?: string;
  status?: string;
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
  indicator_range_id?: string;
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
  indicator_ranges?: HandlersIndicatorRangeRequest[];
  member_ids?: string[];
  name: string;
}

export interface HandlersCreateTaskRequest {
  assignee_id?: string;
  description?: string;
  /** Expected time in hours */
  expected_time?: number;
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

export interface HandlersIndicatorRangeRequest {
  indicator_type?: string;
  range?: HandlersProductivityRangeRequest;
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

export interface HandlersPatchActionRequest {
  assignee_id?: string;
  description?: string;
  end_at?: string;
  start_at?: string;
  status?: string;
}

export interface HandlersPatchTaskRequest {
  assignee_id?: string;
  description?: string;
  /** Expected time in hours */
  expected_time?: number;
  name?: string;
  points?: number;
  status?: string;
  timer?: string;
}

export interface HandlersProductivityRangeRequest {
  alert?: HandlersRangeValuesRequest;
  critical?: HandlersRangeValuesRequest;
  ok?: HandlersRangeValuesRequest;
}

export interface HandlersRangeValuesRequest {
  max?: number;
  min?: number;
}

export interface HandlersRegisterRequest {
  email: string;
  name: string;
  /** @minLength 6 */
  password: string;
}

export interface HandlersSetRangeRequest {
  /** SpeedPerIteration, ReworkPerIteration, InstabilityIndex */
  indicator_type?: string;
  project_id?: string;
  range?: HandlersProductivityRangeRequest;
}

export interface HandlersUpdateMetricValuesRequest {
  instability_value?: number;
  rework_value?: number;
  speed_value?: number;
}

export interface HandlersUpdateProjectRequest {
  color?: string;
  description?: string;
  member_ids?: string[];
  name: string;
}

export interface HandlersUpdateTaskRequest {
  assignee_id?: string;
  description?: string;
  /** Expected time in hours */
  expected_time?: number;
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
  assignee?: ModelsUser;
  cause?: ModelsCause;
  created_at?: string;
  description?: string;
  end_at?: string;
  id?: string;
  indicator_range_id?: string;
  start_at?: string;
  status?: ModelsStatusEnum;
  updated_at?: string;
}

export interface ModelsAxisDefinition {
  label?: string;
  type?: string;
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
  indicator_range_id?: string;
  metric?: ModelsMetricEnum;
  productivity_level?: ModelsProductivityEnum;
  updated_at?: string;
}

export interface ModelsDataPoint {
  status?: ModelsProductivityEnum;
  x?: number;
  y?: number;
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
  /** Associated causes and actions for improvement */
  causes?: ModelsCause[];
  created_at?: string;
  id?: string;
  instability_level?: ModelsProductivityEnum;
  /** improvements / tasks */
  instability_value?: number;
  iteration_id?: string;
  rework_level?: ModelsProductivityEnum;
  /** bugs / tasks */
  rework_value?: number;
  /**
   * Calculated productivity levels based on project-level ranges
   * These are computed at runtime, not stored in DB
   */
  speed_level?: ModelsProductivityEnum;
  /** Calculated metric values (stored in DB for performance) */
  speed_value?: number;
  updated_at?: string;
}

export interface ModelsIndicatorAnalysisData {
  indicatorType?: string;
  points?: ModelsDataPoint[];
  xAxis?: ModelsAxisDefinition;
  yAxis?: ModelsAxisDefinition;
}

export interface ModelsIndicatorMetricValue {
  indicator_type?: ModelsIndicatorEnum;
  productivity_level?: ModelsProductivityEnum;
  value?: number;
}

export interface ModelsIndicatorRange {
  created_at?: string;
  id?: string;
  indicator_type?: ModelsIndicatorEnum;
  project_id?: string;
  range?: ModelsProductivityRange;
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

export interface ModelsIterationAnalysisResponse {
  analysis?: Record<string, ModelsIndicatorAnalysisData>;
  iterationId?: string;
}

export interface ModelsProductivityRange {
  alert?: ModelsRangeValues;
  critical?: ModelsRangeValues;
  ok?: ModelsRangeValues;
}

export interface ModelsProject {
  color?: string;
  created_at?: string;
  description?: string;
  id?: string;
  members?: ModelsUser[];
  name?: string;
  updated_at?: string;
}

export interface ModelsRangeValues {
  max?: number;
  min?: number;
}

export interface ModelsTask {
  assignee?: ModelsUser;
  bugs?: ModelsBug[];
  created_at?: string;
  description?: string;
  expected_time?: number;
  id?: string;
  improvements?: ModelsImprov[];
  iteration_id?: string;
  name?: string;
  points?: number;
  status?: ModelsStatusEnum;
  /** Sub-tasks */
  tasks?: ModelsTask[];
  timer?: number;
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

export interface ActionsPartialUpdateParams {
  /**
   * Action ID
   * @format uuid
   */
  id: string;
}

export interface RangesDeleteParams {
  /**
   * Range ID
   * @format uuid
   */
  rangeId: string;
}

export interface MetricsUpdateParams {
  /**
   * Indicator ID
   * @format uuid
   */
  indicatorId: string;
}

export interface SummaryListParams {
  /**
   * Indicator ID
   * @format uuid
   */
  indicatorId: string;
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

export interface AnalysisListParams {
  /**
   * Iteration ID
   * @format uuid
   */
  id: string;
}

export interface CausesActionsListParams {
  /** Iteration ID */
  iterationId: string;
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

export interface IndicatorRangeIdsDetailParams {
  /**
   * Project ID
   * @format uuid
   */
  projectId: string;
  /** Indicator type (SpeedPerIteration, ReworkPerIteration, InstabilityIndex) */
  indicatorType: string;
}

export interface IndicatorRangesListParams {
  /**
   * Project ID
   * @format uuid
   */
  projectId: string;
}

export interface IndicatorRangesDefaultCreateParams {
  /**
   * Project ID
   * @format uuid
   */
  projectId: string;
}

export interface IndicatorRangesDetailParams {
  /**
   * Project ID
   * @format uuid
   */
  projectId: string;
  /** Indicator type (SpeedPerIteration, ReworkPerIteration, InstabilityIndex) */
  indicatorType: string;
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

export interface TasksPartialUpdateParams {
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
