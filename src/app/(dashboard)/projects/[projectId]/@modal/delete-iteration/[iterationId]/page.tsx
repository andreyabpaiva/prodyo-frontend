import { use } from "react";
import { DeleteIterationModal } from "@/components/dashboard/delete-iteration-modal";

type DeleteIterationPageProps = {
    params: Promise<{ projectId: string; iterationId: string }>;
};

export default function DeleteIterationPage({ params }: DeleteIterationPageProps) {
    const { projectId, iterationId } = use(params);

    return (
        <DeleteIterationModal 
            projectId={projectId} 
            iterationId={iterationId}
        />
    );
}

