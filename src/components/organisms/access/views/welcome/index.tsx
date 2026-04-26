import ProdyoTypeWriter from "@/components/molecules/prodyo-type-writer";
import { MoveRight } from "lucide-react";
import { WelcompProps } from "./types";

export default function Welcome({ title, subtitle }: WelcompProps) {
  return (
    <div className="bg-primary w-1/2 flex flex-col items-center justify-center gap-6 border-r-[0.188rem] border-dark px-6 text-center">
      <p className="text-lg font-bold text-divider">{title}</p>
      <ProdyoTypeWriter />
      <div className="flex items-center justify-center gap-3 text-lg font-bold">
        <span>{subtitle}</span>
        <MoveRight strokeWidth={2.25} />
      </div>
    </div>
  );
}
