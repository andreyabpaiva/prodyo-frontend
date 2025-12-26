"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();

    return (
        <header
            className="fixed top-0 h-14 left-0 right-0 z-50 bg-[var(--primary)] border-b-[3px] border-b-[var(--dark)] px-5 py-2 flex items-center justify-between"
        >
            <p className="font-bold text-2xl tracking-tight">Prodyo</p>

            {/* <nav className="flex items-center gap-4">
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
            </nav> */}

            <Button
                className="font-bold rounded-full border-[3px] outline:none border-[var(--dark)] text-sm"
                variant={"outline"}
                onClick={() => router.push("/create-project")}
            >
                <Plus strokeWidth={3} />
                Novo projeto
            </Button>

        </header>
    )
}