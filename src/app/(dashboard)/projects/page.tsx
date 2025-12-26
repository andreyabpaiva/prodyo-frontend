"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProjectsGrid } from "@/components/dashboard/projects-grid";
import { projectService } from "@/services/project";
import { useAppSelector } from "@/store/hooks";
import type { RootState } from "@/store/store";
import { Input } from "@/components/ui/input";

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