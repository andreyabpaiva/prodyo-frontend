"use client";

import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TaskDraft = {
    id: string;
    name: string;
    description: string;
    points: number;
};

type CreateIterationModalProps = {
    projectId: string;
    iterationNumber: number;
};

export function CreateIterationModal({ projectId, iterationNumber }: CreateIterationModalProps) {
    const router = useRouter();
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [tasks, setTasks] = useState<TaskDraft[]>([]);

    const handleDateChange = (value: string, setter: (value: string) => void) => {
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
        
        setter(formatted);
    };

    const handleClose = () => {
        router.back();
    };

    // const handleAddTask = () => {
    //     const newTask: TaskDraft = {
    //         id: `temp-${Date.now()}`,
    //         name: "Tarefa 1",
    //         description: "Descrição descrição descrição descrição descrição descrição descrição descrição descrição descrição descrição descrição descrição",
    //         points: 1,
    //     };
    //     setTasks([...tasks, newTask]);
    // };

    const handleSubmit = () => {
        console.log({ description, startDate, endDate, tasks });
        router.back();
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

                <div className="flex items-center gap-4 mb-8">
                    <h1 className="text-3xl font-bold">Iteração {iterationNumber}</h1>
                    <div className="flex items-center gap-2 rounded-full border-2 border-[--dark] px-4 py-2">
                        <input
                            type="text"
                            placeholder="__/__/__"
                            value={startDate}
                            onChange={(e) => handleDateChange(e.target.value, setStartDate)}
                            maxLength={8}
                            className="w-20 bg-transparent text-center font-semibold outline-none"
                        />
                        <span className="font-semibold">à</span>
                        <input
                            type="text"
                            placeholder="__/__/__"
                            value={endDate}
                            onChange={(e) => handleDateChange(e.target.value, setEndDate)}
                            maxLength={8}
                            className="w-20 bg-transparent text-center font-semibold outline-none"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-32 rounded-[16px] border-[3px] border-[var(--dark)] bg-[var(--modal)] px-4 py-3 text-sm font-semibold outline-none resize-none"
                    />
                </div>

                {/* <div className="mb-6">
                    <Button 
                        variant="default"
                        onClick={handleAddTask}
                    >
                        <Plus strokeWidth={2.5} size={16} />
                        Adicionar tarefa
                    </Button>
                </div> */}

                {/* {tasks.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-2">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="relative rounded-[16px] border-[3px] border-[var(--dark)] bg-[#FFF3C4] p-4"
                            >
                                <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--dark)] text-sm font-bold text-[var(--primary)]">
                                    {task.points}
                                </div>
                                
                                <h3 className="font-bold mb-2">{task.name}</h3>
                                <p className="text-sm text-[var(--text)]">
                                    {task.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )} */}

                <div className="mt-8 flex justify-end">
                    <Button 
                        onClick={handleSubmit}
                        variant="default"
                    >
                        Criar Iteração
                    </Button>
                </div>
            </div>
        </div>
    );
}

