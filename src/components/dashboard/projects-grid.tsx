"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ModelsProject } from "@/apis/data-contracts";

interface ProjectWithIterations extends ModelsProject {
    iterations_count?: number;
}

function ProjectCard({ project }: { project: ProjectWithIterations }) {
    if (!project.id) return null;

    return (
        <Link href={`/projects/${project.id}`}>
            <article className="rounded-[15px] border-[3px] border-[var(--dark)] bg-[var(--primary)] p-4 shadow-[6px_6px_0px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-1">
                <div
                    className="rounded-[12px] border-[3px] border-[var(--dark)] px-6 py-10 text-[var(--text)]"
                    style={{ backgroundColor: project.color || "#B9FF94" }}
                >
                    <p className="text-xl font-semibold">{project.name || "Sem nome"}</p>
                    <p className="mt-1 text-sm font-semibold uppercase text-[var(--disabled)]">
                        {project.iterations_count || 0} iterações
                    </p>
                </div>
            </article>
        </Link>
    );
}

type ProjectsGridProps = {
    projects: ProjectWithIterations[];
    isLoading?: boolean;
    error?: Error | null;
};

export function ProjectsGrid({ projects, isLoading, error }: ProjectsGridProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const showLoading = mounted && isLoading && (!projects || projects.length === 0);

    if (showLoading) {
        return (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="rounded-[15px] border-[3px] border-[var(--dark)] bg-[var(--primary)] p-4 animate-pulse"
                    >
                        <div className="rounded-[12px] border-[3px] border-[var(--dark)] px-6 py-10 bg-gray-200 h-32" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500">Erro ao carregar projetos: {error.message}</p>
            </div>
        );
    }

    if (!projects || projects.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-[var(--disabled)]">Nenhum projeto encontrado</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}

