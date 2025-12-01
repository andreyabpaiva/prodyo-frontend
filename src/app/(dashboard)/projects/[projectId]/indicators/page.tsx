import { IndicatorBoard } from "@/components/dashboard/indicator-board";
import { IterationSidebar } from "@/components/dashboard/iteration-sidebar";
import { mockData } from "@/data/mock";
import { notFound } from "next/navigation";

type IndicatorsPageProps = {
    params: { projectId: string };
    searchParams: { iteration?: string };
};

export default function ProjectIndicatorsPage({ params, searchParams }: IndicatorsPageProps) {
    const project = mockData.getProjectById(params.projectId);
    if (!project) {
        notFound();
    }

    const iterations = mockData.getIterationsByProject(project.id);
    const activeIterationId = searchParams.iteration || iterations[0]?.id;
    const iteration = iterations.find(i => i.id === activeIterationId) || iterations[0];
    const indicators = iteration ? mockData.getIndicatorsByIteration(iteration.id) : [];

    return (
        <>
            <IterationSidebar
                iterations={iterations}
                activeIterationId={activeIterationId}
                projectId={project.id}
            />
            <main className="ml-50 relative min-h-screen bg-[--dark] px-12 py-5 text-[--primary]">
                <header className="mb-8">
                    <h1 className="mt-2 text-4xl font-extrabold">Indicadores</h1>
                    <p className="mt-2 text-md text-[--divider]">Iteração {iteration?.number}</p>
                </header>

                <IndicatorBoard indicators={indicators} causes={mockData.causes} actions={mockData.actions} />
            </main>
        </>
    );
}


