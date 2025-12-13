import { CreateIterationModal } from "@/components/dashboard/create-iteration-modal";

type CreateIterationPageProps = {
    params: Promise<{ projectId: string }>;
};

export default async function CreateIterationPage({ params }: CreateIterationPageProps) {
    const { projectId } = await params;

    return (
        <CreateIterationModal 
            projectId={projectId} 
        />
    );
}

