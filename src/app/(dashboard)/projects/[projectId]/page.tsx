"use client";

import { use, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { iterationService } from "@/services/iteration";
import { useAppDispatch } from "@/store/hooks";
import { setProjectId } from "@/store/projectSlice";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { IterationBoard } from "@/components/dashboard/board/Iteration";

type ProjectDetailProps = {
    params: Promise<{ projectId: string }>;
};

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
    const { projectId } = use(params);
    const router = useRouter();

    const { data: iterations = [], isLoading: isLoading } = useQuery({
        queryKey: ["iterations", projectId],
        queryFn: () => iterationService.list({ project_id: projectId ?? "" }),
        enabled: !!projectId,
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (projectId) {
            dispatch(setProjectId(projectId));
        }
    }, [projectId, dispatch]);

    if (isLoading) {
        return (
            <main className="min-h-screen bg-[--background] text-[--text] flex items-center justify-center gap-2">
                <div className="text-lg font-semibold">Carregando iterações</div>
                <Spinner fontSize={15}/>
            </main>
        );
    }

    if (iterations === null || iterations.length === 0) {
        return (
            <div className="fixed inset-0 flex flex-col gap-4 justify-center items-center p-8 text-center text-lg font-semibold bg-[--background]">
                Nenhuma iteração disponível.

                <Button
                    onClick={() =>
                        router.push(`/projects/${projectId}/create-iteration`)
                    }>
                    Criar iteração
                </Button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[--background] text-[--text]">
            <IterationBoard iterations={iterations} />
        </main>
    );
}


