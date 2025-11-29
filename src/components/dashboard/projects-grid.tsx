import Link from "next/link";
import { Project } from "@/types/domain";

function ProjectCard({ project, iterationCount }: { project: Project; iterationCount?: number }) {
    return (
        <Link href={`/projects/${project.id}`}>
            <article className="rounded-[32px] border-[3px] border-[var(--dark)] bg-[var(--primary)] p-4 shadow-[6px_6px_0px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-1">
                <div
                    className="rounded-[28px] border-[3px] border-[var(--dark)] px-6 py-10 text-[var(--text)]"
                    style={{ backgroundColor: project.color }}
                >
                    <p className="text-xl font-semibold">{project.name}</p>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.3em]">
                        {iterationCount ?? 0} iterações
                    </p>
                </div>
            </article>
        </Link>
    );
}

type ProjectsGridProps = {
    projects: Project[];
    iterationCounter?: Record<string, number>;
};

export function ProjectsGrid({ projects, iterationCounter }: ProjectsGridProps) {
    return (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} iterationCount={iterationCounter?.[project.id] ?? 0} />
            ))}
        </div>
    );
}

