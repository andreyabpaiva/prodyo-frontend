"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { iterationService } from "@/services/iteration";

type DeleteIterationModalProps = {
    projectId: string;
    iterationId: string;
};

export function DeleteIterationModal({ projectId, iterationId }: DeleteIterationModalProps) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: iterations = [] } = useQuery({
        queryKey: ["iterations", projectId],
        queryFn: () => iterationService.list({ project_id: projectId }),
        enabled: !!projectId,
    });

    const iteration = iterations.find((iter) => iter.id === iterationId);
    const iterationLabel = iteration ? `Iteração ${iteration.number || 0}` : "esta iteração";

    const mutation = useMutation({
        mutationFn: async () => {
            return await iterationService.delete({ id: iterationId });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["iterations", projectId] });
            queryClient.invalidateQueries({ queryKey: ["projectDetail", projectId] });
            router.back();
        },
        onError: (error) => {
            console.error("Error deleting iteration:", error);
        },
    });

    const handleClose = () => {
        router.back();
    };

    const handleConfirm = () => {
        mutation.mutate();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={handleClose}
            />

            <div className="relative z-10 w-full max-w-md rounded-[24px] border-[3px] border-[var(--dark)] bg-[var(--background)] p-8">

                <div className="mt-2 mb-6">
                    <p className="text-lg">
                        Tem certeza que deseja deletar <strong>{iterationLabel}</strong> ?
                    </p>
                </div>

                {mutation.isError && (
                    <div className="mb-4 p-3 rounded-[12px] bg-red-100 border-2 border-red-500">
                        <p className="text-sm text-red-700 font-semibold">
                            Erro ao deletar iteração. Tente novamente.
                        </p>
                    </div>
                )}

                <div className="flex justify-center flex-col gap-3 max-w-md">
                    <Button
                        type="button"
                        variant="default"
                        onClick={handleConfirm}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Deletando..." : "Confirmar"}
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleClose}
                        disabled={mutation.isPending}
                    >
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    );
}
