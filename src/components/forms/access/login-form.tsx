"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type AuthField = {
  id: string;
  label: string;
  type?: string;
};

const fields: AuthField[] = [
  { id: "login", label: "login" },
  { id: "password", label: "senha", type: "password" },
];

export function LoginForm() {
  const [formState, setFormState] = useState(
    fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.id] = "";
      return acc;
    }, {}),
  );

  const handleChange = (fieldId: string, value: string) => {
    setFormState((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // placeholder para futura integração
    console.log("login attempt", formState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg flex-col gap-8 text-[var(--primary)]"
    >
      {fields.map((field) => (
        <label
          key={field.id}
          htmlFor={field.id}
          className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--divider)]"
        >
          {field.label}
          <input
            id={field.id}
            name={field.id}
            type={field.type ?? "text"}
            value={formState[field.id]}
            onChange={(event) => handleChange(field.id, event.target.value)}
            className="mt-4 w-full border-b-[3px] border-[var(--primary)]/50 bg-transparent pb-3 text-xl font-semibold text-[var(--primary)] outline-none placeholder:text-[var(--divider)] focus:border-[var(--primary)]"
            placeholder={`Digite seu ${field.label}`}
          />
        </label>
      ))}

      <div className="flex flex-col gap-4 text-right text-xs uppercase tracking-[0.4em] text-[var(--divider)]">
        <Link href="/(access)/register" className="hover:text-[var(--primary)]">
          Criar conta
        </Link>
      </div>

      <Button
        type="submit"
        className="ml-auto rounded-full border-[3px] border-[var(--primary)] bg-[var(--primary)] px-10 py-6 text-lg font-bold uppercase text-[var(--dark)]"
      >
        Acessar
      </Button>
    </form>
  );
}


