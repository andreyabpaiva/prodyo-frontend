import CreateTaskForm from "@/components/organisms/dashboard/forms/task-form";

type CreateTaskPageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function CreateTaskPage({ params }: CreateTaskPageProps) {
  const { projectId } = await params;

  return <CreateTaskForm projectId={projectId} />;
}
