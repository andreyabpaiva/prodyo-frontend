import IterationForm from "@/components/organisms/dashboard/forms/iteration-form/create";

type CreateIterationPageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function CreateIterationPage({
  params,
}: CreateIterationPageProps) {
  const { projectId } = await params;

  return <IterationForm projectId={projectId} />;
}
