import CreateBugForm from "@/components/forms/bug";

type CreateBugPageProps = {
    searchParams: Promise<{ taskId?: string }>;
};

export default async function CreateBugPage({ searchParams }: CreateBugPageProps) {
    const { taskId } = await searchParams;

    return  <CreateBugForm taskId={taskId || ""} />;
}

