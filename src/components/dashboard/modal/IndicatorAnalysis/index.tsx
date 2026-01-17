"use client";

import { Badge } from "@/components/ui/badge";
import { indicatorService, iterationService, userService } from "@/services";
import { RootState } from "@/store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, MoveRight, UserRound, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ModelsStatusEnum, ModelsUser } from "@/apis/data-contracts";

interface ApiCauseActionResponse {
  actions: ApiAction[];
  causes: ApiCause[];
  iteration_id: string;
}

interface ApiAction {
  id: string;
  indicator_range_id: string;
  description: string;
  cause: ApiCause;
  start_at: string;
  end_at: string;
  status?: string;
  assignee: {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
}

interface ApiCause {
  id: string;
  indicator_range_id: string;
  metric: string;
  description: string;
  productivity_level: string;
  created_at: string;
  updated_at: string;
}

const getMetricLabel = (metric: string): string => {
  const metricMap: Record<string, string> = {
    WorkVelocity: "VELOCIDADE",
    ReworkIndex: "ÍNDICE DE RETRABALHO",
    InstabilityIndex: "ÍNDICE DE INSTABILIDADE",
  };
  return metricMap[metric] || metric;
};

const getProductivityLevelColor = (level: string): string => {
  const levelColorMap: Record<string, string> = {
    OK: "[var(--ok)]",
    Alert: "[var(--alert)]",
    Critical: "[var(--critic)]",
  };
  return levelColorMap[level] || "#FFF59D";
};

const getStatusLabel = (level: string): string => {
  const statusMap: Record<string, string> = {
    OK: "FINALIZADO",
    Alert: "EM PROGRESSO",
    Critical: "NÃO INICIADO",
  };
  return statusMap[level] || "NÃO INICIADO";
};

const statusLabels: Record<ModelsStatusEnum, string> = {
  [ModelsStatusEnum.StatusNotStarted]: "NÃO INICIADO",
  [ModelsStatusEnum.StatusInProgress]: "EM PROGRESSO",
  [ModelsStatusEnum.StatusCompleted]: "FINALIZADO",
};

const statusTone: Record<ModelsStatusEnum, string> = {
  [ModelsStatusEnum.StatusNotStarted]: "bg-[#bfbfbf] text-[var(--text)]",
  [ModelsStatusEnum.StatusInProgress]: "bg-[#83B3FF] text-[var(--text)]",
  [ModelsStatusEnum.StatusCompleted]: "bg-[var(--ok)] text-[var(--text)]",
};

const productivityToStatus: Record<string, ModelsStatusEnum> = {
  Critical: ModelsStatusEnum.StatusNotStarted,
  Alert: ModelsStatusEnum.StatusInProgress,
  OK: ModelsStatusEnum.StatusCompleted,
};

const getActionStatus = (action: ApiAction): ModelsStatusEnum => {
  if (action.status) {
    return action.status as ModelsStatusEnum;
  }
  return (
    productivityToStatus[action.cause.productivity_level] ||
    ModelsStatusEnum.StatusNotStarted
  );
};

export function IndicatorAnalysis() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const iterationId = useSelector(
    (state: RootState) => state.iteration.activeGraphsId,
  );
  const projectId = useSelector((state: RootState) => state.project.projectId);
  const [openAssigneeId, setOpenAssigneeId] = useState<string | null>(null);
  const [openStatusId, setOpenStatusId] = useState<string | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["cause-action-list", iterationId],
    queryFn: async () => {
      const response = await iterationService.causeActionList({
        iterationId: iterationId ?? "",
      });
      return response as ApiCauseActionResponse;
    },
    enabled: !!iterationId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery<ModelsUser[]>({
    queryKey: ["users", projectId],
    queryFn: async () => {
      if (!projectId) return [];
      const response = await userService.projectDetail({ projectId });
      return response?.data || [];
    },
    enabled: !!projectId,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const updateActionMutation = useMutation({
    mutationFn: async ({
      actionId,
      assigneeId,
      status,
    }: {
      actionId: string;
      assigneeId?: string;
      status?: string;
    }) => {
      return await indicatorService.patchAction(
        { id: actionId },
        {
          assignee_id: assigneeId !== undefined ? assigneeId : undefined,
          status: status !== undefined ? status : undefined,
        },
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cause-action-list", iterationId],
      });
      setOpenAssigneeId(null);
      setOpenStatusId(null);
    },
    onError: (error) => {
      console.error("Failed to update action:", error);
    },
  });

  const handleAssigneeSelect = (actionId: string, userId?: string) => {
    updateActionMutation.mutate({ actionId, assigneeId: userId });
  };

  const handleStatusSelect = (actionId: string, status: string) => {
    updateActionMutation.mutate({ actionId, status });
  };

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
        <div className="relative z-10 w-full max-w-2xl rounded-3xl border-[3px] border-black bg-white px-10 py-8">
          <p className="text-center text-black font-bold">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!data || (data.causes.length === 0 && data.actions.length === 0)) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
        <div className="relative z-10 w-full max-w-2xl rounded-3xl border-[3px] border-black bg-white px-10 py-8">
          <button
            onClick={handleClose}
            className="absolute right-6 top-6 text-black hover:opacity-70 transition-opacity cursor-pointer"
          >
            <X size={24} strokeWidth={2.5} />
          </button>
          <p className="text-center text-black font-bold">
            Nenhuma causa ou ação encontrada
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative z-10 w-full max-w-[680px] max-h-[90vh] overflow-y-auto rounded-3xl border-[3px] border-black bg-white px-8 py-6">
        <button
          onClick={handleClose}
          className="absolute right-6 top-6 text-black hover:opacity-70 transition-opacity cursor-pointer"
        >
          <X size={28} strokeWidth={2.5} />
        </button>

        <h2 className="text-2xl font-bold text-black mb-6">
          Análise do indicador
        </h2>

        {/* Causes Carousel */}
        {data.causes.length > 0 && (
          <div className="mb-6">
            <div className="flex gap-2">
              <h3 className="text-lg font-bold text-black mb-3">Causas</h3>
              {data.causes.length > 2 && (
                <div className="flex items-center gap-2 mb-2">
                  <MoveRight size={14} className="text-[var(--disabled)]" />
                  <p className="text-[var(--disabled)] text-sm">
                    Arraste para o lado para visualizar mais
                  </p>
                </div>
              )}
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 py-2">
                {data.causes.map((cause) => (
                  <div
                    key={cause.id}
                    className="flex-shrink-0 w-[280px] rounded-2xl border-[3px] border-black overflow-hidden
                                        shadow-[6px_6px_0px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-1"
                  >
                    <div
                      className={`p-4 bg-${getProductivityLevelColor(cause.productivity_level)}`}
                    >
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-black mb-1">
                          Causa
                        </p>
                        <p className="text-xs font-bold uppercase text-black">
                          <u>{getMetricLabel(cause.metric)}</u>
                        </p>
                      </div>
                      <p>{cause.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {data.actions.length > 0 && (
          <div>
            <div>
              <h3 className="text-lg font-bold text-black mb-3">Ações</h3>
              {data.actions.length > 2 && (
                <>
                  <MoveRight className="text-[var(--disabled)]" />
                  <p className="text-[var(--disabled)]">
                    Arraste para o lado para visualizar mais
                  </p>
                </>
              )}
            </div>
            <div className="overflow-x-auto scrollbar-hide pb-15">
              <div className="flex gap-4 py-2">
                {data.actions.map((action) => (
                  <div
                    key={action.id}
                    className="flex-shrink-0 w-[280px] relative"
                  >
                    <div className="rounded-2xl border-[3px] border-black overflow-hidden shadow-[6px_6px_0px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-1">
                      <div className="px-4 py-2 flex items-center justify-between gap-2 border-b-[3px] border-black bg-white">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenStatusId(
                                openStatusId === action.id ? null : action.id,
                              )
                            }
                            disabled={updateActionMutation.isPending}
                            className="flex items-center gap-1.5 text-xs font-bold hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Badge
                              className={`${statusTone[getActionStatus(action)]} border-3 text-xs font-bold rounded-full px-3 py-0.5`}
                            >
                              {statusLabels[getActionStatus(action)]}
                            </Badge>
                            <ChevronDown
                              size={12}
                              strokeWidth={2.5}
                              className="text-black"
                            />
                          </button>
                        </div>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenAssigneeId(
                                openAssigneeId === action.id ? null : action.id,
                              )
                            }
                            disabled={updateActionMutation.isPending}
                            className="flex items-center gap-1.5 text-xs font-semibold text-black hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <UserRound size={14} strokeWidth={2.5} />
                            <span>
                              {action.assignee?.name || "Sem atribuição"}
                            </span>
                            <ChevronDown size={12} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>

                      <div
                        className={`p-4 bg-${getProductivityLevelColor(action.cause.productivity_level)}`}
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-lg font-bold text-black mb-1">
                            Ação
                          </p>
                          <p className="text-xs font-bold uppercase text-black">
                            <u>{getMetricLabel(action.cause.metric)}</u>
                          </p>
                        </div>
                        <p>{action.description}</p>
                      </div>
                    </div>
                    {openStatusId === action.id && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setOpenStatusId(null)}
                        />
                        <div className="absolute top-[44px] left-0 z-50 w-40 rounded-[12px] border-[3px] border-black bg-white shadow-lg overflow-hidden">
                          {(
                            Object.entries(statusLabels) as [
                              ModelsStatusEnum,
                              string,
                            ][]
                          ).map(([status, label], index) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() =>
                                handleStatusSelect(action.id, status)
                              }
                              disabled={updateActionMutation.isPending}
                              className={`w-full text-left px-4 py-2 text-sm cursor-pointer font-semibold transition-colors ${statusTone[status]} ${updateActionMutation.isPending ? "opacity-50 cursor-not-allowed" : ""} ${index === 0 ? "rounded-t-[9px]" : ""} ${index === (Object.entries(statusLabels) as [ModelsStatusEnum, string][]).length - 1 ? "rounded-b-[9px]" : ""}`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Assignee Dropdown outside the card */}
                    {openAssigneeId === action.id && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setOpenAssigneeId(null)}
                        />
                        <div className="absolute top-[44px] right-0 z-50 w-48 rounded-[12px] border-[3px] border-black bg-white shadow-lg max-h-60 overflow-y-auto">
                          {isLoadingUsers ? (
                            <div className="px-4 py-2 text-sm text-gray-500">
                              Carregando...
                            </div>
                          ) : users && users.length === 0 ? (
                            <div className="px-4 py-2 text-sm text-gray-500">
                              Nenhum usuário encontrado
                            </div>
                          ) : (
                            <>
                              {users &&
                                users.map((user) => (
                                  <button
                                    key={user.id}
                                    type="button"
                                    onClick={() =>
                                      handleAssigneeSelect(action.id, user.id)
                                    }
                                    disabled={updateActionMutation.isPending}
                                    className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 transition-colors ${action.assignee?.id === user.id ? "bg-gray-100" : ""} ${updateActionMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                                  >
                                    {user.name}
                                  </button>
                                ))}
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
