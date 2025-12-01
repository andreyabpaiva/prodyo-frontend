import { mockData } from "@/data/mock";
import { notFound } from "next/navigation";
import { IterationBoard } from "@/components/dashboard/iteration-board";

type ProjectDetailProps = {
    params: { projectId: string };
};

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
    const project = mockData.getProjectById(params.projectId);

    if (!project) {
        notFound();
    }

    const iterations = mockData.getIterationsByProject(project.id);
    const tasksByIteration = iterations.reduce<Record<string, ReturnType<typeof mockData.getTasksByIteration>>>((acc, iteration) => {
        acc[iteration.id] = mockData.getTasksByIteration(iteration.id);
        return acc;
    }, {});

    return (
        <main className="min-h-screen bg-[--background] text-[--text]">
            <IterationBoard projectId={project.id} iterations={iterations} tasksByIteration={tasksByIteration} />
        </main>
    );
}


