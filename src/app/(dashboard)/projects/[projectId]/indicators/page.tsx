"use client";

import { IndicatorBoard } from "@/components/dashboard/indicator-board";
import { Button } from "@/components/ui/button";
import { IndicatorAnalysisDialog } from "@/components/dashboard/modals";
import { useQuery } from "@tanstack/react-query";
import { iterationService } from "@/services/iteration";
import { indicatorService } from "@/services/indicator";
import { useSearchParams } from "next/navigation";
import { useEffect, use, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setActiveGraphsId } from "@/store/iterationSlice";
import {
    mapApiCauseToDomain,
    mapApiActionToDomain,
} from "@/lib/mappers/indicator-mapper";

type IndicatorsPageProps = {
    params: Promise<{ projectId: string }>;
};

export default function ProjectIndicatorsPage({ params }: IndicatorsPageProps) {
    const { projectId } = use(params);
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const iterationParam = searchParams.get("iteration");
    const activeGraphsId = useSelector((state: RootState) => state.iteration.activeGraphsId);

    // Fetch iterations for the project
    const {
        data: iterations,
        isLoading: isLoadingIterations,
        error: iterationsError
    } = useQuery({
        queryKey: ["iterations", projectId],
        queryFn: () => iterationService.list({ project_id: projectId }),
        enabled: !!projectId,
    });

    // Sync URL param with Redux state and set default
    useEffect(() => {
        if (iterationParam) {
            dispatch(setActiveGraphsId(iterationParam));
        } else if (iterations && iterations.length > 0 && !activeGraphsId) {
            const firstIterationId = iterations[0]?.id;
            if (firstIterationId) {
                dispatch(setActiveGraphsId(firstIterationId));
            }
        }
    }, [iterationParam, iterations, activeGraphsId, dispatch]);

    const {
        data: analysisResponse,
        isLoading: isLoadingAnalysis,
        error: analysisError
    } = useQuery({
        queryKey: ["analysis", activeGraphsId],
        queryFn: () => {
            if (!activeGraphsId) {
                throw new Error("No active iteration selected");
            }
            return iterationService.analysis(activeGraphsId);
        },
        enabled: !!activeGraphsId,
    });

    const { data: indicator } = useQuery({
        queryKey: ["indicators", activeGraphsId],
        queryFn: () => {
            if (!activeGraphsId) {
                throw new Error("No active iteration selected");
            }
            return indicatorService.list({ iteration_id: activeGraphsId });
        },
        enabled: !!activeGraphsId,
    });

    const currentIteration = iterations?.find(i => i.id === activeGraphsId);

    const indicatorCauses = useMemo(() =>
        indicator?.causes?.map(mapApiCauseToDomain) || [],
        [indicator]
    );
    const indicatorActions = useMemo(() =>
        indicator?.actions?.map(mapApiActionToDomain) || [],
        [indicator]
    );

    if (isLoadingIterations) {
        return (
            <main className="ml-50 relative min-h-screen bg-[--dark] px-12 py-5 text-[--primary]">
                <div className="flex items-center justify-center h-96">
                    <p className="text-lg">Carregando iterações...</p>
                </div>
            </main>
        );
    }

    // Error state
    if (iterationsError) {
        return (
            <main className="ml-50 relative min-h-screen bg-[--dark] px-12 py-5 text-[--primary]">
                <div className="flex flex-col items-center justify-center h-96 gap-4">
                    <p className="text-lg text-red-500">Erro ao carregar iterações</p>
                    <p className="text-sm text-[--divider]">{iterationsError.message}</p>
                </div>
            </main>
        );
    }

    // No iterations found
    if (!iterations || iterations.length === 0) {
        return (
            <main className="ml-50 relative min-h-screen bg-[--dark] px-12 py-5 text-[--primary]">
                <div className="flex items-center justify-center h-96">
                    <p className="text-lg text-[--divider]">Nenhuma iteração encontrada para este projeto</p>
                </div>
            </main>
        );
    }

    return (
        <main className="ml-50 relative min-h-screen bg-[--dark] px-12 py-5 text-[--primary]">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="mt-2 text-4xl font-extrabold">Indicadores</h1>
                    <p className="mt-2 text-md text-[--divider]">
                        Iteração {currentIteration?.number || "-"}
                    </p>
                </div>
                {indicator && (
                    <IndicatorAnalysisDialog
                        trigger={
                            <Button variant="default">
                                Visualizar análise do indicador
                            </Button>
                        }
                        causes={indicatorCauses}
                        actions={indicatorActions}
                    />
                )}
            </header>

            {isLoadingAnalysis && (
                <div className="flex items-center justify-center h-64">
                    <p className="text-lg">Carregando análise...</p>
                </div>
            )}

            {analysisError && (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <p className="text-lg text-red-500">Erro ao carregar análise</p>
                    <p className="text-sm text-[--divider]">{analysisError.message}</p>
                </div>
            )}

            {!isLoadingAnalysis && !analysisError && analysisResponse && (
                <IndicatorBoard
                    analysisData={analysisResponse.analysis}
                />
            )}

            {!isLoadingAnalysis && !analysisError && !analysisResponse && (
                <div className="flex items-center justify-center h-64">
                    <p className="text-lg text-[--divider]">Nenhuma análise encontrada para esta iteração</p>
                </div>
            )}
        </main>
    );
}
