import { ProjectsGrid } from "@/components/dashboard/projects-grid";
import { mockData } from "@/data/mock";

export default function Projects() {
    const iterationCounter = mockData.iterations.reduce<Record<string, number>>((acc, iteration) => {
        acc[iteration.projectId] = (acc[iteration.projectId] ?? 0) + 1;
        return acc;
    }, {});

    return (
        <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--text)]">
            <div className="mx-auto w-full max-w-7xl">
                <div className="mt-6 flex justify-center">
                    <input
                        placeholder="Buscar"
                        className="w-full max-w-xs rounded-[15px] border-[3px] border-[var(--dark)] bg-[var(--background)] px-5 py-2 text-left text-sm font-semibold text-[var(--disabled)] outline-none"
                    />
                </div>

                <div className="mt-8">
                    <ProjectsGrid projects={mockData.projects} iterationCounter={iterationCounter} />
                </div>
            </div>
        </main>
    );
}