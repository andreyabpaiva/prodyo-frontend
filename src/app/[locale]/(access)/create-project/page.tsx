import ProjectForm from "@/components/organisms/access/forms/project-form";
import AccessTemplate from "@/components/templates/acces-template";

export default function CreateProjectPage() {
  return (
    <AccessTemplate variant="createProject">
      <ProjectForm />
    </AccessTemplate>
  );
}
