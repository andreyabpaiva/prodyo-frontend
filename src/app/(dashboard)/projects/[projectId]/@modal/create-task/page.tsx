import { CreateTaskModal } from "@/components/dashboard/create-task-modal";

type CreateTaskPageProps = {
    params: Promise<{ projectId: string }>;
};

export default async function CreateTaskPage({ params }: CreateTaskPageProps) {
    const { projectId } = await params;

    return (
        <CreateTaskModal 
            projectId={projectId} 
        />
    );
}

