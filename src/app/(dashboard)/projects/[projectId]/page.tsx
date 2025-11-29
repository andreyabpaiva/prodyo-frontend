import { IterationTimeline } from "@/components/dashboard/iteration-timeline";
import { ProfileChip, SideRail } from "@/components/dashboard/decor";
import { TaskBoard } from "@/components/dashboard/task-board";
import { mockData } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { notFound } from "next/navigation";

type ProjectDetailProps = {
    params: { projectId: string };
};

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
    const project = mockData.getProjectById(params.projectId);

    if (!project) {
        notFound();
    }

    const iterations = mockData.getIterationsByProject(project.id);
    const currentIteration = iterations[0];
    const tasks = currentIteration ? mockData.getTasksByIteration(currentIteration.id) : [];

    return (
        <main className="relative min-h-screen bg-[var(--dark)] px-12 py-12 text-[var(--primary)]">
            <SideRail />
            <ProfileChip label="Admin" />

            <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.6em] text-[var(--divider)]">
                        Projeto
                    </p>
                    <h1 className="mt-2 text-5xl font-extrabold">{project.name}</h1>
                    <p className="mt-2 max-w-2xl text-sm text-[var(--divider)]">{project.description}</p>
                </div>
                <Button className="rounded-full border-[3px] border-[var(--dark)] bg-[var(--primary)] text-[var(--dark)]">
                    <Plus />
                    Adicionar tarefa
                </Button>
            </header>

            <div className="flex flex-col gap-10 lg:flex-row">
                <IterationTimeline iterations={iterations} currentId={currentIteration?.id} />
                <TaskBoard tasks={tasks} />
            </div>
        </main>
    );
}


