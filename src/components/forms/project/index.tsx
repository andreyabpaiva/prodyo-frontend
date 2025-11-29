"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ColorSelector } from "@/components/utils/ColorSelector";
import { MembersSelect } from "@/components/utils/MemberSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "./resolver";
import { projectService } from "@/services";

type ProjectFormValues = {
    name: string;
    colorSelect?: string;
    description: string;
    members: string[];
    prodRange: { ok: string; alert: string; critical: string };
};

export default function ProjectForm() {
    const form = useForm<ProjectFormValues>({
        defaultValues: {
            name: "",
            description: "",
            members: [],
            colorSelect: undefined,
            prodRange: { ok: "", alert: "", critical: "" },
        },
        resolver: zodResolver(projectSchema),
    });



    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(async (data) => {
                    console.log("Form Data:", data);
                    await projectService.create(data);
                })}
                className="flex flex-col w-full px-30"
            >
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

                <FormField
                    control={form.control}
                    name="prodRange"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-4 mt-4">
                            <FormLabel>
                                Defina numericamente as faixas de produtividade
                            </FormLabel>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <Badge
                                        variant="outline"
                                        className="bg-[var(--ok)] border-3 font-bold px-5 py-1 rounded-full min-w-[100px] text-center"
                                    >
                                        OK
                                    </Badge>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            className="rounded-full border-3 text-center h-8"
                                            value={field.value?.ok ?? ""}
                                            onChange={(e) =>
                                                field.onChange({
                                                    ...field.value,
                                                    ok: e.target.value,
                                                })
                                            }
                                        />
                                    </FormControl>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Badge
                                        variant="outline"
                                        className="bg-[var(--alert)] font-bold px-5 py-1 rounded-full min-w-[100px] text-center"
                                    >
                                        ALERTA
                                    </Badge>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            className="rounded-full border-3 text-center h-8"
                                            value={field.value?.alert ?? ""}
                                            onChange={(e) =>
                                                field.onChange({
                                                    ...field.value,
                                                    alert: e.target.value,
                                                })
                                            }
                                        />
                                    </FormControl>
                                </div>

                                {/* Faixa CRÍTICO */}
                                <div className="flex items-center gap-3">
                                    <Badge
                                        variant="outline"
                                        className="bg-[var(--critic)] border-3 font-bold px-5 py-1 rounded-full min-w-[100px] text-center"
                                    >
                                        CRÍTICO
                                    </Badge>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            className="flex-1 rounded-full border-3 text-center h-8"
                                            value={field.value?.critical ?? ""}
                                            onChange={(e) =>
                                                field.onChange({
                                                    ...field.value,
                                                    critical: e.target.value,
                                                })
                                            }
                                        />
                                    </FormControl>
                                </div>
                            </div>

                            <FormMessage />
                        </FormItem>
                    )}
                />


                <div className="flex justify-center mt-5">
                    <Button variant="default" className="w-40">Criar</Button>
                </div>
            </form>
        </Form>
    );
}
