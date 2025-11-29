"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
    { label: "Projetos", href: "/projects" },
    { label: "Indicadores", href: "/projects/proj-01/indicators" },
];

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <header
            className="bg-[var(--primary)] border-b-[3px] border-b-[var(--dark)] px-8 py-4 flex items-center justify-between"
        >
            <p className="font-bold text-2xl tracking-tight">Prodyo</p>

            <nav className="flex items-center gap-4">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "rounded-full border-[3px] border-[var(--dark)] px-6 py-2 text-sm font-bold uppercase tracking-[0.3em] transition-colors",
                            pathname.startsWith(link.href)
                                ? "bg-[var(--dark)] text-[var(--primary)]"
                                : "bg-[var(--primary)] text-[var(--dark)] hover:bg-[var(--background)]"
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            <Button
                className="font-bold rounded-full border-[3px] border-[var(--dark)] text-sm uppercase tracking-[0.3em]"
                variant={"outline"}
                onClick={() => router.push("/create-project")}
            >
                <Plus strokeWidth={3} />
                Novo projeto
            </Button>

        </header>
    )
}