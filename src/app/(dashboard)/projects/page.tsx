"use client";

import { ProjectsGrid } from "@/components/dashboard/grid/ProjectsGrid";

export default function Projects() {

    return (
        <main className="min-h-screen bg-[var(--background)] p-4 text-[var(--text)]">
            <div className="mx-auto w-full max-w-7xl">
                <div>
                    <ProjectsGrid />
                </div>
            </div>
        </main>
    );
}