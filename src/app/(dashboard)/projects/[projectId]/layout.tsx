"use client";

import { ReactNode, use } from "react";
import { useQuery } from "@tanstack/react-query";
import { iterationService } from "@/services/iteration";
import { usePathname } from "next/navigation";
import { IterationSidebar } from "@/components/layout/sidebar";

export default function Layout({
    children,
    modal,
    params,
}: {
    children: ReactNode;
    modal: ReactNode;
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = use(params);
    const pathname = usePathname();

    // Fetch iterations for the project
    const { data: iterations } = useQuery({
        queryKey: ["iterations", projectId],
        queryFn: () => iterationService.list({ project_id: projectId }),
        enabled: !!projectId,
    });

    const showSidebar = pathname?.includes('/projects')  || pathname.includes('indicators') || pathname?.endsWith(projectId);

    return (
        <>
            {showSidebar && iterations && (
                <IterationSidebar
                    iterations={iterations}
                    projectId={projectId}
                />
            )}
            {children}
            {modal}
        </>
    );
}