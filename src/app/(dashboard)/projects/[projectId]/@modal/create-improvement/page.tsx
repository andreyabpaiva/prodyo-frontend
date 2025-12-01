import { CreateImprovementModal } from "@/components/dashboard/create-improvement-modal";

type CreateImprovementPageProps = {
    params: Promise<{ projectId: string }>;
    searchParams: Promise<{ taskId?: string }>;
};

export default async function CreateImprovementPage({ params, searchParams }: CreateImprovementPageProps) {
    const { projectId } = await params;
    const { taskId } = await searchParams;

    return (
        <CreateImprovementModal 
            projectId={projectId}
            taskId={taskId || ""}
        />
    );
}

