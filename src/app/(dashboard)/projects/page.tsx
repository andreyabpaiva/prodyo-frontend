import { ProfileChip, SideRail } from "@/components/dashboard/decor";
import { ProjectsGrid } from "@/components/dashboard/projects-grid";
import { mockData } from "@/data/mock";
import Link from "next/link";

export default function Projects() {
    const iterationCounter = mockData.iterations.reduce<Record<string, number>>((acc, iteration) => {
        acc[iteration.projectId] = (acc[iteration.projectId] ?? 0) + 1;
        return acc;
    }, {});

    return (
        <main className="relative min-h-screen bg-[var(--dark)] px-12 py-12 text-[var(--primary)]">
            <SideRail />
            <ProfileChip label="Admin" />

            <section className="flex flex-col gap-10">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.6em] text-[var(--divider)]">
                        Prodyo
                    </p>
                    <h1 className="mt-2 text-5xl font-extrabold">Projetos</h1>
                </div>

                <div className="mx-auto w-full max-w-2xl">
                    <div className="rounded-full border-[3px] border-[var(--primary)]/30 px-10 py-4 text-center text-sm font-semibold uppercase tracking-[0.6em] text-[var(--divider)]">
                        Buscar
                    </div>
                </div>

                <ProjectsGrid projects={mockData.projects} iterationCounter={iterationCounter} />
            </section>

            <Link
                href="/(access)/create-project"
                className="fixed right-6 top-6 rounded-full border-[3px] border-[var(--primary)] bg-[var(--primary)] px-6 py-2 text-sm font-bold uppercase tracking-[0.4em] text-[var(--dark)]"
            >
                + Novo projeto
            </Link>
        </main>
    );
}