import DeleteIterationForm from "@/components/forms/iteration/delete";
import { use } from "react";

type DeleteIterationPageProps = {
    params: Promise<{ projectId: string; iterationId: string }>;
};

export default function DeleteIterationPage({ params }: DeleteIterationPageProps) {
    const { projectId, iterationId } = use(params);

    return (
        <DeleteIterationForm
            projectId={projectId}
            iterationId={iterationId}
        />
    );
}

