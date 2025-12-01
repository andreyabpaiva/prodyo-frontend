import { Iteration } from "@/types/domain";
import { ChevronDown, ChevronUp } from "lucide-react";

export function IterationTimeline({ iterations, currentId }: { iterations: Iteration[]; currentId?: string }) {
    return (
        <aside className="flex flex-col items-center gap-4 text-[--primary]">
            <button className="rounded-full border-[3px] border-[--primary] p-2 text-[--primary]">
                <ChevronUp />
            </button>
            <div className="relative flex flex-col items-center gap-5">
                <span className="absolute left-1/2 top-0 -z-10 h-full w-[3px] -translate-x-1/2 bg-[--primary]/30" />
                {iterations.map((iteration) => {
                    const isActive = iteration.id === currentId;
                    return (
                        <div
                            key={iteration.id}
                            className={`flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[--primary] text-lg font-bold ${isActive ? "bg-[--primary] text-[--dark]" : ""
                                }`}
                        >
                            {iteration.number}
                        </div>
                    );
                })}
            </div>
            <button className="rounded-full border-[3px] border-[--primary] p-2 text-[--primary]">
                <ChevronDown />
            </button>
        </aside>
    );
}


