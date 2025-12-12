"use client";

import { useQuery } from "@tanstack/react-query";
import { ProjectsGrid } from "@/components/dashboard/projects-grid";
import { projectService } from "@/services/project";
import { useAppSelector } from "@/store/hooks";
import type { RootState } from "@/store/store";

export default function Projects() {
    const user = useAppSelector((state: RootState) => state.auth.user);
    
    const { data: memberDetail, isLoading, error } = useQuery({
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

    return (
        <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--text)]">
            <div className="mx-auto w-full max-w-7xl">
                <div className="mt-6 flex justify-center">
                    <input
                        placeholder="Buscar"
                        className="w-full max-w-xs rounded-[15px] border-[3px] border-[var(--dark)] bg-[var(--background)] px-5 py-2 text-left text-sm font-semibold text-[var(--disabled)] outline-none"
                    />
                </div>

                <div className="mt-8">
                    <ProjectsGrid 
                        projects={projects} 
                        isLoading={isLoading}
                        error={error}
                    />
                </div>
            </div>
        </main>
    );
}