"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema, type LoginFormValues } from "./resolvers/login-resolver";
import { authService } from "@/services/auth";

type AuthField = {
  id: keyof LoginFormValues;
  label: string;
  placeholder: string;
  type?: string;
};

const fields: AuthField[] = [
  { id: "email", label: "Email", placeholder: "Insira seu login..." },
  {
    id: "password",
    label: "Senha",
    placeholder: "Insira sua senha...",
    type: "password",
  },
];

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await authService.login(data);
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      router.push("/projects");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-100 max-w-lg flex-col gap-6 text-[var(--primary)]"
      >
        {fields.map((field) => (
          <FormField
            key={field.id}
            control={form.control}
            name={field.id}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold text-[var(--divider)] mb-2">
                  {field.label}
                </FormLabel>
                <FormControl>
                  <Input
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button asChild variant="link">
          <Link href="/register">Não possui conta ainda?</Link>
        </Button>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-full max-w-3xs"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Acessando..." : "Acessar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}


