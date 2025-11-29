import { IndicatorBoard } from "@/components/dashboard/indicator-board";
import { mockData } from "@/data/mock";
import { notFound } from "next/navigation";

type IndicatorsPageProps = {
    params: { projectId: string };
};

export default function ProjectIndicatorsPage({ params }: IndicatorsPageProps) {
    const project = mockData.getProjectById(params.projectId);
    if (!project) {
        notFound();
    }

    const iteration = mockData.getIterationsByProject(project.id)[0];
    const indicators = iteration ? mockData.getIndicatorsByIteration(iteration.id) : [];

    return (
        <main className="relative min-h-screen bg-[var(--dark)] px-12 py-12 text-[var(--primary)]">
                {/* <SideRail />
                <ProfileChip label="Admin" /> */}

            <header className="mb-12">
                <p className="text-sm font-semibold uppercase tracking-[0.6em] text-[var(--divider)]">
                    Prodyo
                </p>
                <h1 className="mt-2 text-5xl font-extrabold">Indicadores</h1>
            </header>

            <IndicatorBoard indicators={indicators} causes={mockData.causes} actions={mockData.actions} />
        </main>
    );
}


