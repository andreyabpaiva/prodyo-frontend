"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ColorSelector } from "@/components/utils/ColorSelector";
import { MembersSelect } from "@/components/utils/MemberSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectFormValues } from "./resolver";
import { projectService } from "@/services";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/store/hooks";
import type { RootState } from "@/store/store";
import { IndicatorRange } from "../../utils/IndicatorRange";
import { ModelsIndicatorEnum } from "@/apis/data-contracts";

export default function ProjectForm() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const user = useAppSelector((state: RootState) => state.auth.user);

    const emptyRange = { min: "", max: "" };
    const emptyIndicatorRange = { ok: emptyRange, alert: emptyRange, critical: emptyRange };

    const form = useForm<ProjectFormValues>({
        defaultValues: {
            name: "",
            description: "",
            members: [],
            colorSelect: undefined,
            indicatorRanges: {
                SpeedPerIteration: { ...emptyIndicatorRange },
                ReworkPerIteration: { ...emptyIndicatorRange },
                InstabilityIndex: { ...emptyIndicatorRange },
            },
        },
        resolver: zodResolver(projectSchema),
    });

    const mutation = useMutation({
        mutationFn: async (data: ProjectFormValues) => {
            const indicatorRangesArray = data.indicatorRanges
                ? Object.entries(data.indicatorRanges).map(([indicatorType, ranges]) => ({
                    indicator_type: indicatorType,
                    range: {
                        ok: {
                            min: parseFloat(ranges?.ok?.min || "0") || 0,
                            max: parseFloat(ranges?.ok?.max || "0") || 0,
                        },
                        alert: {
                            min: parseFloat(ranges?.alert?.min || "0") || 0,
                            max: parseFloat(ranges?.alert?.max || "0") || 0,
                        },
                        critical: {
                            min: parseFloat(ranges?.critical?.min || "0") || 0,
                            max: parseFloat(ranges?.critical?.max || "0") || 0,
                        },
                    },
                }))
                : [];

            const payload = {
                name: data.name,
                description: data.description,
                color: data.colorSelect,
                member_ids: data.members,
                indicator_ranges: indicatorRangesArray,
            };
            return await projectService.create(payload);
        },
        onSuccess: async () => {
            form.reset();
            if (user?.id) {
                await queryClient.refetchQueries({ queryKey: ["memberDetail", user.id] });
            }
            router.push("/projects");
        },
        onError: (error) => {
            console.error("Error creating project:", error);
        },
    });

    const onSubmit = (data: ProjectFormValues) => {
        mutation.mutate(data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full"
            >
                {/* Project Info Section */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center gap-3">
                                <FormLabel>Nome do projeto *</FormLabel>
                                <FormMessage />
                            </div>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    autoFocus
                                    placeholder="Digite o nome do projeto..."
                                    maxLength={62}
                                    className="border-none bg-transparent p-0 mt-2 min-h-2 min-w-100 text-3xl font-bold focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 shadow-none resize-none"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="colorSelect"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-4">
                                Defina uma cor para o seu projeto
                            </FormLabel>
                            <ColorSelector value={field.value ?? ""} onChange={field.onChange} />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="mt-6">
                            <div className="flex items-center gap-3 mb-2">
                                <FormLabel htmlFor="description">Descrição *</FormLabel>
                                <FormMessage />
                            </div>
                            <Textarea
                                {...field}
                                placeholder="Digite a descrição do projeto..."
                                className="min-h-20 resize-none !overflow-hidden"
                                id="description"
                            />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="members"
                    render={({ field }) => (
                        <MembersSelect
                            value={field.value || []}
                            onChange={field.onChange}
                            label="Membros do projeto *"
                        />
                    )}
                />
                <div className="mt-8">
                    <h3 className="text-sm font-bold text-[var(--disabled)] mb-4">
                        Faixas de Produtividade
                    </h3>

                    <div className="grid grid-cols-3 gap-4">
                        <IndicatorRange
                            indicatorType={ModelsIndicatorEnum.IndicatorSpeedPerIteration}
                        />
                        <IndicatorRange
                            indicatorType={ModelsIndicatorEnum.IndicatorReworkPerIteration}
                        />
                        <IndicatorRange
                            indicatorType={ModelsIndicatorEnum.IndicatorInstabilityIndex}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-4">
                    <Button
                        type="submit"
                        variant="default"
                        className="w-40"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Criando..." : "Criar"}
                    </Button>
                </div>

                {mutation.isError && (
                    <div className="mt-4 p-3 rounded-[12px] bg-red-100 border-2 border-red-500">
                        <p className="text-sm text-red-700 font-semibold text-center">
                            Erro ao criar projeto. Tente novamente.
                        </p>
                    </div>
                )}
            </form>
        </Form>
    );
}
