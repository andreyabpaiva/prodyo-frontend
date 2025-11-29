import {
  Action,
  Bug,
  Cause,
  Improvement,
  Indicator,
  Iteration,
  Member,
  MetricType,
  ProductivityLevel,
  Project,
  Task,
} from "@/types/domain";

const members: Member[] = [
  {
    id: "member-andreya",
    name: "Andreya",
    email: "andreya@prodyo.dev",
    projectRole: "Admin",
  },
  {
    id: "member-carlos",
    name: "Carlos",
    email: "carlos@prodyo.dev",
    projectRole: "Colaborador",
  },
  {
    id: "member-beatriz",
    name: "Beatriz",
    email: "beatriz@prodyo.dev",
    projectRole: "Designer",
  },
];

const productivityRange = {
  ok: 90,
  alert: 70,
  critical: 50,
};

const projects: Project[] = [
  {
    id: "proj-01",
    name: "Nome projeto exemplo",
    description:
      "Sistema para acompanhar a produtividade do time e direcionar ações rápidas.",
    color: "#B9FF94",
    prodRange: productivityRange,
    createdAt: "2024-11-10T10:00:00Z",
    updatedAt: "2024-11-15T10:15:00Z",
    members,
  },
  {
    id: "proj-02",
    name: "Nome projeto exemplo",
    description: "Ferramenta de insights de qualidade.",
    color: "#83B3FF",
    prodRange: productivityRange,
    createdAt: "2024-10-02T08:00:00Z",
    updatedAt: "2024-10-10T12:30:00Z",
    members,
  },
  {
    id: "proj-03",
    name: "Nome projeto exemplo",
    description: "Portal de integrações",
    color: "#FF5050",
    prodRange: productivityRange,
    createdAt: "2024-09-01T09:00:00Z",
    updatedAt: "2024-09-04T09:15:00Z",
    members,
  },
  {
    id: "proj-04",
    name: "Nome projeto exemplo",
    description: "Aplicativo mobile interno",
    color: "#FEFFDD",
    prodRange: productivityRange,
    createdAt: "2024-11-01T15:00:00Z",
    updatedAt: "2024-11-05T10:00:00Z",
    members,
  },
  {
    id: "proj-05",
    name: "Nome projeto exemplo",
    description: "Dashboard corporativo",
    color: "#D9D9D9",
    prodRange: productivityRange,
    createdAt: "2024-08-14T15:45:00Z",
    updatedAt: "2024-08-18T17:00:00Z",
    members,
  },
  {
    id: "proj-06",
    name: "Nome projeto exemplo",
    description: "Base de conhecimento",
    color: "#B9FF94",
    prodRange: productivityRange,
    createdAt: "2024-05-04T15:45:00Z",
    updatedAt: "2024-05-18T17:00:00Z",
    members,
  },
];

const improvements: Improvement[] = [
  {
    id: "improv-01",
    taskId: "task-01",
    number: 1,
    description: "Refinar fluxo de deploy para diminuir fila de espera.",
    assignee: members[0],
    loggedAt: "2024-11-11T20:15:09Z",
    elapsedTime: "02:30:00",
  },
  {
    id: "improv-02",
    taskId: "task-01",
    number: 2,
    description: "Adicionar validação automática para evitar regressões.",
    assignee: members[1],
    loggedAt: "2024-11-11T21:00:00Z",
    elapsedTime: "01:15:00",
  },
  {
    id: "improv-03",
    taskId: "task-02",
    number: 3,
    description: "Aprimorar checklist de release para o time.",
    assignee: members[2],
    loggedAt: "2024-11-11T22:00:00Z",
    elapsedTime: "00:45:00",
  },
];

const bugs: Bug[] = [
  {
    id: "bug-01",
    taskId: "task-01",
    number: 1,
    description: "Bug 1",
    assignee: members[1],
    severity: "CRITICAL",
    loggedAt: "2024-11-11T18:00:00Z",
    elapsedTime: "00:30:00",
  },
  {
    id: "bug-02",
    taskId: "task-01",
    number: 2,
    description: "Bug 1",
    assignee: members[0],
    severity: "ALERT",
    loggedAt: "2024-11-11T18:30:00Z",
    elapsedTime: "00:15:00",
  },
  {
    id: "bug-03",
    taskId: "task-02",
    number: 3,
    description: "Bug 1",
    assignee: members[2],
    severity: "CRITICAL",
    loggedAt: "2024-11-11T18:45:00Z",
    elapsedTime: "00:20:00",
  },
];

const tasks: Task[] = [
  {
    id: "task-01",
    iterationId: "iter-01",
    name: "Nome da tarefa",
    description:
      "Descrição descrição descrição descrição descrição descrição de descrição...",
    status: "COMPLETED",
    points: 10,
    assignee: members[0],
    totalTime: "20:15:09",
    improvements: improvements.filter((item) => item.taskId === "task-01"),
    bugs: bugs.filter((item) => item.taskId === "task-01"),
    indicatorId: "indicator-velocity",
  },
  {
    id: "task-02",
    iterationId: "iter-01",
    name: "Tarefa 2",
    description: "Descrição detalhada da tarefa 2 para acompanhamento.",
    status: "NOT_STARTED",
    points: 10,
    assignee: members[1],
    totalTime: "00:00:00",
    improvements: improvements.filter((item) => item.taskId === "task-02"),
    bugs: bugs.filter((item) => item.taskId === "task-02"),
    indicatorId: "indicator-rework",
  },
  {
    id: "task-03",
    iterationId: "iter-01",
    name: "Revisar documentação",
    description: "Atualizar guias e checagens.",
    status: "IN_PROGRESS",
    points: 8,
    assignee: members[2],
    totalTime: "00:00:00",
    improvements: [],
    bugs: [],
    indicatorId: "indicator-instability",
  },
  {
    id: "task-04",
    iterationId: "iter-01",
    name: "Job de integração",
    description: "Sincronizar dados de indicadores.",
    status: "IN_PROGRESS",
    points: 13,
    assignee: members[0],
    totalTime: "00:00:00",
    improvements: [],
    bugs: [],
  },
];

const iterations: Iteration[] = [
  {
    id: "iter-01",
    projectId: "proj-01",
    number: 1,
    description: "Sprint focada em estabilizar o produto.",
    startAt: "2024-11-11T08:00:00Z",
    endAt: "2024-11-18T18:00:00Z",
    tasks: tasks.filter((task) => task.iterationId === "iter-01"),
    indicators: [],
  },
  {
    id: "iter-02",
    projectId: "proj-01",
    number: 2,
    description: "Sprint de evolução da plataforma.",
    startAt: "2024-11-19T08:00:00Z",
    endAt: "2024-11-26T18:00:00Z",
  },
  {
    id: "iter-03",
    projectId: "proj-01",
    number: 3,
    description: "Tempo de análise das métricas.",
    startAt: "2024-11-27T08:00:00Z",
    endAt: "2024-12-04T18:00:00Z",
  },
  {
    id: "iter-04",
    projectId: "proj-01",
    number: 4,
    description: "Preparação para o próximo quarter.",
    startAt: "2024-12-05T08:00:00Z",
    endAt: "2024-12-12T18:00:00Z",
  },
];

const causes: Cause[] = [
  {
    id: "cause-01",
    indicatorId: "indicator-rework",
    metric: "REWORK_INDEX",
    description: "History de requisitos incompletos gera retrabalho.",
    productivityLevel: "ALERT",
    assignee: members[0],
    status: "NOT_STARTED",
  },
  {
    id: "cause-02",
    indicatorId: "indicator-velocity",
    metric: "WORK_VELOCITY",
    description: "Fila externa dificultando entregas.",
    productivityLevel: "ALERT",
    assignee: members[1],
    status: "NOT_STARTED",
  },
];

const actions: Action[] = [
  {
    id: "action-01",
    indicatorId: "indicator-instability",
    title: "Ação",
    description: "Mapear integrações instáveis e criar owners.",
    owner: members[0],
    status: "NOT_STARTED",
    startDate: "2024-11-12",
    endDate: "2024-11-24",
  },
];

const indicators: Indicator[] = [
  {
    id: "indicator-velocity",
    iterationId: "iter-01",
    metric: "WORK_VELOCITY",
    valueSeries: [50, 80, 65, 110, 110, 110, 112],
    labels: ["1", "2", "3", "7", "11", "19"],
    productivityLevel: "OK",
    causes: causes.filter((cause) => cause.indicatorId === "indicator-velocity"),
    actions: [],
  },
  {
    id: "indicator-rework",
    iterationId: "iter-01",
    metric: "REWORK_INDEX",
    valueSeries: [120, 110, 110, 90, 60, 55],
    labels: ["1", "3", "7", "11", "15", "19"],
    productivityLevel: "ALERT",
    causes: causes.filter((cause) => cause.indicatorId === "indicator-rework"),
    actions: [],
  },
  {
    id: "indicator-instability",
    iterationId: "iter-01",
    metric: "INSTABILITY_INDEX",
    valueSeries: [55, 60, 65, 70, 80, 90, 110],
    labels: ["1", "3", "7", "11", "15", "19"],
    productivityLevel: "CRITICAL",
    causes: [],
    actions,
  },
];

// Helper getters ----------------------------------------------------

const getProjectById = (projectId: string) =>
  projects.find((project) => project.id === projectId);

const getIterationsByProject = (projectId: string) =>
  iterations.filter((iteration) => iteration.projectId === projectId);

const getTasksByIteration = (iterationId: string) =>
  tasks.filter((task) => task.iterationId === iterationId);

const getIndicatorsByIteration = (iterationId: string) =>
  indicators.filter((indicator) => indicator.iterationId === iterationId);

export const mockData = {
  members,
  projects,
  iterations,
  tasks,
  improvements,
  bugs,
  indicators,
  causes,
  actions,
  getProjectById,
  getIterationsByProject,
  getTasksByIteration,
  getIndicatorsByIteration,
};

export type ProductivityBadge = {
  label: string;
  tone: ProductivityLevel;
};

export type MetricCopy = {
  id: MetricType;
  label: string;
  unit: string;
};


