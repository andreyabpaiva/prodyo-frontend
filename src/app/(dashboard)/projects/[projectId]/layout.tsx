"use client";

import { ReactNode, use } from "react";
import { IterationSidebar } from "@/components/dashboard/iteration-sidebar";
import { useQuery } from "@tanstack/react-query";
import { iterationService } from "@/services/iteration";
import { usePathname } from "next/navigation";

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

    // Only show sidebar on specific routes
    const showSidebar = pathname?.includes('/indicators') || pathname?.endsWith(projectId);

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