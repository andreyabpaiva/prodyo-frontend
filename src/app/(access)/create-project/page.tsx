"use client";
import ProjectForm from "@/components/forms/project";
import TypeWriterComponent from "@/components/utils/TypeWriter";
import { MoveRight } from "lucide-react";

export default function CreateProject() {
    return (
        <div className="flex flex-row h-full">
            <div className="bg-[var(--primary)] 
                            w-1/2 
                            flex 
                            items-center 
                            justify-center 
                            min-h-screen
                            border-r-3
                            flex-col
                            gap-15
                            "
            >
                <div className="w-55 text-center">
                    <p className="font-bold text-lg text-[var(--divider)] mb-3">
                        Vamos iniciar seu novo projeto no
                    </p>
                </div>
                <div>
                    <TypeWriterComponent
                        loop={3}
                        words={["Prodyo"]}
                        fontSize="text-8xl"
                        deleteSpeed={0}
                    />
                </div>
                <div className="justify-center items-center flex gap-3 mt-6">
                    <h6 className="font-bold">
                        Insira as informações ao lado
                    </h6>
                    <MoveRight strokeWidth={2.25} />
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-center min-h-screen">
                <ProjectForm />
            </div>
        </div>
    );
}