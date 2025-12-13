"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { iterationService } from "@/services/iteration";
import type { HandlersCreateIterationRequest } from "@/apis/data-contracts";
import { useMemo } from "react";

type CreateIterationModalProps = {
    projectId: string;
    iterationNumber?: number;
};

type IterationFormValues = {
    description: string;
    startDate: string;
    endDate: string;
};

const formatDateToISO = (dateStr: string): string | undefined => {
    if (!dateStr || dateStr.length < 6) return undefined;

    const numbers = dateStr.replace(/\D/g, "");
    if (numbers.length < 6) return undefined;

    const day = numbers.slice(0, 2);
    const month = numbers.slice(2, 4);
    const year = numbers.slice(4, 6);

    const fullYear = `20${year}`;

    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(fullYear, 10);

    if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12) {
        return undefined;
    }

    return `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const formatDateInput = (value: string): string => {
    const numbers = value.replace(/\D/g, "");

    let formatted = "";
    if (numbers.length > 0) {
        formatted = numbers.slice(0, 2);
    }
    if (numbers.length > 2) {
        formatted += "/" + numbers.slice(2, 4);
    }
    if (numbers.length > 4) {
        formatted += "/" + numbers.slice(4, 6);
    }

    return formatted;
};

export function CreateIterationModal({ projectId, iterationNumber: propIterationNumber }: CreateIterationModalProps) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: iterations = [] } = useQuery({
        queryKey: ["iterations", projectId],
        queryFn: () => iterationService.list({ project_id: projectId }),
        enabled: !!projectId,
    });

    const iterationNumber = useMemo(() => {
        if (propIterationNumber !== undefined) {
            return propIterationNumber;
        }

        if (!iterations || iterations.length === 0) {
            return 1;
        }

        const maxNumber = Math.max(...iterations.map(iter => iter.number || 0));
        return maxNumber + 1;
    }, [propIterationNumber, iterations]);

    const form = useForm<IterationFormValues>({
        defaultValues: {
            description: "",
            startDate: "",
            endDate: "",
        },
    });

    const mutation = useMutation({
        mutationFn: async (data: IterationFormValues) => {
            const payload: HandlersCreateIterationRequest = {
                project_id: projectId,
                number: iterationNumber,
                description: data.description || undefined,
                start_at: formatDateToISO(data.startDate),
                end_at: formatDateToISO(data.endDate),
            };

            return await iterationService.create(payload);
        },
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ["iterations", projectId] });
            router.back();
        },
        onError: (error) => {
            console.error("Error creating iteration:", error);
        },
    });

    const handleClose = () => {
        router.back();
    };

    const onSubmit = (data: IterationFormValues) => {
        mutation.mutate(data);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={handleClose}
            />

            <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[24px] border-[3px] border-[var(--dark)] bg-[var(--background)] p-8">
                <button
                    onClick={handleClose}
                    className="absolute right-6 top-6 text-[--dark] hover:opacity-70 transition-opacity cursor-pointer"
                >
                    <X size={24} strokeWidth={2.5} />
                </button>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex items-center gap-4 mb-8">
                        <h1 className="text-3xl font-bold">Iteração {iterationNumber}</h1>
                        <div className="flex items-center gap-2 rounded-full border-2 border-[--dark] px-4 py-2">
                            <input
                                type="text"
                                placeholder="__/__/__"
                                {...form.register("startDate")}
                                onChange={(e) => {
                                    const formatted = formatDateInput(e.target.value);
                                    form.setValue("startDate", formatted);
                                }}
                                maxLength={8}
                                className="w-20 bg-transparent text-center font-semibold outline-none"
                            />
                            <span className="font-semibold">à</span>
                            <input
                                type="text"
                                placeholder="__/__/__"
                                {...form.register("endDate")}
                                onChange={(e) => {
                                    const formatted = formatDateInput(e.target.value);
                                    form.setValue("endDate", formatted);
                                }}
                                maxLength={8}
                                className="w-20 bg-transparent text-center font-semibold outline-none"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <textarea
                            placeholder="Descrição"
                            {...form.register("description")}
                            className="w-full h-32 rounded-[16px] border-[3px] border-[var(--dark)] bg-[var(--modal)] px-4 py-3 text-sm font-semibold outline-none resize-none"
                        />
                    </div>

                    {mutation.isError && (
                        <div className="mb-4 p-3 rounded-[12px] bg-red-100 border-2 border-red-500">
                            <p className="text-sm text-red-700 font-semibold">
                                Erro ao criar iteração. Tente novamente.
                            </p>
                        </div>
                    )}

                    <div className="mt-8 flex justify-end gap-3">
                        <Button
                            type="submit"
                            variant="default"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "Criando..." : "Criar Iteração"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

