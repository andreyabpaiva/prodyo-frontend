"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerSchema, type RegisterFormValues } from "./resolvers/register-resolver";
import { authService } from "@/services/auth";
import { useRouter } from "next/navigation";

type RegisterField = {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
};

const registerFields: RegisterField[] = [
  { id: "name", label: "Nome", placeholder: "Insira seu nome..." },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Insira seu email...",
  },
  {
    id: "password",
    label: "Senha",
    type: "password",
    placeholder: "Insira sua senha...",
  },
  {
    id: "confirmPassword",
    label: "Confirme sua senha",
    type: "password",
    placeholder: "Confirme sua senha...",
  },
];

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await authService.register(registerData);
      router.push("/login");
    } catch (error) {
      throw error;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-100 max-w-lg flex-col gap-6 text-[var(--primary)]"
      >
        {registerFields.map((field) => (
          <FormField
            key={field.id}
            control={form.control}
            name={field.id as keyof RegisterFormValues}
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
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="w-full max-w-3xs"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}


