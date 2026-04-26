"use client";
import ProjectForm from "@/components/organisms/project-form";
import TypeWriterComponent from "@/components/molecules/type-writer";
import { MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CreateProject() {
  const tProject = useTranslations("CreateProject");
  const tCommon = useTranslations("Common");

  return (
    <div className="flex min-h-screen">
      <div className="bg-primary w-1/2 flex items-center justify-center border-r-[3px] border-dark flex-col gap-6 px-6 text-center">
        <p className="font-bold text-lg text-divider">{tProject("heading")}</p>

        <TypeWriterComponent
          loop={3}
          words={["Prodyo"]}
          fontSize="text-8xl"
          deleteSpeed={0}
        />

        <div className="flex items-center justify-center gap-3 text-lg font-bold">
          <p>{tCommon("fillInfo")}</p>
          <MoveRight strokeWidth={2.25} />
        </div>
      </div>
      <div className="w-1/2 bg-background text-text flex items-center justify-center">
        <div className="w-full max-w-3xl px-18 py-2">
          <ProjectForm />
        </div>
      </div>
    </div>
  );
}
