import { CreateIterationModal } from "@/components/dashboard/create-iteration-modal";
import { mockData } from "@/data/mock";

type CreateIterationPageProps = {
    params: Promise<{ projectId: string }>;
};

export default async function CreateIterationPage({ params }: CreateIterationPageProps) {
    const { projectId } = await params;
    
    const iterations = mockData.getIterationsByProject(projectId);
    const nextIterationNumber = iterations.length + 1;

    return (
        <CreateIterationModal 
            projectId={projectId} 
            iterationNumber={nextIterationNumber} 
        />
    );
}

