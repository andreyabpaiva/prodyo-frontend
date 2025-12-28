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
import { Spinner } from "@/components/ui/spinner";
import { Frown } from "lucide-react";

type IndicatorsPageProps = {
    params: Promise<{ projectId: string }>;
};

export default function ProjectIndicatorsPage({ params }: IndicatorsPageProps) {
    const { projectId } = use(params);
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const iterationParam = searchParams.get("iteration");
    const activeGraphsId = useSelector((state: RootState) => state.iteration.activeGraphsId);

    const {
        data: iterations,
        isLoading: isLoadingIterations
    } = useQuery({
        queryKey: ["iterations", projectId],
        queryFn: () => iterationService.list({ project_id: projectId }),
        enabled: !!projectId,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 5 * 60 * 1000
    });

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
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false
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
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 5 * 60 * 1000,
        retry: false,
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

    // if (isLoadingIterations) {
    //     return (
    //         <main className="ml-50 relative min-h-screen bg-[--dark] px-12 py-5 text-[--primary]">
    //             <div className="flex items-center justify-center h-96">
    //                 <p className="text-lg">Carregando iterações...</p>
    //             </div>
    //         </main>
    //     );
    // }

    // Error state
    // if (iterationsError) {
    //     return (
    //         <main className="ml-50 relative min-h-screen bg-[--dark] px-12 py-5 text-[--primary]">
    //             <div className="flex flex-col items-center justify-center h-96 gap-4">
    //                 <p className="text-lg text-red-500">Erro ao carregar iterações</p>
    //                 <p className="text-sm text-[--divider]">{iterationsError.message}</p>
    //             </div>
    //         </main>
    //     );
    // }

    // No iterations found
    // if (!iterations || iterations.length === 0) {
    //     return (
    //         <main className="ml-50 relative min-h-screen bg-[--dark] px-12 py-5 text-[--primary]">
    //             <div className="flex items-center justify-center h-96">
    //                 <p className="text-lg text-[--divider]">Nenhuma iteração encontrada para este projeto</p>
    //             </div>
    //         </main>
    //     );
    // }

    if (!indicator || isLoadingAnalysis || isLoadingIterations) {
        <div className="justify-center items-center p-8 text-center text-lg font-semibold bg-[--background]">
            <p>Carregando indicadores</p>
            <Spinner fontSize={15} />
        </div>
    }

    if (analysisError) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-center">
                <div className="flex-col p-5 border-3 bg-[var(--critic)] rounded-md shadow-[6px_6px_0px_rgba(0,0,0,0.35)]">
                    <div className="flex items-center gap-2">
                        <Frown className="text-[var(--primary)]" />
                        <p className="text-[var(--primary)] font-bold">Erro ao carregar indicadores</p>
                    </div>
                    <div className="items-center mt-2">
                        <p className="text-[var(--primary)] text-sm">Tente novamente em breve</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="ml-50 relative min-h-screen bg-[--dark] p-8">
            <header className="mb-8 flex items-center justify-between">
                {/* <div>
                    <h1 className="mt-2 text-4xl font-extrabold">Indicadores</h1>
                    <p className="mt-2 text-md text-[--divider]">
                        Iteração {currentIteration?.number || "-"}
                    </p>
                </div> */}
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">Indicadores</h1>
                    <p className="text-sm text-[var(--disabled)]">Iteração {currentIteration?.number || "-"}</p>
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

            {/* {isLoadingAnalysis && (
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

            {!isLoadingAnalysis && !analysisError && !analysisResponse && (
                <div className="flex items-center justify-center h-64">
                    <p className="text-lg text-[--divider]">Nenhuma análise encontrada para esta iteração</p>
                </div>
            )} */}

            {!isLoadingAnalysis && !analysisError && analysisResponse && (
                <IndicatorBoard
                    analysisData={analysisResponse.analysis}
                />
            )}
        </main>
    );
}
