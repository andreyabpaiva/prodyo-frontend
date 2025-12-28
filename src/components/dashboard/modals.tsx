"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Action, Cause, ProductivityLevel, Task, TaskStatus } from "@/types/domain";
import { ChevronDown, Plus, UserRound, X } from "lucide-react";
import { ReactNode, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user";
import type { ModelsUser } from "@/apis/data-contracts";
import { Command, CommandGroup, CommandItem, CommandList, CommandEmpty } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { UserSelect } from "../utils/UserSelect";
import z from "zod";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { indicatorService } from "@/services/indicator";

const levelClasses: Record<ProductivityLevel, string> = {
    OK: "bg-[var(--ok)] text-[var(--dark)]",
    ALERT: "bg-[var(--alert)] text-[var(--dark)]",
    CRITICAL: "bg-[var(--critic)] text-[var(--primary)]",
};

const statusClasses: Record<TaskStatus, string> = {
    NOT_STARTED: "bg-[#B8B8B8] text-[var(--dark)]",
    IN_PROGRESS: "bg-[#83B3FF] text-[var(--dark)]",
    COMPLETED: "bg-[var(--ok)] text-[var(--dark)]",
};

const actionSchema = z.object({
    assigneeId: z.string().min(1, "Responsável é obrigatório"),
    startDate: z.string().min(1, "Data de início é obrigatória"),
    endDate: z.string().min(1, "Data de término é obrigatória"),
    description: z.string().min(1, "Descrição é obrigatória"),
    cause_description: z.string().min(1, "Descrição da causa é obrigatória")
});

type ActionFormValues = z.infer<typeof actionSchema>;


function ModalCard({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <DialogContent
            className={`max-w-2xl rounded-[32px] border-[3px] border-[var(--dark)] bg-[var(--primary)] px-10 py-8 text-[var(--dark)] ${className}`}
        >
            {children}
        </DialogContent>
    );
}

// function ModalUserSelector() {
//     return (
//         <button className="flex items-center gap-2 rounded-full border-[3px] border-[var(--dark)] px-4 py-2 text-sm font-semibold">
//             <UserRound size={16} />
//             Andreya
//             <ChevronDown size={16} />
//         </button>
//     );
// }

function DescriptionArea({ placeholder = "Descrição" }: { placeholder?: string }) {
    return (
        <Textarea
            placeholder={placeholder}
            className="mt-4 h-50 rounded-2xl border-[3px] border-[var(--dark)] bg-[var(--background)] px-6 py-4 text-lg text-[var(--dark)]"
        />
    );
}

// export function ImprovementDialog({ trigger, title = "Melhoria 1" }: { trigger: ReactNode; title?: string }) {
//     return (
//         <Dialog>
//             <DialogTrigger asChild>{trigger}</DialogTrigger>
//             <ModalCard>
//                 <div className="flex items-start justify-between">
//                     <ModalUserSelector />
//                     <button className="rounded-full border-[3px] border-[var(--dark)] px-4 py-2 text-sm font-semibold">
//                         10
//                     </button>
//                 </div>
//                 <DialogHeader className="mt-6">
//                     <DialogTitle className="text-3xl font-bold">{title}</DialogTitle>
//                 </DialogHeader>
//                 <DescriptionArea />
//             </ModalCard>
//         </Dialog>
//     );
// }

// export function BugDialog({ trigger, title = "Bug 1" }: { trigger: ReactNode; title?: string }) {
//     return (
//         <Dialog>
//             <DialogTrigger asChild>{trigger}</DialogTrigger>
//             <ModalCard>
//                 <div className="flex items-start justify-between">
//                     <ModalUserSelector />
//                     <button className="rounded-full border-[3px] border-[var(--dark)] bg-[var(--critic)] px-4 py-2 text-sm font-bold text-[var(--primary)]">
//                         10
//                     </button>
//                 </div>
//                 <DialogHeader className="mt-6">
//                     <DialogTitle className="text-3xl font-bold">{title}</DialogTitle>
//                 </DialogHeader>
//                 <DescriptionArea />
//             </ModalCard>
//         </Dialog>
//     );
// }

export function CauseDialog({
    trigger,
    level,
    metricLabel,
    status = "NOT_STARTED",
    title = "Causa",
}: {
    trigger: ReactNode;
    level: ProductivityLevel;
    metricLabel: string;
    status?: TaskStatus;
    title?: string;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <ModalCard>
                <div className="flex items-start justify-between">
                    {/* <ModalUserSelector /> */}
                    <div className="flex gap-3">
                        <Badge className={`${levelClasses[level]} border-3 rounded-2xl border-[var(--dark)] px-6 text-sm font-bold`}>
                            {level === "CRITICAL" ? "CRÍTICO" : level === "ALERT" ? "ALERTA" : "OK"}
                        </Badge>
                        {/* <Badge className={`${statusClasses[status]} border-[3px] border-[var(--dark)] px-6 py-1 text-sm font-bold`}>
                            {status === "NOT_STARTED" ? "NÃO INICIADO" : status === "IN_PROGRESS" ? "EM PROGRESSO" : "FINALIZADO"}
                        </Badge> */}
                    </div>
                </div>

                <DialogHeader className="mt-6 space-y-2">
                    <DialogTitle className="text-3xl font-bold">{title}</DialogTitle>
                    <p className="text-sm font-semibold uppercase">
                        {metricLabel}
                    </p>
                </DialogHeader>

                <DescriptionArea />
            </ModalCard>
        </Dialog>
    );
}

export function ActionDialog({
    trigger,
    metricLabel,
    level = "CRITICAL",
}: {
    trigger: ReactNode;
    metricLabel: string;
    level?: ProductivityLevel;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <ModalCard className="max-w-3xl">
                <div className="flex items-start justify-between">
                    {/* <ModalUserSelector /> */}
                    <Badge className={`${levelClasses[level]} border-[3px] border-[var(--dark)] px-6 py-1 text-sm font-bold`}>
                        {level === "CRITICAL" ? "CRÍTICO" : level === "ALERT" ? "ALERTA" : "OK"}
                    </Badge>
                </div>

                <div className="mt-6 space-y-4">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-bold">Ação</DialogTitle>
                        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--divider)]">
                            {metricLabel}
                        </p>
                    </DialogHeader>

                    <div className="flex items-center gap-2 rounded-full border-2 border-[--dark] px-4 py-2">
                        <input
                            type="text"
                            placeholder="__/__/__"
                            maxLength={8}
                            className="w-20 bg-transparent text-center font-semibold outline-none"
                        />
                        <span className="font-semibold">à</span>
                        <input
                            type="text"
                            placeholder="__/__/__"
                            maxLength={8}
                            className="w-20 bg-transparent text-center font-semibold outline-none"
                        />
                    </div>
                </div>

                <DescriptionArea />
            </ModalCard>
        </Dialog>
    );
}

export function CauseActionDialog({
    trigger,
    metricLabel,
    level = "CRITICAL",
}: {
    trigger: ReactNode;
    metricLabel: string;
    level?: ProductivityLevel;
}) {

    const form = useForm<ActionFormValues>({
        resolver: zodResolver(actionSchema),
        defaultValues: {
            assigneeId: "",
            startDate: "",
            endDate: "",
            description: "",
            cause_description: "",
        },
    })

    const onSubmit = async (data: ActionFormValues) => {
        try {
            await indicatorService.createAction(data);
        }
        catch (error) {
            console.error("Error creating action and cause:", error);
            throw error;
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Dialog>
                    <DialogTrigger asChild>{trigger}</DialogTrigger>
                    <ModalCard className="max-w-2xl space-y-5">
                        <DialogHeader className="sr-only">
                            <DialogTitle>Adicionar Causa e Ação</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center justify-between">
                            <UserSelect
                                value={form.watch("assigneeId")}
                                onChange={(value) => form.setValue("assigneeId", value)}
                            />
                        </div>

                        <section className="space-y-2">
                            <div className="flex items-center gap-3">
                                <p className="text-2xl font-bold">Causa</p>
                                <Badge className={`${levelClasses[level]} border-3 border-[var(--dark)] rounded-2xl px-3 py-1 text-xs font-bold text-[var(--text)]`}>
                                    {level === "CRITICAL" ? "CRÍTICO" : level === "ALERT" ? "ALERTA" : "OK"}
                                </Badge>
                                <Badge className="border-[3px] bg-[var(--divider)] rounded-2xl border-[var(--dark)] px-4 py-1 text-xs font-bold">
                                    NÃO INICIADO
                                </Badge>
                            </div>
                            <p className="text-xs font-semibold">
                                {metricLabel}
                            </p>
                            <Textarea
                                {...form.register("cause_description")}
                                placeholder="Descrição"
                                className="mt-2 h-24 rounded-2xl border-[3px] border-[var(--dark)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--dark)]"
                            />
                        </section>

                        <section className="space-y-2">
                            <p className="text-2xl font-bold">Ação</p>
                            <p className="text-xs font-semibold">
                                {metricLabel}
                            </p>
                            <div className="inline-flex gap-2 rounded-full border-2 border-[var(--text)] px-4 py-2 w-auto">
                                <input
                                    {...form.register("startDate")}
                                    type="text"
                                    placeholder="__/__/__"
                                    onChange={() => { }}
                                    maxLength={8}
                                    className="w-20 bg-transparent text-center font-semibold outline-none"
                                />
                                <span className="font-semibold">à</span>
                                <input
                                    {...form.register("endDate")}
                                    type="text"
                                    placeholder="__/__/__"
                                    onChange={() => { }}
                                    maxLength={8}
                                    className="w-20 bg-transparent text-center font-semibold outline-none"
                                />
                            </div>
                            <Textarea
                                {...form.register("description")}
                                placeholder="Descrição"
                                className="mt-2 h-24 rounded-2xl border-[3px] border-[var(--dark)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--dark)]"
                            />
                        </section>
                    </ModalCard>
                    <Button
                        type="submit"
                        className="absolute bottom-6 right-6"
                    >
                        Salvar
                    </Button>
                </Dialog>
            </form>
        </Form>
    );
}

export function IndicatorAnalysisDialog({
    trigger,
    causes,
    actions,
}: {
    trigger: ReactNode;
    causes: Cause[];
    actions: Action[];
}) {
    const [openAssigneeId, setOpenAssigneeId] = useState<string | null>(null);

    const { data: usersResponse, isLoading: isLoadingUsers } = useQuery({
        queryKey: ["users"],
        queryFn: () => userService.list({ page_size: 100 }),
        enabled: false,
    });

    const users: ModelsUser[] = Array.isArray(usersResponse)
        ? usersResponse
        : (usersResponse?.data || []);

    const handleAssigneeSelect = (actionId: string, userId: string) => {
        // TODO: Implement API call to update action assignee
        console.log("Update action", actionId, "with assignee", userId);
        setOpenAssigneeId(null);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <ModalCard className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold">Análise do indicador</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 grid-cols-2 self-center">
                    {causes.map((cause) => (
                        <div
                            key={cause.id}
                            className={`max-w-full rounded-3xl border-3 border-[var(--dark)] p-4 bg-[var(--primary)] shadow-[0_4px_0_rgba(0,0,0,0.20)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[1px_1px_0px_rgba(0,0,0,0.25)]`}
                        >
                            <div className={`p-6 rounded-2xl ${levelClasses[cause.productivityLevel]}`}>
                                <p className="text-xl font-bold text-[var(--dark)]">Causa</p>
                                <p className="mt-1 text-sm text-[var(--dark)]">
                                    {cause.metric === "REWORK_INDEX"
                                        ? "ÍNDICE DE RETRABALHO"
                                        : cause.metric === "WORK_VELOCITY"
                                            ? "VELOCIDADE"
                                            : "ÍNDICE DE INSTABILIDADE"}
                                </p>
                            </div>
                        </div>
                    ))}
                    {actions.map((action) => (
                        <div
                            key={action.id}
                            className="max-w-full rounded-3xl border-3 border-[var(--dark)] px-4 pb-4 pt-2 bg-[var(--primary)] shadow-[0_4px_0_rgba(0,0,0,0.20)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[1px_1px_0px_rgba(0,0,0,0.25)]"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <Badge className="bg-[#B8B8B8] border-3 rounded-2xl border-[var(--dark)] text-xs font-bold text-[var(--dark)] whitespace-nowrap">
                                    {action.status === "NOT_STARTED"
                                        ? "NÃO INICIADO"
                                        : action.status === "IN_PROGRESS"
                                            ? "EM PROGRESSO"
                                            : "FINALIZADO"}
                                </Badge>

                                <div className="relative">
                                    <div
                                        className="flex items-center gap-2 rounded-full border-[2px] border-[var(--dark)] bg-[var(--primary)] px-3 py-1 cursor-pointer hover:bg-[var(--background)] transition-colors"
                                        onClick={() => setOpenAssigneeId(openAssigneeId === action.id ? null : action.id)}
                                    >
                                        <UserRound size={14} />
                                        <span className="text-xs font-semibold">
                                            {action.owner?.name || "Sem atribuição"}
                                        </span>
                                    </div>
                                    {openAssigneeId === action.id && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setOpenAssigneeId(null)}
                                            />
                                            <div className="absolute top-full right-0 mt-2 z-20 w-48 rounded-[12px] border-[3px] border-[var(--dark)] bg-[var(--primary)] shadow-lg max-h-60 overflow-y-auto">
                                                {isLoadingUsers ? (
                                                    <div className="px-4 py-2 text-sm text-[var(--disabled)]">
                                                        Carregando...
                                                    </div>
                                                ) : users.length === 0 ? (
                                                    <div className="px-4 py-2 text-sm text-[var(--disabled)]">
                                                        Nenhum usuário encontrado
                                                    </div>
                                                ) : (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAssigneeSelect(action.id, "")}
                                                            className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-[var(--background)] transition-colors ${!action.owner?.id ? "bg-[var(--modal)]" : ""}`}
                                                        >
                                                            Sem atribuição
                                                        </button>
                                                        {users.map((user) => (
                                                            <button
                                                                key={user.id}
                                                                type="button"
                                                                onClick={() => handleAssigneeSelect(action.id, user.id || "")}
                                                                className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-[var(--background)] transition-colors ${action.owner?.id === user.id ? "bg-[var(--modal)]" : ""}`}
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
                            </div>
                            <div className={`p-6 rounded-2xl bg-[var(--critic)]`}>
                                <p className="text-2xl font-bold">Ação</p>
                                <p className="mt-1 text-base font-bold uppercase tracking-wider">
                                    {action.indicatorId.includes("REWORK")
                                        ? "ÍNDICE DE RETRABALHO"
                                        : action.indicatorId.includes("VELOCITY")
                                            ? "VELOCIDADE"
                                            : "ÍNDICE DE INSTABILIDADE"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </ModalCard>
        </Dialog>
    );
}



