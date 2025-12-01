"use client";

import { X, ChevronDown, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CreateImprovementModalProps = {
    projectId: string;
    taskId: string;
};

export function CreateImprovementModal({ projectId, taskId }: CreateImprovementModalProps) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState(10);

    const handleClose = () => {
        router.back();
    };

    const handleSubmit = () => {
        console.log({ name, description, points, projectId, taskId });
        router.back();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="absolute inset-0 bg-black/50" 
                onClick={handleClose}
            />
            
            <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] border-[3px] border-[var(--dark)] bg-[var(--primary)] px-10 py-8">
                <button
                    onClick={handleClose}
                    className="absolute right-6 top-6 text-[--dark] hover:opacity-70 transition-opacity cursor-pointer"
                >
                    <X size={24} strokeWidth={2.5} />
                </button>

                {/* <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--divider)] mb-6">
                    cadastro de melhoria
                </p> */}

                <div className="flex items-center gap-1">
                    <button className="flex items-center gap-2  py-2 text-sm font-semibold">
                        <UserRound size={16} />
                        Andreya
                        <ChevronDown size={16} />
                    </button>
                </div>

                <div className="mt-6 flex items-center">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Melhoria 1"
                        className="flex-1 bg-transparent text-3xl font-bold outline-none placeholder:text-[var(--dark)]"
                    />
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--alert)] border-[3px] border-[var(--dark)] text-sm font-bold text-[var(--dark)]">
                        <input
                            type="text"
                            inputMode="numeric"
                            value={points}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                setPoints(Number(value) || 0);
                            }}
                            className="w-6 bg-transparent text-center outline-none"
                        />
                    </div>
                </div>

                <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-6 h-36 w-full rounded-[16px] border-[3px] border-[var(--dark)] bg-[var(--modal)] px-6 py-4 text-md text-[var(--dark)] outline-none resize-none"
                />

                <div className="mt-6 flex justify-end">
                    <Button 
                        onClick={handleSubmit}
                        variant="default"
                    >
                        Criar Melhoria
                    </Button>
                </div>
            </div>
        </div>
    );
}

