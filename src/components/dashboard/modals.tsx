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
                        {/* <Badge className={`${levelClasses[level]} border-3 rounded-2xl border-[var(--dark)] px-6 text-sm font-bold`}>
                            {level === "CRITICAL" ? "CRÍTICO" : level === "ALERT" ? "ALERTA" : "OK"}
                        </Badge> */}
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





