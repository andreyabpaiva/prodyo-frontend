"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Action, Cause, ProductivityLevel, Task, TaskStatus } from "@/types/domain";
import { ChevronDown, Plus, UserRound } from "lucide-react";
import { ReactNode, useState } from "react";

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

function ModalCard({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <DialogContent
            className={`max-w-2xl rounded-[32px] border-[3px] border-[var(--dark)] bg-[var(--primary)] px-10 py-8 text-[var(--dark)] ${className}`}
        >
            {children}
        </DialogContent>
    );
}

function ModalUserSelector() {
    return (
        <button className="flex items-center gap-2 rounded-full border-[3px] border-[var(--dark)] px-4 py-2 text-sm font-semibold">
            <UserRound size={16} />
            Andreya
            <ChevronDown size={16} />
        </button>
    );
}

function DescriptionArea({ placeholder = "Descrição" }: { placeholder?: string }) {
    return (
        <Textarea
            placeholder={placeholder}
            className="mt-4 h-36 rounded-[32px] border-[3px] border-[var(--dark)] bg-[#d9d9d9] px-6 py-4 text-lg text-[var(--dark)]"
        />
    );
}

export function ImprovementDialog({ trigger, title = "Melhoria 1" }: { trigger: ReactNode; title?: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <ModalCard>
                <div className="flex items-start justify-between">
                    <ModalUserSelector />
                    <button className="rounded-full border-[3px] border-[var(--dark)] px-4 py-2 text-sm font-semibold">
                        10
                    </button>
                </div>
                <DialogHeader className="mt-6">
                    <DialogTitle className="text-3xl font-bold">{title}</DialogTitle>
                </DialogHeader>
                <DescriptionArea />
            </ModalCard>
        </Dialog>
    );
}

export function BugDialog({ trigger, title = "Bug 1" }: { trigger: ReactNode; title?: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <ModalCard>
                <div className="flex items-start justify-between">
                    <ModalUserSelector />
                    <button className="rounded-full border-[3px] border-[var(--dark)] bg-[var(--critic)] px-4 py-2 text-sm font-bold text-[var(--primary)]">
                        10
                    </button>
                </div>
                <DialogHeader className="mt-6">
                    <DialogTitle className="text-3xl font-bold">{title}</DialogTitle>
                </DialogHeader>
                <DescriptionArea />
            </ModalCard>
        </Dialog>
    );
}

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
                    <ModalUserSelector />
                    <div className="flex gap-3">
                        <Badge className={`${levelClasses[level]} border-[3px] border-[var(--dark)] px-6 py-1 text-sm font-bold`}>
                            {level === "CRITICAL" ? "CRÍTICO" : level === "ALERT" ? "ALERTA" : "OK"}
                        </Badge>
                        <Badge className={`${statusClasses[status]} border-[3px] border-[var(--dark)] px-6 py-1 text-sm font-bold`}>
                            {status === "NOT_STARTED" ? "NÃO INICIADO" : status === "IN_PROGRESS" ? "EM PROGRESSO" : "FINALIZADO"}
                        </Badge>
                    </div>
                </div>

                <div className="mt-6 space-y-2">
                    <p className="text-3xl font-bold">{title}</p>
                    <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--divider)]">
                        {metricLabel}
                    </p>
                </div>

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
                    <ModalUserSelector />
                    <Badge className={`${levelClasses[level]} border-[3px] border-[var(--dark)] px-6 py-1 text-sm font-bold`}>
                        {level === "CRITICAL" ? "CRÍTICO" : level === "ALERT" ? "ALERTA" : "OK"}
                    </Badge>
                </div>

                <div className="mt-6 space-y-4">
                    <div>
                        <p className="text-3xl font-bold">Ação</p>
                        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--divider)]">
                            {metricLabel}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Input
                            placeholder="__/__/__"
                            className="rounded-full border-[3px] border-[var(--dark)] px-6 py-3 text-center text-lg font-bold"
                        />
                        <span className="text-2xl font-bold">à</span>
                        <Input
                            placeholder="__/__/__"
                            className="rounded-full border-[3px] border-[var(--dark)] px-6 py-3 text-center text-lg font-bold"
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
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <ModalCard className="max-w-3xl space-y-6">
                <div className="flex items-center justify-between">
                    <ModalUserSelector />
                    <Badge className={`${levelClasses[level]} border-[3px] border-[var(--dark)] px-6 py-1 text-sm font-bold`}>
                        {level === "CRITICAL" ? "CRÍTICO" : level === "ALERT" ? "ALERTA" : "OK"}
                    </Badge>
                </div>

                <section className="space-y-3">
                    <div className="flex items-center gap-3">
                        <p className="text-3xl font-bold">Causa</p>
                        <Badge className="bg-[#B8B8B8] border-[3px] border-[var(--dark)] px-6 py-1 text-sm font-bold">
                            NÃO INICIADO
                        </Badge>
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--divider)]">
                        {metricLabel}
                    </p>
                    <DescriptionArea />
                </section>

                <section className="space-y-3">
                    <p className="text-3xl font-bold">Ação</p>
                    <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--divider)]">
                        ÍNDICE DE INSTABILIDADE
                    </p>
                    <div className="flex items-center gap-4">
                        <Input
                            placeholder="__/__/__"
                            className="rounded-full border-[3px] border-[var(--dark)] px-6 py-3 text-center text-lg font-bold"
                        />
                        <span className="text-2xl font-bold">à</span>
                        <Input
                            placeholder="__/__/__"
                            className="rounded-full border-[3px] border-[var(--dark)] px-6 py-3 text-center text-lg font-bold"
                        />
                    </div>
                    <DescriptionArea />
                </section>
            </ModalCard>
        </Dialog>
    );
}

export function TaskDetailsDialog({ trigger, task }: { trigger: ReactNode; task: Task }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <ModalCard className="max-w-4xl space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Badge className="bg-[#B8B8B8] border-[3px] border-[var(--dark)] px-6 py-1 text-sm font-bold">
                            {task.status === "NOT_STARTED"
                                ? "NÃO INICIADO"
                                : task.status === "IN_PROGRESS"
                                    ? "EM PROGRESSO"
                                    : "FINALIZADO"}
                        </Badge>
                        <ModalUserSelector />
                    </div>
                    <Badge className="rounded-full border-[3px] border-[var(--dark)] px-4 py-1 text-base font-bold">
                        {task.points}
                    </Badge>
                </div>

                <div>
                    <p className="text-4xl font-bold">{task.name}</p>
                    <p className="mt-2 text-lg text-[var(--divider)]">{task.description}</p>
                </div>

                <section className="space-y-4">
                    <p className="text-lg font-semibold uppercase tracking-[0.3em] text-[var(--divider)]">
                        Descrição
                    </p>
                    <DescriptionArea />
                </section>

                <div className="flex flex-wrap gap-4">
                    <ImprovementDialog
                        trigger={
                            <Button className="rounded-full border-[3px] border-[var(--dark)] bg-[var(--alert)] text-[var(--dark)]">
                                <Plus />
                                Adicionar melhoria
                            </Button>
                        }
                        title="Melhoria 1"
                    />
                    <BugDialog
                        trigger={
                            <Button className="rounded-full border-[3px] border-[var(--dark)] bg-[var(--critic)] text-[var(--primary)]">
                                <Plus />
                                Adicionar bug
                            </Button>
                        }
                        title="Bug 1"
                    />
                </div>

                <section className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3 rounded-[28px] border-[3px] border-[var(--dark)] bg-[var(--alert)] p-6">
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-bold">Melhoria 1</p>
                            <Badge className="rounded-full border-[3px] border-[var(--dark)] bg-[var(--primary)] px-3 py-0.5 text-xs font-bold">
                                {task.improvements.length}
                            </Badge>
                        </div>
                        <p className="text-sm text-[var(--dark)]">
                            Descrição descrição descrição descrição descrição descrição
                        </p>
                    </div>

                    <div className="space-y-3 rounded-[28px] border-[3px] border-[var(--dark)] bg-[var(--critic)] p-6 text-[var(--primary)]">
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-bold">Bug 1</p>
                            <Badge className="rounded-full border-[3px] border-[var(--dark)] bg-[var(--primary)] px-3 py-0.5 text-xs font-bold text-[var(--dark)]">
                                {task.bugs.length}
                            </Badge>
                        </div>
                        <p className="text-sm">
                            Descrição descrição descrição descrição descrição descrição
                        </p>
                    </div>
                </section>
            </ModalCard>
        </Dialog>
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
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <ModalCard className="max-w-3xl space-y-6">
                <DialogHeader>
                    <DialogTitle className="text-4xl font-bold">Análise do indicador</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 md:grid-cols-2">
                    {causes.map((cause) => (
                        <div
                            key={cause.id}
                            className={`rounded-[24px] border-[3px] border-[var(--dark)] p-5 text-[var(--dark)] ${levelClasses[cause.productivityLevel]}`}
                        >
                            <p className="text-xl font-bold">Causa</p>
                            <p className="text-sm font-semibold uppercase tracking-[0.4em]">
                                {cause.metric === "REWORK_INDEX"
                                    ? "ÍNDICE DE RETRABALHO"
                                    : cause.metric === "WORK_VELOCITY"
                                        ? "VELOCIDADE"
                                        : "ÍNDICE DE INSTABILIDADE"}
                            </p>
                            <p className="mt-2 text-sm">{cause.description}</p>
                        </div>
                    ))}
                    {actions.map((action) => (
                        <div
                            key={action.id}
                            className="rounded-[24px] border-[3px] border-[var(--dark)] bg-[var(--critic)] p-5 text-[var(--primary)]"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-xl font-bold">Ação</p>
                                <Badge className="bg-[#B8B8B8] border-[3px] border-[var(--dark)] px-5 py-1 text-xs font-bold text-[var(--dark)]">
                                    {action.status === "NOT_STARTED"
                                        ? "NÃO INICIADO"
                                        : action.status === "IN_PROGRESS"
                                            ? "EM PROGRESSO"
                                            : "FINALIZADO"}
                                </Badge>
                            </div>
                            <p className="text-sm font-semibold uppercase tracking-[0.4em]">
                                ÍNDICE DE INSTABILIDADE
                            </p>
                            <div className="mt-3 flex items-center gap-2 rounded-full border-[3px] border-[var(--primary)] px-4 py-1 text-sm font-semibold">
                                <UserRound size={16} />
                                {action.owner.name}
                            </div>
                        </div>
                    ))}
                </div>
            </ModalCard>
        </Dialog>
    );
}

export function CreateTaskDialog({
    trigger,
    onSubmit,
}: {
    trigger: ReactNode;
    onSubmit?: (task: { name: string; description: string; points: number; status: TaskStatus }) => void;
}) {
    const [name, setName] = useState("Tarefa 1");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState(10);
    const [status, setStatus] = useState<TaskStatus>("NOT_STARTED");
    const [open, setOpen] = useState(false);

    const handleSubmit = () => {
        onSubmit?.({ name, description, points, status });
        setOpen(false);
        setName("Tarefa 1");
        setDescription("");
        setPoints(10);
        setStatus("NOT_STARTED");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <ModalCard>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--divider)] mb-4">
                    cadastro de tarefa
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Badge className={`${statusClasses[status]} border-[3px] border-[var(--dark)] px-6 py-1 text-sm font-bold`}>
                            {status === "NOT_STARTED"
                                ? "NÃO INICIADO"
                                : status === "IN_PROGRESS"
                                    ? "EM PROGRESSO"
                                    : "FINALIZADO"}
                        </Badge>
                        <ModalUserSelector />
                    </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 border-none bg-transparent p-0 text-3xl font-bold outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Nome da tarefa"
                    />
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--dark)] text-sm font-bold text-[var(--primary)]">
                        <input
                            type="number"
                            value={points}
                            onChange={(e) => setPoints(Number(e.target.value) || 0)}
                            className="w-6 bg-transparent text-center outline-none"
                            min={0}
                        />
                    </div>
                </div>

                <Textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-4 h-36 rounded-[16px] border-[3px] border-[var(--dark)] bg-[#d9d9d9] px-6 py-4 text-lg text-[var(--dark)]"
                />

                <div className="mt-6 flex justify-end">
                    <Button
                        onClick={handleSubmit}
                        className="rounded-full border-[3px] border-[var(--dark)] bg-[var(--dark)] px-6 py-2 text-sm font-bold text-[var(--primary)]"
                    >
                        Criar Tarefa
                    </Button>
                </div>
            </ModalCard>
        </Dialog>
    );
}


