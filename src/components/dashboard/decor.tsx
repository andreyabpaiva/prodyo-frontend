import { ChevronDown, ChevronUp, Minus, UserRound } from "lucide-react";

export function SideRail() {
    return (
        <div className="fixed left-4 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 text-[var(--primary)] lg:flex">
            <button className="rounded-full border-[3px] border-[var(--primary)] bg-[var(--dark)] p-2 text-[var(--primary)]">
                <ChevronUp size={18} />
            </button>
            <div className="flex flex-col items-center gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Minus key={index} className="text-[var(--primary)]" strokeWidth={3} />
                ))}
            </div>
            <button className="rounded-full border-[3px] border-[var(--primary)] bg-[var(--dark)] p-2 text-[var(--primary)]">
                <ChevronDown size={18} />
            </button>
        </div>
    );
}

export function ProfileChip({ label = "Admin" }: { label?: string }) {
    return (
        <div className="fixed left-6 bottom-6 flex items-center gap-2 rounded-full border-[3px] border-[var(--dark)] bg-[var(--primary)] px-6 py-2 text-lg font-semibold">
            <UserRound strokeWidth={2.5} />
            {label}
        </div>
    );
}


