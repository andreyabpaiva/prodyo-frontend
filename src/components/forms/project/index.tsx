"use client";

import { useState } from "react";
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
import { ArrowRightIcon } from "lucide-react";

export default function ProjectForm() {
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const queryClient = useQueryClient();
    const user = useAppSelector((state: RootState) => state.auth.user);
    
    const form = useForm<ProjectFormValues>({
        defaultValues: {
            name: "",
            description: "",
            members: [],
            colorSelect: undefined,
            indicatorRanges: {
                [ModelsIndicatorEnum.IndicatorSpeedPerIteration]: {},
                [ModelsIndicatorEnum.IndicatorReworkPerIteration]: {},
                [ModelsIndicatorEnum.IndicatorInstabilityIndex]: {},
            },
        },
        resolver: zodResolver(projectSchema),
    });

    const mutation = useMutation({
        mutationFn: async (data: ProjectFormValues) => {
            const payload = {
                name: data.name,
                description: data.description,
                color: data.colorSelect,
                member_ids: data.members,
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

    const handleNext = async () => {
        const isValid = await form.trigger(["name", "description", "members", "colorSelect"]);
        if (isValid) {
            setCurrentPage(2);
        }
    };

    const handleBack = () => {
        setCurrentPage(1);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full px-30"
            >
                {currentPage === 1 && (
                    <>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Nome do projeto
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            autoFocus
                                            placeholder="Digite o nome do projeto..."
                                            maxLength={62}
                                            className="border-none bg-transparent p-0 my-2 min-h-2 min-w-100 text-3xl font-bold focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 shadow-none resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
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
                                    <FormLabel className="mb-4" htmlFor="description">
                                        Descrição
                                    </FormLabel>
                                    <Textarea
                                        {...field}
                                        placeholder="Descrição"
                                        className="min-h-20 resize-none !overflow-hidden"
                                        id="description"
                                    />
                                    <FormMessage />
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
                                    label="Membros do projeto"
                                />
                            )}
                        />

                        <div className="flex justify-center mt-5">
                            <Button 
                                type="button"
                                variant="default" 
                                className="w-40"
                                onClick={handleNext}
                            >
                                <ArrowRightIcon className="w-4 h-4" />
                                Próximo
                            </Button>
                        </div>
                    </>
                )}

                {currentPage === 2 && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">
                            Defina as faixas de produtividade
                        </h2>

                        <div className="flex flex-col gap-8">
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

                        <div className="flex justify-end gap-4 mt-8">
                            <Button 
                                type="button"
                                variant="secondary" 
                                className="w-40"
                                onClick={handleBack}
                            >
                                Voltar
                            </Button>
                            <Button 
                                type="submit"
                                variant="default" 
                                className="w-40"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? "Criando..." : "Criar"}
                            </Button>
                        </div>
                    </>
                )}
                
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
