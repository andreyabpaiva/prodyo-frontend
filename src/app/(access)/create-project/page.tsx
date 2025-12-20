"use client";
import ProjectForm from "@/components/forms/project";
import TypeWriterComponent from "@/components/utils/TypeWriter";
import { MoveRight } from "lucide-react";

export default function CreateProject() {
    return (
        <div className="flex min-h-screen">
            <div className="bg-[var(--primary)] w-1/2 flex items-center justify-center border-r-[3px] border-[var(--dark)] flex-col gap-6 px-6 text-center">
                <p className="font-bold text-lg text-[var(--divider)]">
                    Vamos iniciar seu novo projeto no
                </p>

                <TypeWriterComponent
                    loop={3}
                    words={["Prodyo"]}
                    fontSize="text-8xl"
                    deleteSpeed={0}
                />

                <div className="flex items-center justify-center gap-3 text-lg font-bold">
                    <span>Insira as informações ao lado</span>
                    <MoveRight strokeWidth={2.25} />
                </div>
            </div>
            <div className="w-1/2 bg-[var(--background)] text-[var(--text)] flex items-center justify-center">
                <div className="w-full max-w-3xl px-13">
                    <ProjectForm />
                </div>
            </div>
        </div>
    );
}