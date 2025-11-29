export type ProductivityLevel = "OK" | "ALERT" | "CRITICAL";

export type MetricType = "WORK_VELOCITY" | "REWORK_INDEX" | "INSTABILITY_INDEX";

export type TaskStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export interface ProductivityRange {
  ok: number;
  alert: number;
  critical: number;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  role?: string;
}

export interface Member extends User {
  projectRole?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  prodRange: ProductivityRange;
  createdAt: string;
  updatedAt: string;
  members: Member[];
}

export interface Iteration {
  id: string;
  projectId: string;
  number: number;
  description?: string;
  startAt: string;
  endAt: string;
  tasks?: Task[];
  indicators?: Indicator[];
}

export interface Task {
  id: string;
  iterationId: string;
  name: string;
  description: string;
  status: TaskStatus;
  points: number;
  assignee: User;
  totalTime: string;
  improvements: Improvement[];
  bugs: Bug[];
  indicatorId?: string;
}

export interface Improvement {
  id: string;
  taskId: string;
  number: number;
  description: string;
  assignee: User;
  loggedAt: string;
  elapsedTime?: string;
}

export interface Bug {
  id: string;
  taskId: string;
  number: number;
  description: string;
  assignee: User;
  severity: ProductivityLevel;
  loggedAt: string;
  elapsedTime?: string;
}

export interface Cause {
  id: string;
  indicatorId: string;
  metric: MetricType;
  description: string;
  productivityLevel: ProductivityLevel;
  assignee: User;
  status: TaskStatus;
}

export interface Action {
  id: string;
  indicatorId: string;
  title: string;
  description: string;
  owner: User;
  status: TaskStatus;
  startDate: string;
  endDate: string;
}

export interface Indicator {
  id: string;
  iterationId: string;
  metric: MetricType;
  valueSeries: number[];
  labels: string[];
  productivityLevel: ProductivityLevel;
  causes?: Cause[];
  actions?: Action[];
}

export type ApiListResponse<T> = {
  data: T[];
  total: number;
};

