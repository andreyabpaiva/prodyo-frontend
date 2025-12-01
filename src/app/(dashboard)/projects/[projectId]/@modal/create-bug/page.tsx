import { CreateBugModal } from "@/components/dashboard/create-bug-modal";

type CreateBugPageProps = {
    params: Promise<{ projectId: string }>;
    searchParams: Promise<{ taskId?: string }>;
};

export default async function CreateBugPage({ params, searchParams }: CreateBugPageProps) {
    const { projectId } = await params;
    const { taskId } = await searchParams;

    return (
        <CreateBugModal 
            projectId={projectId}
            taskId={taskId || ""}
        />
    );
}

