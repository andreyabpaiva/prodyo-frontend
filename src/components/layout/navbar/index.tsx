"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Navbar() {
    return (
        <header
            className="bg-[var(--primary)] 
                border-b-2 
                border-b-solid 
                border-b-[var(--text)]
                p-3
                flex
                items-center
                justify-between"
        >
            <p className="font-bold text-2xl">Prodyo</p>

            <Button
                className="font-bold"
                variant={"outline"}
                onClick={() => null}
            >
                <Plus strokeWidth={3} />
                Novo projeto
            </Button>

        </header>
    )
}