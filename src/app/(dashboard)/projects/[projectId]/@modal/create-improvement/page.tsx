import { CreateImprovementForm } from "@/components/forms/improv";

type CreateImprovementPageProps = {
    searchParams: Promise<{ taskId?: string }>;
};

export default async function CreateImprovementPage({ searchParams }: CreateImprovementPageProps) {
    const { taskId } = await searchParams;

    return <CreateImprovementForm taskId={taskId || ""} />;
}

