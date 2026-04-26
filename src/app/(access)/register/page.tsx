import { RegisterForm } from "@/components/forms/access/register-form";
import TypeWriterComponent from "@/components/utils/TypeWriter";
import { MoveRight } from "lucide-react";

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen">
            <div className="bg-primary w-1/2 flex flex-col items-center justify-center gap-6 border-r-[3px] border-dark px-6 text-center">
                <p className="text-lg font-bold text-divider">
                    Bem-vindo ao
                </p>
                <TypeWriterComponent
                    loop={0}
                    words={["Prodyo"]}
                    fontSize="text-8xl"
                    deleteSpeed={0}
                />
                <div className="flex items-center justify-center gap-3 text-lg font-bold">
                    <span>Insira as informações ao lado</span>
                    <MoveRight strokeWidth={2.25} />
                </div>
            </div>
            <div className="w-1/2 bg-background flex items-center justify-center px-10">
                <RegisterForm />
            </div>
        </div>
    );
}


