"use client";

import { IndicatorBoard } from "@/components/dashboard/board/Indicator";
import { useQuery } from "@tanstack/react-query";
import { iterationService } from "@/services/iteration";
import { useSearchParams } from "next/navigation";
import { useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setActiveGraphsId } from "@/store/iterationSlice";
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

    const currentIteration = iterations?.find(i => i.id === activeGraphsId);

    if (isLoadingAnalysis || isLoadingIterations) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] p-8 text-center">
                <div className="flex flex-col gap-2">
                    <p className="text-lg font-semibold">Carregando indicadores</p>
                    <Spinner fontSize={15} />
                </div>
            </div>
        );
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
            <header className="mb-8 flex items-center gap-3">
                <h1 className="text-2xl font-bold">Indicadores</h1>
                <p className="text-sm text-[var(--disabled)]">Iteração {currentIteration?.number || "-"}</p>
            </header>

            {!isLoadingAnalysis && !analysisError && analysisResponse && (
                <IndicatorBoard analysisData={analysisResponse.analysis} />
            )}
        </main>
    );
}
