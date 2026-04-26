"use client";
import { Button } from "@/components/atoms/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const router = useRouter();
  const t = useTranslations("Navbar");

  return (
    <header className="fixed top-0 h-14 left-0 right-0 z-50 bg-primary border-b-[3px] border-b-dark px-5 py-2 flex items-center justify-between">
      <p className="font-bold text-2xl tracking-tight">Prodyo</p>

      {/* <nav className="flex items-center gap-4">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "rounded-full border-[3px] border-dark px-6 py-2 text-sm font-bold uppercase tracking-[0.3em] transition-colors",
                            pathname.startsWith(link.href)
                                ? "bg-dark text-primary"
                                : "bg-primary text-dark hover:bg-background"
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav> */}

      <Button
        className="font-bold rounded-full border-[3px] outline:none border-dark text-sm"
        variant={"outline"}
        onClick={() => router.push("/create-project")}
      >
        <Plus strokeWidth={3} />
        {t("newProject")}
      </Button>
    </header>
  );
}
