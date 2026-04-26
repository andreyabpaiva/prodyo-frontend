"use client";
import ProjectForm from "@/components/organisms/access/forms/project-form";
import TypeWriterComponent from "@/components/molecules/prodyo-type-writer";
import { MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Welcome from "@/components/organisms/access/views/welcome";

export default function CreateProject() {
  const tProject = useTranslations("CreateProject");
  const tCommon = useTranslations("Common");

  return (
    <div className="flex min-h-screen">
      <Welcome title={tProject("heading")} subtitle={tCommon("fillInfo")} />
      <div className="w-1/2 bg-background text-text flex items-center justify-center">
        <div className="w-full max-w-3xl px-18 py-2">
          <ProjectForm />
        </div>
      </div>
    </div>
  );
}
