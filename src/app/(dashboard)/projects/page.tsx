"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProjectsGrid } from "@/components/dashboard/projects-grid";
import { projectService } from "@/services/project";
import { useAppSelector } from "@/store/hooks";
import type { RootState } from "@/store/store";
import { Input } from "@/components/ui/input";

export default function Projects() {
    const [search, setSearch] = useState("");
    const user = useAppSelector((state: RootState) => state.auth.user);
    
    const { data: memberDetail, isLoading, error, isFetched } = useQuery({
        queryKey: ["memberDetail", user?.id],
        queryFn: () => {
            if (!user?.id) {
                throw new Error("User ID is required");
            }
            return projectService.memberDetail({
                userId: user.id,
                page: 1,
                page_size: 20,
            });
        },
        enabled: !!user?.id,
    });
    
    const projects = memberDetail?.data || memberDetail?.projects || (Array.isArray(memberDetail) ? memberDetail : []);

    const filteredProjects = useMemo(() => {
        if (!search.trim()) return projects;
        
        const searchLower = search.toLowerCase();
        return projects.filter((project: any) => 
            project.name?.toLowerCase().includes(searchLower) ||
            project.description?.toLowerCase().includes(searchLower)
        );
    }, [projects, search]);

    return (
        <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--text)]">
            <div className="mx-auto w-full max-w-7xl">
                <div className="mt-2 flex justify-center">
                    <Input
                        placeholder="Buscar projeto..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-xs rounded-20 border-3 border-[var(--dark)] px-5 py-2 text-left text-sm font-semibold outline-none"
                    />
                </div>

                <div className="mt-8">
                    <ProjectsGrid 
                        projects={filteredProjects} 
                        isLoading={isLoading}
                        error={error}
                        isFetched={isFetched}
                    />
                </div>
            </div>
        </main>
    );
}